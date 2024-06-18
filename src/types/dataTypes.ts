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
  user_id: number;
}
export interface TypeFeedbackWithCmtsCnt extends TypeFeedback {
  comments_count: number;
}
export interface TypeComment {
  id: number;
  content: string;
  feedback_id: number;
  parent_comment_id?: number;
}
export interface TypeCommentWithId extends TypeComment {
  user_id: number;
  replying_to_id?: number;
}
export interface TypeCommentWithInfo extends TypeComment {
  user: TypeUser;
  replying_to: TypeUser | null;
}
export interface TypeOption {
  label: string;
  value: string;
}
