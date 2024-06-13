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
export interface TypeUser {
  id: number;
  image: string;
  name: string;
  username: string;
}
export interface TypeFeedback {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
}
export interface TypeFeedbackWithCmtsCnt extends TypeFeedback {
  comments_count: number;
}
export interface TypeComment {
  id: number;
  content: string;
  request_id: number;
  parent_comment_id?: number;
}
export interface CommentWithId extends TypeComment {
  user_id: number;
  replying_to_id?: number;
}
export interface CommentWithInfo extends TypeComment {
  user: UserType;
  replying_to: UserType | null;
}
export interface TypeOption {
  label: string;
  value: string;
}
