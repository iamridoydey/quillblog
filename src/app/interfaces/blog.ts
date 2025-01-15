export interface BlogPayload {
  userId: string;
  shortName: string;
  title: string;
  description?: string;
}

export interface CreateBlogPayload{
  userId: string;
  shortname: string;
  title: string;
  description: string;
}
export interface UpdateBlogPayload{
  id: string;
  shortName?: string;
  title?: string;
  description?: string;
}

export interface DeleteBlogPayload{
  id: string;
}

export interface GetBlogPayload {
  id?: string;
  userId?: string;
  shortName?: string;
  title?: string;
}

