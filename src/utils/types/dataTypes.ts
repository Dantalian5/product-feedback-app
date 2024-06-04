export interface UserType {
  image: string;
  name: string;
  username: string;
}
export interface CommentType {
  id: number;
  content: string;
  user: UserType;
}
export interface FeedbackType {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: CommentType[];
}
