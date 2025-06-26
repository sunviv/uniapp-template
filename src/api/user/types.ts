export interface UserInfoReq {
  userId?: string;
}

export interface UserInfoRes {
  userId?: string;
  username?: string;
  avatar?: string;
}

export interface LoginReq {
  username: string;
  password: string;
}

export interface LoginRes {
  accessToken: string;
  userId: number;
  username: string;
  avatar: string;
}

export interface LoginByCodeReq {
  phone: string;
  code: string;
}
