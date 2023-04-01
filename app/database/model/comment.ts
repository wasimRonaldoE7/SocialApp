import { Schema, model, Model } from "mongoose";
import { CommentPost } from "../../types";

const CommentSchema: Schema = new Schema({
    comment: String,
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    postId: { type: Schema.Types.ObjectId, ref: 'post', required: true },
    createdAt: { type: Date, default: Date.now },
});

const CommentModel = model<CommentPost>("comment", CommentSchema);
export default CommentModel;

