export interface BlogPayload {
  userId: string;
  shortName: string;
  title: string;
  description?: string;
  coverPic?: string;
}

export interface CreateBlogPayload{
  userId: string;
  shortname: string;
  title: string;
  description?: string;
  coverPic?: string;
}
export interface UpdateBlogPayload{
  id: string;
  shortName?: string;
  title?: string;
  description?: string;
  coverPic?: string;
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

