export interface BlogPostPayload {
  userId: string;
  blogId: string;
  title: string;
  thumbnail?: string;
  content: JSON;
}


export interface GetBlogPostPayload {
  id: string;
}

export interface CreateBlogPostPayload {
  userId: string;
  blogId?: string;
  title: string;
  thumbnail?: string;
  content: JSON;
}

export interface UpdateBlogPostPayload {
  id: string;
  thumbnail?: string;
  content?: JSON;
}

export interface DeleteBlogPostPayload {
  id: string;
}