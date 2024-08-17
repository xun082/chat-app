import request, { ApiResponse, handleRequest } from '../request';

export const uploadSingleFile = async (file: File): Promise<ApiResponse<{ url: string }>> => {
  const formData = new FormData();
  formData.append('file', file);

  return handleRequest(() =>
    request.upload<ApiResponse<{ url: string }>>('/upload/single', formData),
  );
};
