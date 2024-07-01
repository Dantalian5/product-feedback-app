export interface TypeUser {
  id: number;
  image: string;
  name: string;
  username: string;
}

export interface TypeFeedbackBase {
  title: string;
  category: string;
  status: string;
  description: string;
}
export interface TypeFeedback extends TypeFeedbackBase {
  id: number;
  upvotes: number;
  user_id: number;
}
export interface TypeFeedbackWithCmtsCnt extends TypeFeedback {
  comments_count: number;
}

export interface TypeCommentBase {
  feedback_id: number;
  parent_id: number | null;
  content: string;
}
export interface TypeComment extends TypeCommentBase {
  id: number;
  user: TypeUser;
}
export interface TypeCommentExtended extends TypeComment {
  parent_user: TypeUser;
}
export interface TypeOption {
  label: string;
  value: string;
}
