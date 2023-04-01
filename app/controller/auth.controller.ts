import { ErrorHandlerDecorator } from "../common/decorator/errorHandler.decorator";
import { AuthService } from "../services";

export class AuthController {

    private authService: AuthService
    constructor() {
        this.authService = new AuthService();
    };

    @ErrorHandlerDecorator()
    async register(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.authService.registerUser(req.body));
    };

    @ErrorHandlerDecorator()
    async login(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.authService.login(req.body));
    }

}