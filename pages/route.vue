<template>
  <div class="route">
    <Loading v-if="loading.show" :title="loading.title"/>
    <div ref="map" class="route__map"></div>
    <div class="route__switch-btn-wrap">
      <button class="route__position" :class="{'route__position--disabled': !positionDisabled}" :disabled="positionDisabled" @click="getNowPosition()">
        <Fa :icon="['fas', 'crosshairs']" />
        <div class="route__position-tooltip-wrap">
          <div class="route__position-triangle"></div>
          <div class="route__position-tooltip">點擊目前位置</div>
        </div>
      </button>
    </div>
    <div class="route__search-sidebar-wrap" :class="{'route__search-sidebar-wrap--up': sidebarUp}">
      <div class="route__arrow" :class="{'route__arrow--up': sidebarUp}" @click="sidebarUp = !sidebarUp">
          <img src="~assets/icon/arrow_up.svg"/>
      </div>
      <SearchSidebar v-model="param" class="route__search-sidebar" :list="routeList" @clickCard="setRouteMap" @goSearch="goSearch" type="route" :optionList="optionList"/>
    </div>
  </div>
</template>
<script>
import { getCyclingShapenByCity } from '~/api/api' 

export default {
  data() {
    return {
      loading: {
        show: true,
        title: "Loading..."
      },
      positionDisabled: false,
      nowPosition: {
        lat: 25.0252,
        lng: 121.3155,
      },
      sidebarUp: false,
      param: {
        city: 'Taipei',
        keyword: '',
      },
      optionList: [
        {title:"臺北市",value:"Taipei"},
        {title:"新北市",value:"NewTaipei"},
        {title:"桃園市",value:"Taoyuan"},
        {title:"臺中市",value:"Taichung"},
        {title:"臺南市",value:"Tainan"},
        {title:"高雄市",value:"Kaohsiung"},
        {title:"基隆市",value:"Keelung"},
        {title:"新竹市",value:"Hsinchu"},
        {title:"新竹縣",value:"HsinchuCounty"},
        {title:"苗栗縣",value:"MiaoliCounty"},
        {title:"彰化縣",value:"ChanghuaCounty"},
        {title:"南投縣",value:"NantouCounty"},
        {title:"雲林縣",value:"YunlinCounty"},
        {title:"嘉義縣",value:"ChiayiCounty"},
        {title:"嘉義市",value:"Chiayi"},
        {title:"屏東縣",value:"PingtungCounty"},
        {title:"宜蘭縣",value:"YilanCounty"},
        {title:"花蓮縣",value:"HualienCounty"},
        {title:"臺東縣",value:"TaitungCounty"},
        {title:"金門縣",value:"KinmenCounty"},
        {title:"澎湖縣",value:"PenghuCounty"},
        {title:"連江縣",value:"LienchiangCounty"},
    ],
      map: null,
      markers: [],
      path: null,
      paths: [],
      routeList: [],
    }
  },
  watch: {
  },
  mounted() {
    // 取得目前位置
    this.getNowPosition();
  },
  methods: {
    // 取得目前位置
    getNowPosition() {
      if(navigator.geolocation) {
        this.param.city = 'Taipei';
        // 跟使用者拿所在位置的權限
        navigator.geolocation.getCurrentPosition(this.getNowPositionResponse, this.getNowPositionError);
      }else {
        console.error('裝置不支援地理位置功能')
      }
    },
    // 使用者不提供權限，或是發生其它錯誤
    getNowPositionError() {
      console.error('無法取得你的位置');
      this.initMap()
    },
    // 使用者允許抓目前位置，回傳經緯度
    getNowPositionResponse(position) {
      this.nowPosition.lat = position.coords.latitude;
      this.nowPosition.lng = position.coords.longitude;
      this.initMap()
    },
    // 建立地圖
    initMap() {
      this.loading.show = true;
      this.loading.title = "地圖載入中...";
      // 透過 Map 物件建構子建立新地圖 map 物件實例，並將地圖呈現在 id 為 map 的元素中
      this.map = new window.google.maps.Map(this.$refs.map, {
        mapId: 'c3d33e9acb848309',
        // 設定地圖的中心點經緯度位置
        center: { lat: this.nowPosition.lat, lng: this.nowPosition.lng },
        // 設定地圖縮放比例 0-20
        zoom: 15,
        // 限制使用者能縮放地圖的最大比例
        maxZoom: 20,
        // 限制使用者能縮放地圖的最小比例
        minZoom: 3,
        // 設定是否呈現右下角街景小人
        streetViewControl: false,
        // 設定是否讓使用者可以切換地圖樣式：一般、衛星圖等
        mapTypeControl: false,
      });
      
      this.loading.title = "資料載入中...";
      this.setNowMarker();

      this.fetchCyclingShapenByCity();
    },
    // 顯示現在位置 
    setNowMarker() {
      this.loading.show = true;
      this.loading.title = "目前位置載入中...";

      const marker = new window.google.maps.Marker({
        position: {
          lat: this.nowPosition.lat,
          lng: this.nowPosition.lng,
        },
        icon: {
          url: require('~/assets/icon/user_position.svg')
        },
        map: this.map,
      });
      console.log(marker);
      this.loading.show = false;
    },
    // 刪除 地標路線
    deleteMarkerPath() {
        this.paths.forEach(function(path) {
            path.setMap(null);
        });
        this.paths = [];

        this.markers.forEach(function(marker) {
            marker.setMap(null);
        });
        this.markers = [];
    },
    // 顯示地圖 地標 
    setMarker(positionLat, positionLng) {
        this.loading.show = true;
        this.loading.title = "路線資料載入中...";
        const marker = new window.google.maps.Marker({
            position: {
                lat: positionLat,
                lng: positionLng,
            },
            icon: {
                url: require('~/assets/icon/route_position.svg')
            },
            map: this.map,
        });

        this.markers.push(marker)
        console.log(marker)

        this.loading.show = false;
    },
    // 地圖 路線顯示
    setRouteMap(item) {
        this.loading.show = true;
        this.loading.title = "路線資料載入中...";

        this.deleteMarkerPath();

        this.map.setZoom(16);
        const routeLatLon = item.Geometry.toString().replaceAll(`MULTILINESTRING ((`,'').replaceAll(`))`,'').replaceAll(`(`,'').replaceAll(`)`,'').split(',')

        const pathArr = [];
        for(let i=0; i<routeLatLon.length; i++) {
            const arr = routeLatLon[i].split(" ");
            const lat = parseFloat(arr[1]);
            const lng = parseFloat(arr[0]);
            const latLng = new window.google.maps.LatLng(lat, lng); 

            if(i === 0) {
                this.setMarker(lat, lng)
                this.map.panTo(latLng);
            }
            if(i === routeLatLon.length-1) {
                this.setMarker(lat, lng)
            }
            pathArr.push(latLng);
        }

        const path = new window.google.maps.Polyline({
            path: pathArr,
            strokeColor: '#E75578',
            strokeOpacity: 1,
            strokeWeight: 7
        });
        this.paths.push(path)
        path.setMap(this.map);

        this.loading.show = false;
    },
    goSearch() {
      this.loading.show = true;
      this.loading.title = "資料載入中...";

      this.routeList = [];
      this.fetchCyclingShapenByCity();
    },
    // api 縣市 自行車路線
    fetchCyclingShapenByCity() {
        this.loading.title = "資料搜尋中...";
        let param = ""
        if(this.param.keyword) {
            param = {
            '$filter': `contains('RouteName', '${this.param.keyword}')`
            }
        }

        getCyclingShapenByCity(this.param.city, param).then(response => {
            this.routeList = response

            this.loading.show = false;
        });
    },
    // getDistance() {
    //   let origins = null;
    //   if(this.param.city === '') {
    //     origins = new window.google.maps.LatLng(this.nowPosition.lat, this.nowPosition.lng);
    //   }else {
    //     origins = new window.google.maps.LatLng(this.bikeInfoList[Object.keys(this.bikeInfoList)[0]].StationPosition.PositionLat, this.bikeInfoList[Object.keys(this.bikeInfoList)[0]].StationPosition.PositionLon);
    //   }
    //   this.setMapCenter(origins);
    //   const destinationArr = [];
    //   for(const key in this.bikeInfoList) {
    //     const item = this.bikeInfoList[key];
    //     const latlng = new window.google.maps.LatLng(item.StationPosition.PositionLat, item.StationPosition.PositionLon);
    //     destinationArr.push(latlng)
    //   }
    //   const service = new window.google.maps.DistanceMatrixService();
    //   service.getDistanceMatrix(
    //   {
    //     origins: [origins],
    //     destinations: destinationArr,
    //     travelMode: 'BICYCLING',
    //   }, this.getDistanceHandler);
    // },
    // getDistanceHandler(response, status) {
    //   if(response) {
    //     const distance = response.rows[0];
    //     let route = 0;
    //     for(const key in this.bikeInfoList) {
    //       const item = this.bikeInfoList[key];
    //       item.distance = distance.elements[route].distance.text;
    //       route++;
    //     }
    //   }
    //   this.renderList = this.bikeInfoList;
    //   this.setMarkerList();
    //   this.loading.show = false;
    // },
  }
}
</script>
<style lang="scss" scoped>
.route {
  &__switch-btn-wrap {
    position: absolute;
    top: 36px;
    left: 35%;
    display: flex;
    align-items: center;
  }
  &__switch-btn {
    margin-right: 12px;
  }
  &__position {
    cursor: pointer;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: $primary-400;
    box-shadow: 4px 4px 20px rgba(118, 118, 118, 0.3);
    color: $white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    &:hover {
      background: $primary-500;
      .route__position-tooltip-wrap {
        display: block;
      }
    }
    &:disabled {
      background-color: $gray-300;
    }
    &:focus {
      border: 3px solid $primary-500;
    }
  }
  &__position-tooltip-wrap {
    display: none;
    position: absolute;
    top: 74px;
  }
  &__position-triangle {
    position: absolute;
    left: 50%;
    top: -6px;
    transform: translateX(-50%);
    border-style: solid;
    border-width: 0 8px 14px 8px;
    border-color: transparent transparent $accent-400 transparent;
  }
  &__position-tooltip {
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.01em;
    color: $white;
    background-color: $accent-400;
    border-radius: 4px;
    padding: 3px 6px;
    white-space: nowrap;
    box-shadow: 4px 4px 20px rgba(118, 118, 118, 0.3);
  }
  &__map {
    width: 100%;
    height: calc(100vh - 82px);
  }
  &__search-sidebar {
    height: calc(100vh - 154px);
    width: 100%;
  }
  &__search-sidebar-wrap {
    position: absolute;
    top: 36px;
    left: 32px;
    width: 30%;
  }
  &__arrow {
    display: none;
    position: absolute;
    top: -28px;
    left: 50%;
    transform: translateX(-50%);
    background: $white;
    box-shadow: 0px -2px 4px rgba(118, 118, 118, 0.3);
    border-radius: 6px 6px 0px 0px;
    text-align: center;
    padding: 2px 36px;
    img {
        transition: 0.5s all ease;
    }
    &--up {
        img {
            transform: rotate(180deg);
        }
    }
  }
}
@media screen and (max-width: 992px){
  .route {
    &__switch-btn-wrap {
      position: absolute;
      right: 32px;
      left: unset;
    }
  }
}
@media screen and (max-width: 768px){
    .route {
      &__map {
        height: 70vh;
      }
      &__search-sidebar {
        height: calc(100vh - 45%);
      }
      &__arrow {
        display: block;
      }
      &__switch-btn-wrap {
        position: absolute;
        top: 12px;
        left: 50%;
        right: unset;
        transform: translateX(-50%);
      }
      &__search-sidebar-wrap {
        width: 100%;
        transition: 0.5s all ease;
        left: 0;
        top: 80%;
        height: 20%;
        &--up {
          top: 20%;
          height: 80%;
        }
      }
      &__position-tooltip-wrap {
        top: 52px;
      }
      &__position {
        width: 40px;
        height: 40px;
        font-size: 20px;
      }
    }
}
@media screen and (max-width: 576px){
}
</style>
