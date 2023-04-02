import { UserService } from "../services/user.service";
import UserModel from "../database/model/user";
import { RegisterUser } from "../types/interfaces/registerUser.interface";
import { UpdateUser, User } from "../types";


const user: User = {
    _id: '1',
    name: 'wasim',
    phoneNumber: '6381117744',
    email: 'wasim@gmail.com',
    password: "**"
};

const updatedUser: User = {
    _id: '1',
    name: 'wasim',
    phoneNumber: '7923849824',
    email: 'wasim@gmail.com',
    password: "**"
};

jest.mock('../database/model/user', () => ({
    create: () => user,
    get: () => user,
    update: () => updatedUser,
    delete: () => "User Deleted"
}));



describe("UserService", () => {
    let userService: UserService;

    beforeEach(() => {
        userService = new UserService();
    });

    test("createUser", async () => {
        const userDetail: RegisterUser = { name: "wasim", password: "***", email: "wasim@gamil.com", phoneNumber: "69382002739" };
        const result = await userService.createUser(userDetail);
        expect(result).toBe(user)
    });


    test("getUser", async () => {
        const result = await userService.getUser("1");
        expect(result).toEqual(user)
    });


    test("updateUser", async () => {
        const userDetail: UpdateUser = { phoneNumber: "7923849824" };
        const result = await userService.updateUser(userDetail, "1");
        expect(result).toEqual(updatedUser)
    });


    test("deleteUser", async () => {
        const result = await userService.deleteUser("1");
        expect(result).toBe("User Deleted")
    });

})