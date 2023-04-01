import { Router } from "express";
import { AuthController } from "../controller/index";
export default class AuthRouter {

    private authRoutes: Router;
    constructor() {
        this.authRoutes = Router();
        this.initAuthRoutes();
    };

    initAuthRoutes(): void {
        const authController = new AuthController();
        this.authRoutes.post('/register', authController.register.bind(authController));
        this.authRoutes.post('/login', authController.login.bind(authController));
    };

    getRouter(): Router {
        return this.authRoutes;
    };
};