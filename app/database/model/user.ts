import { Schema, model, Model } from "mongoose";
import { User } from "../../types";

const UserSchema: Schema = new Schema({
    name: String,
    email: String,
    phoneNumber: String,
    password: String,
    status: {
        type: Boolean,
        default: true
    },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: 'user' }
});

const UserModel = model<User>("user", UserSchema);
export default UserModel;

