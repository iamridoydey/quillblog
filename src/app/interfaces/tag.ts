export interface TagPayload {
  name: string;
}


export interface PostTagPayload {
  postId: string;
  name: string;
}


export interface BlogTagPayload {
  blogId: string;
  name: string;
}

export interface BlogPostTagPayload {
  blogPostId: string;
  name: string;
}