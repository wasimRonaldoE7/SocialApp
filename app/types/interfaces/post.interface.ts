export interface Post {
    post: string;
    userId: string;
};

export interface CreatePost {
    post: string
};

export interface CommentResponse  {
   _id:string,
   comment:string,
   userId:string,
   postId:string,
   createdAt:string
}

export interface PostResponse{
    post:string,
    userId:string,
    _id:string,
    comments:[]
    createdAt:Date;
}