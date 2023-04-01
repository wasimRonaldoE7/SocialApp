import { Router } from "express";
import { UserController } from "../controller/index";
export default class UserRouter {

    private userRoutes: Router;
    constructor() {
        this.userRoutes = Router();
        this.initUserRoutes();
    };

    initUserRoutes(): void {
        const userController = new UserController();
        this.userRoutes.get('/:_id', userController.get.bind(userController));
        this.userRoutes.patch('/:_id', userController.update.bind(userController));
        this.userRoutes.delete('/:_id', userController.delete.bind(userController));
        this.userRoutes.get("/", userController.findUsers.bind(userController));
    };

    getRouter(): Router {
        return this.userRoutes;
    };
};