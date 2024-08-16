import request, { ApiResponse, handleRequest } from '../request';

export const uploadSingleFile = async (
  file: File,
  bucketName: string,
  fileName: string,
): Promise<ApiResponse<{ url: string }>> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('bucketName', bucketName);
  formData.append('fileName', fileName);

  return handleRequest(() =>
    request.upload<ApiResponse<{ url: string }>>('/upload/single', formData),
  );
};
