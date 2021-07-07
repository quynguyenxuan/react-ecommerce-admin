
import { httpClient } from '../dataProvider/rest';


const request = (method: string, url: string, params: any = {}) => 
  httpClient(`${process.env.REACT_APP_API_URL}${url}`, {
  method,
  ...params
})

export async function createAgent(data: any): Promise<any> {
  console.log('createAgent::', data);
  return request('POST', `/convert/agents/${data.agentName}/jobs`, {
    json: data,
    body: JSON.stringify(data)
  });
}
