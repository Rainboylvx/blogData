import axios, {AxiosInstance,AxiosRequestConfig} from 'axios';


function PathJoin(...args:string[]) {
    let ret = args.length ? args[0] : "/";
    for( let i = 1 ;i < args.length ;i++) {
        if( ret[ret.length-1] != '/')
            ret += '/'
        if( args[i][0] == '/')
            ret += args[i].slice(1)
        else
            ret += args[i];
    }
    return ret;
}

export const md_json_path_convert = (org_path:string,out_dir:string) =>{
    return PathJoin(out_dir,org_path.replace(/\.md$/, '.json'))
}

//根据配置创建一个axios的实例
export const createAxiosByinterceptors = (
  config?: AxiosRequestConfig
): AxiosInstance => {
  const instance = axios.create({
    timeout: 3000,    //超时时间
    baseURL:'/',
    //withCredentials: true,  //跨域携带cookie
    ...config,   // 自定义配置覆盖基本配置
  });

    // const mainStore = useMainStore()
// 添加请求拦截器
  instance.interceptors.request.use(
    function (config: any) {
      // 在发送请求之前做些什么
      console.log("config:", config);
      // config.headers.Authorization = vm.$Cookies.get("vue_admin_token");

        const { loading = true } = config;
        // if( loading ) addLoading()
      return config;
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  instance.interceptors.response.use(
    function (response) {
        // const { loading = true } = <any>response.config;
        // if( loading) cancelLoading()

      // 对响应数据做点什么
      console.log("response:", response);
      return response.data
      const { status : code, data, message } = response.data;
      if (code === 200) return data;
      else if (code === 401) {
         //jumpLogin();
      } else {
         //Message.error(message);
         return Promise.reject(response.data);
      }
    },
    function (error) {
      // 对响应错误做点什么
      console.log("error-response:", error.response);
      console.log("error-config:", error.config);
      console.log("error-request:", error.request);
      if (error.response) {
        if (error.response.status === 401) {
          //jumpLogin();
        }
      }
      //Message.error(error?.response?.data?.message || "服务端异常");
      return Promise.reject(error);
    }
  );

  return instance;
};

const service = axios.create({
    baseURL: '/', // 设置统一的请求前缀
    timeout: 3000, // 设置统一的超时时长
});

function myAxios(axiosConfig:AxiosRequestConfig) {
  return service(axiosConfig)
}


const axios_inst = createAxiosByinterceptors();

interface md_server_return_interface {
    __content:string
}

export const get_md = (filename:string) : Promise<md_server_return_interface>  => {
    if( /.*\.md/.test(filename) )
        filename = md_json_path_convert(filename,'dist')
    return axios_inst({
        url: filename,
        method: 'get',
    })
}
