import request from '~/service'

// 取得指定[縣市]的公共自行車租借站位資料
export function getBikeStationByCity(city, paramObj) {
    return request({
        url: `/v2/Bike/Station/${city}`,
        method: 'get',
        params: paramObj
    })
}
// 取得動態指定[縣市]的公共自行車即時車位資料
export function getBikeAvailabilityByCity(city, paramObj) {
    return request({
        url: `/v2/Bike/Availability/${city}`,
        method: 'get',
        params: paramObj
    })
}
// 取得指定縣市之自行車道路網圖資 {City}
export function getCyclingShapenByCity(city, paramObj) {
    return request({
        url: `/v2/Cycling/Shape/${city}`,
        method: 'get',
        params: paramObj
    })
}
// 取得指定[位置,範圍]的全臺公共自行車租借站位資料
export function getBikeStationNearBy(paramObj) {
    return request({
        url: `/v2/Bike/Station/NearBy`,
        method: 'get',
        params: paramObj
    })
}
// 取得指定[位置,範圍]的全臺公共自行車即時車位資料
export function getBikeAvailabilityNearBy(paramObj) {
    return request({
        url: `/v2/Bike/Availability/NearBy`,
        method: 'get',
        params: paramObj
    })
}