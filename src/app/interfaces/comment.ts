export interface CommentPayload {
  userId: string
  content: JSON
  postId: string
  blogPostId: string
}


export interface CreateCommentPayload {
  userId: string;
  postId?: string;
  blogPostId?: string;
  content: JSON;
  isEdited?: boolean;
}

export interface UpdateCommentPayload {
  id: string;
  content?: JSON;
}

export interface DeleteCommentPayload {
  id: string;
}