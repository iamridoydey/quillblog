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
  coverPic?: string;
  title?: string;
  bio?: string;
  birthDate?: Date;
  location?: string;
}

export interface DeleteUserPayload {
  id: string;
}


export interface UserVerificationPayload {
  token: string;
}

export interface GenerateTokenPayload {
  userId: string;
}

