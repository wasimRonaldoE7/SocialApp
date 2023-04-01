import { ErrorHandlerDecorator } from "../common/decorator/errorHandler.decorator";
import { PostService } from "../services";

export class PostController {

    private postService: PostService
    constructor() {
        this.postService = new PostService();
    };

    @ErrorHandlerDecorator()
    async get(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.postService.get(req.params._id));
    };

    @ErrorHandlerDecorator()
    async create(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.postService.create(req.body, req.user));
    };

    @ErrorHandlerDecorator()
    async update(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.postService.update(req.body, req.params._id));
    };

    @ErrorHandlerDecorator()
    async delete(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.postService.delete(req.params._id));
    };

    @ErrorHandlerDecorator()
    async getPostsForAUser(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.postService.getPostForAUser(req.body, req.user));
    }

}