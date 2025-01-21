export interface BlogAritclePayload {
  userId: string;
  blogId: string;
  title: string;
  thumbnail?: string;
  content: JSON;
}


export interface GetBlogArticlePayload {
  id: string;
}

export interface CreateBlogArticlePayload {
  userId: string;
  blogId?: string;
  title: string;
  thumbnail?: string;
  content: JSON;
}

export interface UpdateBlogArticlePayload {
  id: string;
  title?: string;
  thumbnail?: string;
  content?: JSON;
}

export interface DeleteBlogArticlePayload {
  id: string;
}