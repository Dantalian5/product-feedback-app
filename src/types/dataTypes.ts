export interface RequestType {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments_count?: number;
}

export interface UserType {
  id: number;
  image: string;
  name: string;
  username: string;
}
export interface Comment {
  id: number;
  content: string;
  request_id: number;
  parent_comment_id?: number;
}
export interface CommentWithId extends Comment {
  user_id: number;
  replying_to_id?: number;
}
export interface CommentWithInfo extends Comment {
  user: UserType;
  replying_to: UserType | null;
}
