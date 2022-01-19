# THE F2E 3rd Week2-自行車道地圖資訊整合網

## 作品說明
查詢全台自行車車位資訊、和路線資訊，並在google地圖上顯示。

上週寫Vue，這週改用Nuxt.js Vue的SSR框架，使用google Map api提供的服務，有用到地圖呈現Maps JavaScript API，Distance Matrix API計算距離，以及自訂地圖樣式。

Demo：[https://thef2e-2021-week02.netlify.app/](https://thef2e-2021-week02.netlify.app/)

## 系統說明
```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## 資料夾說明
* api：api設定
* assets：icon圖/共用css樣式
* components：元件
* layouts：共用layout（header）
* pages：網站頁面
* service：axios設定 request response
* static：靜態檔


## 使用技術
* Vue.js
* Nuxt.js SSR
* SCSS
* axios


## 第三方服務
* google map api - Maps JavaScript API
* google map api - Distance Matrix API
* TDX api v2

