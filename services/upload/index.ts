import request, { ApiResponse, handleRequest } from '../request';

export const uploadSingleFile = async (file: File): Promise<ApiResponse<{ url: string }>> => {
  const formData = new FormData();
  formData.append('file', file);

  return handleRequest(() =>
    request.upload<ApiResponse<{ url: string }>>('/upload/single', formData),
  );
};

export const uploadMultipleFiles = async (
  files: File[],
): Promise<ApiResponse<{ urls: string[] }>> => {
  const formData = new FormData();

  // 将每个文件添加到 FormData 对象中
  files.forEach((file) => {
    formData.append('files', file);
  });

  return handleRequest(() =>
    request.upload<ApiResponse<{ urls: string[] }>>('/upload/multiple', formData),
  );
};
