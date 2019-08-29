import Rx from 'rxjs'
import lodash from 'lodash'
import NProgress from 'nprogress';

const { envType, hostOptions } = require('../../web.config.json')


class Http {
    /** 
    * 请求路径前缀
    */
    address = process.env.NODE_ENV == 'development' ? hostOptions[envType.dev].bankHost : hostOptions[envType.pro].bankHost

    /**
     * 请求超时设置
     */
    timeout = 10000

    /**
     * 请求头
     */
    private headers = {
        credentials: 'include',
        accept: "*/*",
        "Content-Type": "application/json",
        "token": null
    }
    /**
      * 获取 认证 token请求头
      */
    getHeaders() {
        this.headers.token = window.localStorage.getItem('__token') || null;
        return this.headers
    }
    /**
    * ajax Observable 管道
    * @param Observable 
    */
    private AjaxObservable(Observable: Rx.Observable<Rx.AjaxResponse>) {
        return Observable
            // 超时时间
            .timeout(this.timeout)
            // 错误处理
            .catch(err => Rx.Observable.of(err))
            // 数据过滤
            .map(this.responseMap)
            // 数据筛选
            .filter(this.filter);
    }

    /**
     * ajax过滤
     */
    private responseMap = (res) => {
        setTimeout(() => {
            this.ToastLoding("start")
        });
        if (res.status == 200) {
            // 判断是否统一数据格式，是走状态判断，否直接返回 response
            if (res.response && res.response.status) {
                switch (res.response.status) {
                    case 200:
                        return res.response.data;
                        break;
                    default:
                        throw {
                            url: res.request.url,
                            request: res,
                            message: res.response.message,
                            response: res.response
                        }
                        return false
                        break;
                }
            }
            return res.response
        }
        throw {
            url: res.request.url,
            request: res,
            message: res.message,
            response: false
        }
    }

    /**
     * 过滤 map 返回的 假值  
     */
    private filter(res) {
        return res;
    }

    /**
     * url 兼容处理 
     * @param address 前缀
     * @param url url
     * @param endStr 参数
     */
    compatibleUrl(address: string, url: string, endStr?: string) {
        endStr = endStr || ''
        if (/^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/.test(url)) {
            return `${url}${endStr}`;
        }
        else {
            // address  / 结尾  url / 开头
            const isAddressWith = lodash.endsWith(address, "/")
            const isUrlWith = lodash.startsWith(url, "/")
            // debugger
            if (isAddressWith) {
                if (isUrlWith) {
                    url = lodash.trimStart(url, "/")
                }
            } else {
                if (!isUrlWith) {
                    url = "/" + url;
                } 
            }
        }
        return `${address}${url}${endStr}`
    }

    /**
    * get
    * @param url 
    * @param body 
    * @param headers 
    */
    get(url: string, body?: { [key: string]: any } | string, headers?: Object): Rx.Observable<any> {
        this.getHeaders();
        headers = { ...this.headers, ...headers };
        body = this.formatBody(body);
        url = this.compatibleUrl(this.address, url, body as any);
        return this.AjaxObservable(Rx.Observable.ajax.get(url))
    }
    /**
    * post
    * @param url 
    * @param body 
    * @param headers 
    */
    post(url: string, body?: any, headers?: Object): Rx.Observable<any> {
        this.getHeaders();
        headers = { ...this.headers, ...headers };
        body = this.formatBody(body, "body", headers);
        url = this.compatibleUrl(this.address, url);
        return this.AjaxObservable(Rx.Observable.ajax.post(url, body))
    }
    /**
    * 格式化 参数
    * @param body  参数 
    * @param type  参数传递类型
    * @param headers 请求头 type = body 使用
    */
    formatBody(
        body?: { [key: string]: any } | any[] | string,
        type: "url" | "body" = "url",
        headers?: Object
    ): any {
        this.ToastLoding()
        if (type === "url") {
            let param = "";
            if (typeof body != 'string') {
                let parlist = [];
                lodash.forEach(body, (value, key) => {
                    if (!lodash.isNil(value) && value != "") {
                        parlist.push(`${key}=${value}`);
                    }
                });
                if (parlist.length) {
                    param = "?" + parlist.join("&");
                }
            } else {
                param = body;
            }
            return param;
        } else {
            // 处理 Content-Type body 类型 
            switch (headers["Content-Type"]) {
                case 'application/json;charset=UTF-8':
                    body = JSON.stringify(body)
                    break;
                case 'application/json':
                    if (lodash.isArray(body)) {
                        body = [...body]
                    }
                    if (lodash.isPlainObject(body)) {
                        body = { ...body as any }
                    }
                    break;
                case 'application/x-www-form-urlencoded':
                    break;
                case 'multipart/form-data':
                    break;
                case null:
                    delete headers["Content-Type"];
                    break;
                default:
                    break;
            }
            return body;
        }
    }
    /**
    *  加载进度条
    * @param type 
    */
    protected ToastLoding(type: 'start' | 'done' = 'start') {
        if (type == "start") {
            NProgress.start();
        } else {
            NProgress.done();
        }
    }
}


export default new Http()