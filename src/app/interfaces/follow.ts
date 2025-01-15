export interface UserFollowPayload {
  followerId: string;
  followedId: string;
}

export interface BlogFollowPayload {
  userId: string;
  blogId: string;
}
