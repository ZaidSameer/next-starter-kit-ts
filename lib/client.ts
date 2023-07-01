import axios from 'axios'

class AxiosClient {
  constructor(private baseURL: string) {}

  async get(url: string, params?: any): Promise<any> {
    const response = await axios.get(`${this.baseURL}${url}`, {
      params
    })
    return response.data
  }

  async post(url: string, data: any): Promise<any> {
    const response = await axios.post(`${this.baseURL}${url}`, data)
    return response.data
  }

  put(url: string, data: any) {
    return axios.put(`${this.baseURL}${url}`, data)
  }

  delete(url: string) {
    return axios.delete(`${this.baseURL}${url}`)
  }
}

export default AxiosClient
