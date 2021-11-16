import axios from 'axios'

const service = axios.create({
    baseURL: 'https://ptx.transportdata.tw/MOTC',
    timeout: 15000 // 請求逾時
})

// request 攔截
service.interceptors.request.use( config => {
    console.info(config)

    return config
}, error => {
    console.error("request:: ", error)
})
// response 攔截
service.interceptors.response.use( response => {
    const res = response;
    console.error(res)
}, error => {
    console.error("response:: ", error)
})

export default service