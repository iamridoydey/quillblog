export interface TrendingTagsPayload {
  tag: string;
  post: number;
}

export interface UserToFollowPayload {
  image: string;
  name: string;
  username: string;
}

export interface BlogToFollowPayload {
  image: string;
  title: string;
  shortname: string;
}