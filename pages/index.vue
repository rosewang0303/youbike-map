<template>
  <div class="index">
    <Loading v-if="loading"/>
    <div ref="map" class="index__map"></div>
    <div class="index__switch-btn-wrap">
      <SwitchBtn  v-model="param.type" class="index__switch-btn"/>
      <div class="index__position" :class="{'index__position--disabled': !positionDisabled}" @click="getNowPosition()">
        <Fa :icon="['fas', 'crosshairs']" />
        <div class="index__position-tooltip-wrap">
          <div class="index__position-triangle"></div>
          <div class="index__position-tooltip">點擊定位</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      positionDisabled: false,
      nowPosition: {
        lat: 23.973875,
        lng: 120.982024,
      },
      param: {
        type: 'bicycle'
      },
      map: null,
    }
  },
  mounted() {
    // 取得目前位置
    this.getNowPosition();
  },
  methods: {
    // 取得目前位置
    getNowPosition() {
      if(navigator.geolocation) {
        this.loading = true;
        // 跟使用者拿所在位置的權限
        navigator.geolocation.getCurrentPosition(this.getNowPositionResponse, this.getNowPositionError);
      } else {
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
      this.loading = false;
    },
  }
}
</script>
<style lang="scss" scoped>
.index {
  &__switch-btn-wrap {
    position: absolute;
    top: 36px;
    left: 50%;
    transform: translateX(-50%);
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
    &--disabled {
      background-color: $gray-300;
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
    height: 100vh;
  }
}
</style>
