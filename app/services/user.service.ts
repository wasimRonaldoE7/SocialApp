import UserModel from "../database/model/user";
import { Pagination, RegisterUser, UpdateUser, User, UserTokenDetail } from "../types";

export class UserService {
    constructor() {
    }

    async createUser(detail: RegisterUser): Promise<User> {
        return await UserModel.create(detail);
    };

    async getUser(_id: string): Promise<User> {
        return await UserModel.findById(_id) as User;
    }

    async updateUser(detail: UpdateUser, _id: string): Promise<User> {
        await UserModel.findOneAndUpdate({ _id }, { $set: detail });
        return await this.getUser(_id);
    };

    async deleteUser(_id: string): Promise<String> {
        await UserModel.findByIdAndDelete(_id);
        return "User Deleted";
    };

    public async findAUsers({ page, perPage, search }: Pagination): Promise<User[]> {
        return await UserModel.find().skip(perPage * page).limit(perPage);
    };

};