export interface PostPayload {
  userId: string;
  thumbnail?: string;
  content: JSON;
}


export interface GetPostPayload {
  id: string;
}

export interface CreatePostPayload {
  userId: string;
  thumbnail?: string;
  content: JSON;
}

export interface UpdatePostPayload {
  id: string;
  thumbnail?: string;
  content?: JSON;
}

export interface DeletePostPayload {
  id: string;
}