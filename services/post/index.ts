import request, { ApiResponse, handleRequest } from '../request';

export interface CreatePostDto {
  content: string; // 帖子内容
  images?: string[]; // 图片URL数组
  isPublic?: boolean; // 是否公开帖子
  location?: string; // 地理位置
}

export const createPost = async (data: CreatePostDto): Promise<ApiResponse<void>> => {
  return handleRequest(() =>
    request.post<ApiResponse<void>>('/post', {
      params: {
        ...data,
      },
    }),
  );
};
