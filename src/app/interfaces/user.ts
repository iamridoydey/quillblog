export interface UserPayload {
  email: string;
  password: string;
}

export interface GetUserPayload {
  id?: string;
  email?: string;
  username?: string;
}

export interface UpdateUserPayload {
  id: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  profilePic?: string;
  title?: string;
  bio?: string;
}

export interface DeleteUserPayload {
  id: string;
}
