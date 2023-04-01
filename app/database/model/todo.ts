import { Schema, model } from "mongoose";
import { Todo, } from "../../types";

const TodoListSchema: Schema = new Schema({
    item: String,
    completed: {
        type: Boolean,
        default: false
    }
});

const TodoSchema: Schema = new Schema({
    subject: String,
    list: [TodoListSchema],
    completed: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: 'user' }
});

const TodoModel = model<Todo>("todo", TodoSchema);
export default TodoModel;

