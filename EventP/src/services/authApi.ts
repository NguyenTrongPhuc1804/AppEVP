import {appInfo} from '../constants/appInfo';
import {axiosClient} from './baseService';

class AuthApi {
  handleAuthentication = async (
    url: string,
    method?: 'get' | 'post' | 'put' | 'delete',
    data?: any,
  ) => {
    return axiosClient(`/auth/${url}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: method ?? 'get',
      data,
    });
  };
}

const authApi = new AuthApi();
export default authApi;
