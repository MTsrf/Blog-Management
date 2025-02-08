export interface User {
  id: string;
  email: string;
  password: string;
  name?: string | null;
  posts?: Post[];
  createdAt: Date;
  updatedAt: Date;
}
export interface Post {
  id: string;
  title: string;
  content: string;
  author?: User;
  authorId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Context {
  user?: {
    id: string;
  } | null;
}
