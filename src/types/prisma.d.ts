export interface DBFeedback {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  user_id: number;
  comments: DBComment[];
}
export interface DBComment {
  id: number;
  content: string;
  user_id: number;
  feedback_id: number;
  replying_to: number;
}
