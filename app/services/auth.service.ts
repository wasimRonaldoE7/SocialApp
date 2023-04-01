import UserModel from "../database/model/user";
import { HttpStatusCode, RegisterUser, User } from "../types";
import { LoginUser } from "../types/interfaces/login.interface";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserService } from "./user.service";
import { ErrorStatus } from "../types/class/errorStatus.class";

export class AuthService {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    public async registerUser(userDetail: RegisterUser): Promise<String> {
        try {
            userDetail.password = await bcrypt.hash(userDetail.password, 10);
            await this.userService.createUser(userDetail);
            return "User Registered Successfully";
        } catch (e) {
            throw new ErrorStatus(HttpStatusCode.BAD_REQUEST
            );
        }
    };

    public async login({ name, password }: LoginUser): Promise<{ token: string, detail: User }> {
        const result = await UserModel.findOne({ name });
        if (!result) {
            throw "No User Found";
        };
        console.log('new')
        const actualPassword: string = result.password as string;
        const validation = await bcrypt.compare(password, actualPassword);
        if (!validation) {
            throw "Wrong Password";
        };
        const token: string = jwt.sign({ userId: result.id, name: result.name, isAdmin: result.isAdmin }, "token", {
            expiresIn: "100000",
        });
        return { token, detail: result };
    };

    verifyToken(req: any, res: any, next: any) {
        const token = req.headers["token"];
        if (!token) {
            return res.status(403).send("A token is needed for authentication");
        };
        try {
            const decoded = jwt.verify(token, "token");
            req.user = decoded;
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
        return next();
    };

}