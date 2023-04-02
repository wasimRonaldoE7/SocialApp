import UserModel from "../database/model/user";
import { HttpStatusCode, RegisterUser, User } from "../types";
import { LoginUser } from "../types/interfaces/login.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserService } from "./user.service";
import { ErrorStatus } from "../types/class/errorStatus.class";
import CacheService from "../cache/redis.service";

export class AuthService {
    private userService: UserService;
    private cacheService: CacheService;
    constructor() {
        this.cacheService = new CacheService();
        this.userService = new UserService();
    }

    public async registerUser(userDetail: RegisterUser): Promise<String> {
        try {
            userDetail.password = await bcrypt.hash(userDetail.password, 10);
            const user: User = await this.userService.createUser(userDetail);
            await this.cacheService.set(userDetail.name, JSON.stringify(user));
            return "User Registered Successfully";
        } catch (e) {
            throw new ErrorStatus(HttpStatusCode.BAD_REQUEST
            );
        }
    };

    public async login({ name, password }: LoginUser): Promise<{ token: string, detail: User, refreshToken: string }> {
        let result: User | null;
        let user: string | null = await this.cacheService.get(name);
        if (user) {
            result = JSON.parse(user) as User;
        } else {
            result = await UserModel.findOne({ name });
        }
        if (!result) {
            throw "No User Found";
        };
        const actualPassword: string = result.password as string;
        const validation = await bcrypt.compare(password, actualPassword);
        if (!validation) {
            throw "Wrong Password";
        };
        const token: string = jwt.sign({ userId: result._id, name: result.name, isAdmin: result.isAdmin }, process.env.TOKEN_KEY as string, {
            expiresIn: "10m",
        });
        const refreshToken = jwt.sign({ userId: result._id, name: result.name, isAdmin: result.isAdmin }, process.env.REFRESH_TOKEN_KEY as string, { expiresIn: '1d' });
        return { token, detail: result, refreshToken };
    };

    verifyToken(req: any, res: any, next: any) {
        const token = req.headers["token"];
        if (!token) {
            return res.status(403).send("A token is needed for authentication");
        };
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY as string);
            req.user = decoded;
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
        return next();
    };

    refresh(token: string): { token: string } {
        try {
            const decoded: User = jwt.verify(token, process.env.REFRESH_TOKEN_KEY as string) as User;
            const refreshToken = jwt.sign({ userId: decoded._id, name: decoded.name, isAdmin: decoded.isAdmin }, process.env.REFRESH_TOKEN_KEY as string, { expiresIn: '1d' });
            return { token: refreshToken };
        } catch (err) {
            throw new ErrorStatus(HttpStatusCode.UNAUTHORISED);
        }
    };
}