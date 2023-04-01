import { Router } from "express";
import { CommentController } from "../controller/index";
export default class CommentRouter {

    private commentRoutes: Router;
    constructor() {
        this.commentRoutes = Router();
        this.initCommentRoutes();
    };

    initCommentRoutes(): void {
        const commentController = new CommentController();
        this.commentRoutes.get("/:_id", commentController.get.bind(commentController));
        this.commentRoutes.post('/', commentController.create.bind(commentController));
        this.commentRoutes.patch('/:_id', commentController.update.bind(commentController));
        this.commentRoutes.delete('/:_id', commentController.delete.bind(commentController));
    };

    getRouter(): Router {
        return this.commentRoutes;
    };
};