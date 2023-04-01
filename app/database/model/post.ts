import { Schema, model, Model } from "mongoose";
import { Post } from "../../types";

const PostSchema: Schema = new Schema({
    post: String,
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    createdAt: { type: Date, default: Date.now },
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }]
});

const PostModel = model<Post>("post", PostSchema);
export default PostModel;

