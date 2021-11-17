import axios from 'axios'
import JsSHA from 'jssha';

const APP_ID = "d3fd45c9c5bd4b298f967b59745777f9";
const APP_KEY = "pcWWHmwwZnFYdO-A0mvrlFXsypk";
const BASE_URL = "https://ptx.transportdata.tw/MOTC";

const service = axios.create({
    baseURL: BASE_URL,
    timeout: 15000 // 請求逾時
})

// request 攔截
service.interceptors.request.use( config => {
    // header
    const GMTString = new Date().toGMTString();
    const ShaObj = new JsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(APP_KEY, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    const HMAC = ShaObj.getHMAC('B64');
    const Authorization = `hmac username="${APP_ID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;

    config.headers.common.Authorization = Authorization
    config.headers.common['X-Date'] = GMTString

    return config
}, error => {
    console.info("request:: ", error)
})
// response 攔截
service.interceptors.response.use( response => {
    return response.data
}, error => {
    console.info("response:: ", error)

    return Promise.reject(error)
})

export default service