<template>
  <div class="index">
    <Loading v-if="loading.show" :title="loading.title"/>
    <div ref="map" class="index__map"></div>
    <div class="index__switch-btn-wrap">
      <SwitchBtn  v-model="param.type" class="index__switch-btn"/>
      <button class="index__position" :class="{'index__position--disabled': !positionDisabled}" :disabled="positionDisabled" @click="getNowPosition()">
        <Fa :icon="['fas', 'crosshairs']" />
        <div class="index__position-tooltip-wrap">
          <div class="index__position-triangle"></div>
          <div class="index__position-tooltip">點擊目前位置</div>
        </div>
      </button>
    </div>
    <div class="index__search-sidebar-wrap" :class="{'index__search-sidebar-wrap--up': sidebarUp}" @click="sidebarUp = !sidebarUp">
      <div class="index__arrow" :class="{'index__arrow--up': sidebarUp}">
          <img src="~assets/icon/arrow_up.svg"/>
      </div>
      <SearchSidebar v-model="param" class="index__search-sidebar" :list="renderList" @clickCard="setMapCenterZoom" @goSearch="goSearch"/>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import MapInfoWindow from '~/components/MapInfoWindow'
import { getBikeStationNearBy, getBikeAvailabilityNearBy, getBikeStationByCity, getBikeAvailabilityByCity } from '~/api/api' 

export default {
  data() {
    return {
      loading: {
        show: false,
        title: "Loading..."
      },
      positionDisabled: false,
      nowPosition: {
        lat: 25.0252,
        lng: 121.3155,
      },
      sidebarUp: false,
      param: {
        type: 'rent',
        city: '',
        keyword: '',
      },
      map: null,
      markers: {},
      stationList: [],
      availabilityList: [],
      bikeInfoList: {},
      renderList: {},
    }
  },
  watch: {
    'param.type': {
      handler(val, oldVal) {
        // 切換地標 樣式
        for(const key in this.renderList) {
          const item = this.renderList[key];
          this.markers[key].setIcon(this.setMarkerIcon(item).url);
        }
      },
      deep: true,
    },
  },
  mounted() {
    // 取得目前位置
    this.getNowPosition();
  },
  methods: {
    // 取得目前位置
    getNowPosition() {
      if(navigator.geolocation) {
        this.param.city = '';
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
      if(this.param.city === '') {
        this.fetchBikeStationNearBy();
      }else {
        this.fetchBikeStationByCity();
      }
    },
    // 顯示地圖 地標 
    setMarkerList() {
      this.loading.show = true;
      this.loading.title = "站點資料載入中...";
      if(Object.keys(this.renderList).length > 0) {
        let count = 0;
        for(const key in this.renderList) {
          count++;
          const item = this.renderList[key];
          // 地標
          const marker = new window.google.maps.Marker({
            position: {
              lat: item.StationPosition.PositionLat,
              lng: item.StationPosition.PositionLon,
            },
            icon: this.setMarkerIcon(item),
            map: this.map,
          });
          this.markers[key] = marker;
          // 視窗
          const InfoWindow = Vue.extend(MapInfoWindow);
          const instance = new InfoWindow({
              propsData: {
                info: item,
              }
          });
          instance.$mount();
          const infoWindow = new window.google.maps.InfoWindow({
            content: instance.$el,
          });
          // 點擊地標打開視窗
          marker.addListener("click", () => {
            infoWindow.open({
              anchor: marker,
              map: this.map,
              shouldFocus: false,
            });
          });

          if(count === Object.keys(this.renderList).length) {
            this.loading.show = false;
          }
        }
      }else {
        this.loading.show = false;
      }
    },
    // 地圖上顯示的地標圖
    setMarkerIcon(item) {
      let count = null;
      let obj = null;
      if(this.param.type === 'rent'){
        // 借車
        count = item.AvailableRentBikes;
      }else {
        // 還車
        count = item.AvailableReturnBikes;
      }

      if(count <= 5 && count !== 0) {
        obj = {
          url: require('~/assets/icon/bike_marker_red.svg'),
        }
      }else if(count === 0) {
        obj = {
          url: require('~/assets/icon/bike_marker_gray.svg'),
        }
      }else {
        obj = {
          url: require('~/assets/icon/bike_marker_green.svg'),
        }
      }

      return obj;
    },
    // 地圖中央+放大
    setMapCenterZoom(item) {
      const latLng = new window.google.maps.LatLng(item.StationPosition.PositionLat, item.StationPosition.PositionLon); 
      this.map.panTo(latLng);
      this.map.setZoom(18);
    },
    // 地圖中央
    setMapCenter(latLng) {
      this.map.panTo(latLng);
    },
    goSearch() {
      this.loading.show = true;
      this.loading.title = "資料載入中...";

      this.stationList = [];
      this.availabilityList = [];
      this.bikeInfoList = {};
      this.renderList = {};
      
      if(this.param.city === '') {
        this.fetchBikeStationNearBy();
      }else {
        this.fetchBikeStationByCity();
      }
    },
    // api 縣市 租借站位資料
    fetchBikeStationByCity() {
      let param = {}
      if(this.param.keyword) {
        param = {
          '$filter': `contains('StationName', '${this.param.keyword}')`
        }
      }
      getBikeStationByCity(this.param.city, param).then(response => {
        this.stationList = response
        // 即時車位
        this.fetchBikeAvailabilityByCity();
      });
    },
    // api 縣市 即時車位
    fetchBikeAvailabilityByCity() {
        let param = { }
        if(this.param.keyword) {
          param = {
            '$filter': `contains('StationName', '${this.param.keyword}')`
          }
        }
        getBikeAvailabilityByCity(this.param.city, param).then(response => {
          this.availabilityList = response
          // 處理資料
          const tmpObj = {};
          if(this.stationList.length === this.availabilityList.length) {
              for(let i=0; i<this.stationList.length; i++) {
                  const item = this.stationList[i];
                  tmpObj[item.StationUID] = item
              }
              for(let i=0; i<this.availabilityList.length; i++) {
                  const item = this.availabilityList[i];
                  tmpObj[item.StationUID] =  Object.assign({}, tmpObj[item.StationUID], item);
              }
          }
          this.bikeInfoList = tmpObj;
          this.getDistance()
        });
    },
    // api 目前位置 附近的租借站位資料 1000m內的站點
    fetchBikeStationNearBy() {
      let param = {
        '$spatialFilter': `nearby(${this.nowPosition.lat}, ${this.nowPosition.lng}, 1000)`
      }
      if(this.param.keyword) {
        param = {
          '$spatialFilter': `nearby(${this.nowPosition.lat}, ${this.nowPosition.lng}, 1000)`,
          '$filter': `contains('StationName', '${this.param.keyword}')`
        }
      }

      getBikeStationNearBy(param).then(response => {
        this.stationList = response
        // 即時車位
        this.fetchBikeAvailabilityNearBy();
      });
    },
    // api 目前位置 附近的即時車位 1000m內的站點
    fetchBikeAvailabilityNearBy() {
        let param = {
          '$spatialFilter': `nearby(${this.nowPosition.lat}, ${this.nowPosition.lng}, 1000)`
        }
        if(this.param.keyword) {
          param = {
            '$spatialFilter': `nearby(${this.nowPosition.lat}, ${this.nowPosition.lng}, 1000)`,
            '$filter': `contains('StationName', '${this.param.keyword}')`
          }
        }
        getBikeAvailabilityNearBy(param).then(response => {
          this.availabilityList = response
          // 處理資料
          const tmpObj = {};
          if(this.stationList.length === this.availabilityList.length) {
              for(let i=0; i<this.stationList.length; i++) {
                  const item = this.stationList[i];
                  tmpObj[item.StationUID] = item
              }
              for(let i=0; i<this.availabilityList.length; i++) {
                  const item = this.availabilityList[i];
                  tmpObj[item.StationUID] =  Object.assign({}, tmpObj[item.StationUID], item);
              }
          }
          this.bikeInfoList = tmpObj;
          this.getDistance()
        });
    },
    getDistance() {
      let origins = null;
      if(this.param.city === '') {
        origins = new window.google.maps.LatLng(this.nowPosition.lat, this.nowPosition.lng);
      }else {
        origins = new window.google.maps.LatLng(this.bikeInfoList[Object.keys(this.bikeInfoList)[0]].StationPosition.PositionLat, this.bikeInfoList[Object.keys(this.bikeInfoList)[0]].StationPosition.PositionLon);
      }
      this.setMapCenter(origins);
      const destinationArr = [];
      for(const key in this.bikeInfoList) {
        const item = this.bikeInfoList[key];
        const latlng = new window.google.maps.LatLng(item.StationPosition.PositionLat, item.StationPosition.PositionLon);
        destinationArr.push(latlng)
      }
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
      {
        origins: [origins],
        destinations: destinationArr,
        travelMode: 'BICYCLING',
      }, this.getDistanceHandler);
    },
    getDistanceHandler(response, status) {
      if(response) {
        const distance = response.rows[0];
        let index = 0;
        for(const key in this.bikeInfoList) {
          const item = this.bikeInfoList[key];
          item.distance = distance.elements[index].distance.text;
          index++;
        }
      }
      this.renderList = this.bikeInfoList;
      this.setMarkerList();
      this.loading.show = false;
    },
  }
}
</script>
<style lang="scss" scoped>
.index {
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
      .index__position-tooltip-wrap {
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
  .index {
    &__switch-btn-wrap {
      position: absolute;
      right: 32px;
      left: unset;
    }
  }
}
@media screen and (max-width: 768px){
    .index {
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
        top: 60%;
        height: 40%;
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
