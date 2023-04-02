export interface User {
    _id?: string;
    name?: string,
    email?: string,
    phoneNumber?: string,
    password?: string,
    status?: Boolean,
    isAdmin?: Boolean,
    createdAt?: Boolean,
    createdBy?: string
}

export interface UpdateUser {
    name?: string,
    email?: string,
    phoneNumber?: string,
}