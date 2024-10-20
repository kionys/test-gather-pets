export interface IPost {
  content: string;
  createdAt: string;
  email: string;
  hashtags: string;
  id: number;
  image?: string | null;
  title: string;
  updatedAt: string;
  userId: number;
  user: {
    id: number;
    image?: string | null;
    name: string;
  };
}
