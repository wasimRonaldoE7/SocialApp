import { Router } from "express";
import { PostController } from "../controller/index";
export default class PostRouter {

    private postRoutes: Router;
    constructor() {
        this.postRoutes = Router();
        this.initPostRoutes();
    };

    initPostRoutes(): void {
        const postController = new PostController();
        this.postRoutes.get('/', postController.getPostsForAUser.bind(postController))
        this.postRoutes.post('/', postController.create.bind(postController));
        this.postRoutes.get('/:_id', postController.get.bind(postController));
        this.postRoutes.patch('/:_id', postController.update.bind(postController));
        this.postRoutes.delete('/:_id', postController.delete.bind(postController));
    };

    getRouter(): Router {
        return this.postRoutes;
    };
};