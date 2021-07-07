
import { httpClient } from '../dataProvider/rest';


export const apiRequest = (method: string, url: string, params: any = {}) => 
  httpClient(`${process.env.REACT_APP_API_URL}${url}`, {
  method,
  ...params
})

export async function query(): Promise<any> {
  return apiRequest('GET', '/api/users');
}

export async function queryCurrent(): Promise<any> {
  return apiRequest('GET', '/users/me');
}

export async function queryNotices(): Promise<any> {
  return apiRequest('GET', '/api/notices');
}

export async function login(data: any): Promise<any> {
  console.log('Login::', data);
  return apiRequest('POST', '/users', {
    json: data,
    body: JSON.stringify(data)
  });
}

export async function logout(): Promise<any> {
  return apiRequest('GET', '/user/logout');
}