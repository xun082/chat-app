import request, { ApiResponse, handleRequest } from '../request';

interface SearchUserByEmailTypes {
  email: string;
}

export interface UserResponseTypes {
  avatar: string; // 用户头像的URL
  backgroundImage: string; // 背景图片的URL
  createdAt: string; // 用户创建时间，应该是一个时间戳字符串
  email: string; // 用户的邮箱
  githubId: number; // GitHub 用户ID，数字类型
  region: string; // 用户所在的地区
  signature: string; // 用户签名
  username: string; // 用户名
  _id: string; // 用户的唯一标识符（数据库中的ID）
  __v: number; // 数据库版本号
}

export interface Friend {
  avatar: string;
  createdAt: number;
  friendEmail: string;
  friendId: string;
  friendRemark: string;
  friendUsername: string;
  id: string;
}

export const searchUserByEmail = async (
  data: SearchUserByEmailTypes,
): Promise<ApiResponse<UserResponseTypes>> => {
  return handleRequest(() =>
    request.get<ApiResponse<UserResponseTypes>>('/user/search', {
      params: {
        ...data,
      },
    }),
  );
};

export const getUserInfo = async (userId?: string): Promise<ApiResponse<UserResponseTypes>> => {
  const url = userId ? `/user?userId=${userId}` : '/user';

  return handleRequest(() => request.get<ApiResponse<UserResponseTypes>>(url));
};

export const getFriendsList = async (): Promise<ApiResponse<Array<Friend>>> => {
  return handleRequest(() => request.get<ApiResponse<Array<Friend>>>('/user/friends'));
};
