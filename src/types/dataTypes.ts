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

export interface TypeCommentBase {
  feedbackId: number;
  parentId: number | null;
  content: string;
}
export interface TypeComment extends TypeCommentBase {
  id: number;
  user: TypeUser;
}
export interface TypeCommentExtended extends TypeComment {
  parentUser: TypeUser;
}
export interface TypeOption {
  label: string;
  value: string;
}
