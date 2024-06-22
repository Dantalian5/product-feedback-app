export interface TypeUser {
  id: number;
  image: string;
  name: string;
  username: string;
}

export interface TypeFeedbackBase {
  title: string;
  category: string;
  upvotes?: number;
  status: string;
  description: string;
  user_id: number;
}
export interface TypeFeedback extends TypeFeedbackBase {
  id: number;
}
export interface TypeFeedbackWithCmtsCnt extends TypeFeedback {
  comments_count: number;
}
export interface TypeComment {
  id: number;
  user: number | TypeUser;
  feedback_id: number;
  replying_to: number | null;
  content: string;
}
export interface TypeOption {
  label: string;
  value: string;
}
