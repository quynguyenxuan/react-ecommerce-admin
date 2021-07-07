
import { httpClient } from '../dataProvider/rest';
import { TOKEN_KEY } from '../utils';
import Cookies from 'js-cookie'

const request = (method: string, url: string, params: any = {}) => 
  httpClient(`${process.env.REACT_APP_API_URL}${url}`, {
  method,
  ...params
})

export async function upload(dir: string, file: File): Promise<any> {
  const formData = new FormData();
  formData.append('file', file, file.name);
  formData.append('directory', dir);
  const params = {
    // headers: new Headers({ 'Content-Type': 'multipart/form-data' }),
    body: formData,
    redirect: 'follow'
  };
  const token = Cookies.get(TOKEN_KEY);
  // return await fetch(`${process.env.REACT_APP_API_URL}/files`, {
  //   method: "POST",
  //   body: formData,
  //   redirect: 'follow',
  //   headers: {
  //       'Accept': 'application/json',
  //       // 'Content-Type': 'multipart/form-data',
  //       'Authorization': `Bearer ${token}`
  //   }
// })
  return request('POST', `/files`, params);
}