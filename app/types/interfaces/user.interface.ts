export interface User {
    name?: String,
    email?: String,
    phoneNumber?: String,
    password?: String,
    status?: Boolean,
    isAdmin?: Boolean,
    createdAt?: Boolean,
    createdBy?: String
}

export interface UpdateUser {
    name?: String,
    email?: String,
    phoneNumber?: String,
}