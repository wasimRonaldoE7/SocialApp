import { ErrorHandlerDecorator } from "../common/decorator/errorHandler.decorator";
import { UserService } from "../services";

export class UserController {

    private userService: UserService
    constructor() {
        this.userService = new UserService();
    };

    @ErrorHandlerDecorator()
    async get(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.userService.getUser(req.params._id));
    };


    @ErrorHandlerDecorator()
    async update(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.userService.updateUser(req.body, req.params._id));
    };

    @ErrorHandlerDecorator()
    async delete(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.userService.deleteUser(req.params._id));
    }


    @ErrorHandlerDecorator()
    async findUsers(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.userService.findAUsers(req.body));
    };

}