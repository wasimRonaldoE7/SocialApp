export interface CommentPost {
    comment: string;
    postId: string;
    userId: string;
};

export interface CommentCreate {
    comment: string;
    postId: string;
}