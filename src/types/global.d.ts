// feedbacks types

export interface FeedbackBase {
  title: string;
  category: string;
  status: string;
  description: string;
}
export interface Feedback extends FeedbackBase {
  id: number;
  upvotes: number;
  userId: number;
  commentsCount: number;
}
export interface FeedbackWithComents extends Feedback {
  comments: Comment[];
}
export interface Comment {
  id: number;
  content: string;
  feedbackId: number;
  parentId: number | null;
  user: User;
}
export interface User {
  id: number;
  name: string;
  username: string;
  image: string;
}
