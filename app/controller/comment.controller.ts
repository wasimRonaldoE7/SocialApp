import { ErrorHandlerDecorator } from "../common/decorator/errorHandler.decorator";
import { CommentService } from "../services";

export class CommentController {

    private commentService: CommentService
    constructor() {
        this.commentService = new CommentService();
    };

    @ErrorHandlerDecorator()
    async get(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.commentService.get(req.params._id));
    };

    @ErrorHandlerDecorator()
    async create(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.commentService.create(req.body, req.user));
    };

    @ErrorHandlerDecorator()
    async update(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.commentService.update(req.body, req.params._id));
    };

    @ErrorHandlerDecorator()
    async delete(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.commentService.delete(req.params._id));
    }

}