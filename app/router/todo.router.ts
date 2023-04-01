import { Router } from "express";
import { TodoController } from "../controller/index";
export default class TodoRouter {

    private todoRoutes: Router;
    constructor() {
        this.todoRoutes = Router();
        this.initTodoRoutes();
    };

    initTodoRoutes(): void {
        const authController = new TodoController();
        this.todoRoutes.get('/:_id', authController.getTodo.bind(authController))
        this.todoRoutes.get('/', authController.findTodosForAUser.bind(authController))
        this.todoRoutes.post('/', authController.addTodo.bind(authController));
        this.todoRoutes.patch('/:_id', authController.udpateTodo.bind(authController));
        this.todoRoutes.delete('/:_id', authController.deleteTodo.bind(authController));
        this.todoRoutes.post('/:_id/list', authController.addTodoList.bind(authController));
        this.todoRoutes.delete('/:_id/list', authController.removeTodoList.bind(authController));
        this.todoRoutes.patch('/:_id/list/:listId', authController.editTodoList.bind(authController));

    };

    getRouter(): Router {
        return this.todoRoutes;
    };
};