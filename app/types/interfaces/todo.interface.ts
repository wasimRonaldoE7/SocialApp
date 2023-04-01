export interface TodoList {
    item: string,
    completed: boolean
};


export interface Todo {
    subject: string,
    list?: TodoList[],
    completed: boolean,
    active: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    userId: String,
}

export interface UpdateTodo {
    subject: string,
    completed: boolean,
    active: boolean
}


