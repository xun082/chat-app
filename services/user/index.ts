import request, { ApiResponse, handleRequest } from '../request';

interface SearchUserByEmailTypes {
  email: string;
}

export interface UserResponseTypes {
  id: string;
  githubId: number;
  avatar: string;
  createdAt: number;
  email: string;
  username: string;
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
