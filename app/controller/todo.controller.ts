import { ErrorHandlerDecorator } from "../common/decorator/errorHandler.decorator";
import { TodoService } from "../services";

export class TodoController {

    private todoService: TodoService
    constructor() {
        this.todoService = new TodoService();
    };

    @ErrorHandlerDecorator()
    async addTodo(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.todoService.addTodo(req.body, req.user));
    };

    @ErrorHandlerDecorator()
    async udpateTodo(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.todoService.updateTodo(req.body, req.params._id, req.user));
    };

    @ErrorHandlerDecorator()
    async getTodo(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.todoService.getTodo(req.params._id));
    };

    @ErrorHandlerDecorator()
    async deleteTodo(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.todoService.deleteTodo(req.params._id));
    };

    @ErrorHandlerDecorator()
    async addTodoList(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.todoService.addTodoList(req.body, req.params._id));
    };

    @ErrorHandlerDecorator()
    async removeTodoList(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.todoService.removeTodoList(req.body, req.params._id));
    };

    @ErrorHandlerDecorator()
    async editTodoList(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.todoService.editTodoList(req.body, req.params._id, req.params.listId));
    };

    @ErrorHandlerDecorator()
    async findTodosForAUser(req: Request | any, res: Response | any): Promise<void> {
        res.send(await this.todoService.findTodosForAUser(req.body, req.user));
    };

}