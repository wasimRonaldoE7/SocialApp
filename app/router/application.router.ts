import { Router } from "express";
import TodoRouter from "./todo.router";
import UserRouter from "./user.router";
import PostRouter from "./post.router";
import CommentRouter from "./comment.router";

export default class ApplicationRouter {

    private applicationRoutes: Router;
    constructor() {
        this.applicationRoutes = Router();
        this.initApplicationRoutes();
    };
    initApplicationRoutes(): void {
        this.applicationRoutes.use('/todo', new TodoRouter().getRouter());
        this.applicationRoutes.use('/user', new UserRouter().getRouter());
        this.applicationRoutes.use('/post', new PostRouter().getRouter());
        this.applicationRoutes.use('/comment', new CommentRouter().getRouter());


    };
    getRouter(): Router {
        return this.applicationRoutes;
    };
};