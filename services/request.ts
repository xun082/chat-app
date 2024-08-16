import { getDataFromAsyncStorage, LocalStorageEnum } from '@/utils';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface Params {
  cacheTime?: number; // 缓存时间，单位为秒。默认强缓存，0为不缓存
  params?: Record<string, any>;
}

interface Props extends Params {
  url: string;
  method: Method;
  mode?: RequestMode; // 添加 mode 属性
}

type Config = { next: { revalidate: number } } | { cache: 'no-store' } | { cache: 'force-cache' };

interface AuthToken {
  access_token: string;
  refresh_token: string;
  expiresIn: number;
}

class Request {
  baseURL: string;
  defaultTimeout: number; // 添加默认超时时间属性

  constructor(baseURL: string, defaultTimeout: number = 5000) {
    this.baseURL = baseURL;
    this.defaultTimeout = defaultTimeout; // 初始化默认超时时间
  }

  /**
   * 请求拦截器
   */
  async interceptorsRequest({ url, method, params, cacheTime, mode }: Props) {
    let queryParams = ''; // url参数
    let requestPayload: any = null; // 请求体数据

    // 请求头
    const headers: Record<string, string> = {};

    // 从缓存中获取 token
    const authToken = await getDataFromAsyncStorage<AuthToken | null>(LocalStorageEnum.USER_AUTH);

    // 只有在 authToken 存在时才添加 Authorization 头
    if (authToken?.access_token) {
      headers['Authorization'] = `Bearer ${authToken.access_token}`;
    }

    const config: Config =
      cacheTime !== undefined
        ? cacheTime > 0
          ? { next: { revalidate: cacheTime } }
          : { cache: 'no-store' }
        : { cache: 'force-cache' };

    if (method === 'GET' || method === 'DELETE') {
      // fetch 对 GET 请求等，不支持将参数传在 body 上，只能拼接 url
      if (params) {
        queryParams = new URLSearchParams(params).toString();
        url = `${url}?${queryParams}`;
      }
    } else if (params instanceof FormData) {
      // 处理文件上传的情况，FormData 自动设置 Content-Type
      requestPayload = params;
    } else {
      // 非 form-data 传输 JSON 数据格式
      if (
        !['[object FormData]', '[object URLSearchParams]'].includes(
          Object.prototype.toString.call(params),
        )
      ) {
        headers['Content-Type'] = 'application/json';
        requestPayload = JSON.stringify(params);
      }
    }

    // 创建一个 AbortController 用于超时取消请求
    const controller = new AbortController();
    setTimeout(() => controller.abort(), this.defaultTimeout);

    return {
      url,
      options: {
        method,
        headers,
        mode, // 添加 mode 属性
        body: method !== 'GET' && method !== 'DELETE' ? requestPayload : undefined,
        signal: controller.signal, // 添加 signal 属性
        ...config,
      },
    };
  }

  /**
   * 响应拦截器
   */
  interceptorsResponse<T>(res: Response): Promise<T> {
    return new Promise((resolve, reject) => {
      const requestUrl = res.url;

      if (res.ok) {
        resolve(res.json() as Promise<T>);
      } else {
        res
          .clone()
          .text()
          .then((text) => {
            try {
              const errorData = JSON.parse(text);
              reject({ message: errorData || '接口错误', url: requestUrl });
            } catch {
              reject({ message: text, url: requestUrl });
            }
          });
      }
    });
  }

  async httpFactory<T>({ url = '', params = {}, method, mode }: Props): Promise<T> {
    const req = await this.interceptorsRequest({
      url: this.baseURL + url,
      method,
      params: params.params,
      cacheTime: params.cacheTime,
      mode,
    });

    const res = await fetch(req.url, req.options);

    return this.interceptorsResponse<T>(res);
  }

  async request<T>(method: Method, url: string, params?: Params, mode?: RequestMode): Promise<T> {
    return this.httpFactory<T>({ url, params, method, mode });
  }

  get<T>(url: string, params?: Params, mode?: RequestMode): Promise<T> {
    return this.request('GET', url, params, mode);
  }

  post<T>(url: string, params?: Params, mode?: RequestMode): Promise<T> {
    return this.request('POST', url, params, mode);
  }

  put<T>(url: string, params?: Params, mode?: RequestMode): Promise<T> {
    return this.request('PUT', url, params, mode);
  }

  delete<T>(url: string, params?: Params, mode?: RequestMode): Promise<T> {
    return this.request('DELETE', url, params, mode);
  }

  patch<T>(url: string, params?: Params, mode?: RequestMode): Promise<T> {
    return this.request('PATCH', url, params, mode);
  }

  upload<T>(url: string, formData: FormData, mode?: RequestMode): Promise<T> {
    return this.request('POST', url, { params: formData }, mode);
  }
}

const request = new Request(process.env.EXPO_PUBLIC_API_URL as string);

export default request;

export interface ApiResponse<T> {
  data: T;
  message: string;
  code: number;
  timestamp: number;
}

export const handleRequest = async <T>(requestFn: () => Promise<T>): Promise<T> => {
  try {
    return await requestFn();
  } catch (error) {
    console.error('Error processing request:', error);
    throw error;
  }
};
