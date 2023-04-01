import CommentModel from "../database/model/comment";
import PostModel from "../database/model/post";
import { CommentCreate, CommentPost, CreatePost, Post, UserTokenDetail } from "../types";
import { PostService } from "./post.service";

export class CommentService {

    private postService: PostService;
    constructor() {
        this.postService = new PostService();
    }

    async create({ comment, postId }: CommentCreate, { userId }: UserTokenDetail): Promise<CommentPost> {
        const data: CommentPost = { comment, userId, postId }
        const commentData = await CommentModel.create(data);
        await this.postService.addComment(postId, commentData._id as unknown as string)
        return this.get(commentData._id as unknown as string);
    };

    async get(_id: string): Promise<CommentPost> {
        return await CommentModel.findById(_id) as CommentPost;
    }

    async update({ comment }: CommentPost, _id: string): Promise<CommentPost> {
        await CommentModel.findOneAndUpdate({ _id }, { $set: { comment } });
        return this.get(_id);
    };

    async delete(_id: string): Promise<string> {
        await CommentModel.findByIdAndDelete(_id);
        return "Comment Deleted Succesfully";
    }

};