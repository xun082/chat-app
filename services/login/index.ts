import request, { ApiResponse, handleRequest } from '../request';

interface sendEmailVerificationTypes {
  account: string;
}

interface EmailVerificationResponse {
  status: string;
  expiresIn: number;
}

interface EmailLoginTypes {
  email: string;
  captcha: string;
}

export interface EmailLoginResponseTypes {
  access_token: string;
  refresh_token: string;
  expiresIn: string;
}

export const sendEmailVerification = async (
  data: sendEmailVerificationTypes,
): Promise<ApiResponse<EmailVerificationResponse>> => {
  return handleRequest(() =>
    request.post<ApiResponse<EmailVerificationResponse>>('/auth/send', {
      params: {
        ...data,
      },
    }),
  );
};

export const LoginByEmail = async (
  data: EmailLoginTypes,
): Promise<ApiResponse<EmailLoginResponseTypes>> => {
  return handleRequest(() =>
    request.post<ApiResponse<EmailLoginResponseTypes>>('/auth/login/email', {
      params: {
        ...data,
      },
    }),
  );
};
