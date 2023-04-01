import TodoModel from "../database/model/todo";
import { Pagination, Todo, TodoList, UpdateTodo, UserTokenDetail } from "../types";

export class TodoService {

    public async addTodo(detail: Todo, { userId }: UserTokenDetail): Promise<Todo> {
        detail.userId = userId
        return await TodoModel.create(detail);
    }

    public async updateTodo(detail: UpdateTodo, _id: string, { userId }: UserTokenDetail): Promise<Todo> {
        await TodoModel.findOneAndUpdate({ _id }, { $set: detail });
        return await this.getTodo(_id);
    }

    public async getTodo(_id: string): Promise<Todo> {
        return await TodoModel.findById(_id) as Todo;
    };

    public async deleteTodo(_id: string): Promise<String> {
        await TodoModel.findByIdAndDelete(_id) as Todo;
        return "Todo Deleted Successfully";
    };

    public async addTodoList({ list }: { list: TodoList[] }, _id: string): Promise<Todo> {
        await TodoModel.findByIdAndUpdate(_id, {
            $push: {
                list
            }
        });
        return this.getTodo(_id);
    };

    public async removeTodoList({ list }: { list: String[] }, _id: string): Promise<Todo> {
        await TodoModel.findByIdAndUpdate(_id, {
            $pull: {
                list: { _id: { $in: list } }
            }
        });
        return this.getTodo(_id);
    };


    public async editTodoList({ item, completed }: { item: string, completed: boolean }, _id: string, listId: string): Promise<Todo> {
        const todo = await TodoModel.findOne({ "list._id": listId });
        await TodoModel.findOneAndUpdate({ _id, "list._id": listId }, {
            $set: {
                "list.$.item": item,
                "list.$.completed": completed
            }
        });
        return this.getTodo(_id);
    };

    public async findTodosForAUser({ page, perPage, search }: Pagination, { userId }: UserTokenDetail): Promise<Todo[]> {
        const query: { userId: string, subject?: { $regex: string } } = { userId };
        if (search) query.subject = { $regex: search };
        return await TodoModel.find(query).skip(perPage * page).limit(perPage);
    };
}