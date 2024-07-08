export interface User {
  id: number;
  name: string;
  username: string;
  image: string;
}

export interface NewFeedback {
  title: string;
  description: string;
  category: string;
}
export interface Feedback extends NewFeedback {
  id: number;
  status: string;
  upvotes: number;
  userId: number;
  commentsCount: number;
  isEditable?: boolean;
  comments?: Comment[];
}
export interface NewComment {
  feedbackId: number;
  parentId: number | null;
  content: string;
}
export interface Comment extends NewComment {
  id: number;
  user: User;
}
