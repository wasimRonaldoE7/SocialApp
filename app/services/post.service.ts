import PostModel from "../database/model/post";
import { CreatePost, Pagination, Post, PostResponse, UserTokenDetail } from "../types";

export class PostService {

    async create({ post }: CreatePost, { userId }: UserTokenDetail): Promise<Post> {
        const data: Post = { post, userId }
        return await PostModel.create(data);
    };

    async get(_id: string): Promise<Post> {
        return await PostModel.findById(_id) as Post;
    }

    async update({ post }: CreatePost, _id: string): Promise<Post> {
        await PostModel.findOneAndUpdate({ _id }, { $set: { post } });
        return this.get(_id);
    };

    async delete(_id: string): Promise<string> {
        await PostModel.findByIdAndDelete(_id);
        return "Post Deleted Succesfully";
    };

    public async getPostForAUser({ page, perPage, search }: Pagination, { userId }: UserTokenDetail): Promise<PostResponse[]> {
        const query: { userId: string, post?: { $regex: string } } = { userId };
        if (search) query.post = { $regex: search };
        console.log(await PostModel.find({}).populate("comments"));
        return await PostModel.find(query).populate("comments").skip(perPage * page).limit(perPage) as unknown as PostResponse[];
    };

    public async addComment(postId: string, _id: string,): Promise<void> {
        await PostModel.findByIdAndUpdate(postId, { $push: { comments: [_id] } })
    }

};