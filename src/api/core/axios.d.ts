import axios from 'axios'

declare module 'axios' {
  interface AxiosRequestConfig {
    showErrMsg?: boolean // 显示错误消息
  }

  // 服务端返回内容
  interface IAxios<D = null> {
    code: string | number
    message: string
    data: D
  }
  export interface AxiosResponse<T = any> extends IAxios<D> {}
}
