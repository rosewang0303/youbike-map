<template>
    <div class="map-info-window">
        <div class="map-info-window__name">{{info.StationName.Zh_tw}}</div>
        <div class="map-info-window__info-wrap">
          <div class="map-info-window__status">
            <div class="map-info-window__rent-park"
                :class="{'map-info-window__rent-park--red': info.AvailableRentBikes <= 5, 'map-info-window__rent-park--gray': info.AvailableRentBikes == 0}">
                <Fa :icon="['fas', 'bicycle']" />
                <div>{{info.AvailableRentBikes}}</div>
            </div>
            <div class="map-info-window__rent-park" 
                :class="{'map-info-window__rent-park--red': info.AvailableReturnBikes <= 5, 'map-info-window__rent-park--gray': info.AvailableReturnBikes == 0}">
                <Fa :icon="['fas', 'parking']" />
                <div>{{info.AvailableReturnBikes}}</div>
            </div>
          </div>
          <div class="map-info-window__distance">
            <Fa :icon="['fas', 'map-marker-alt']" />
            <div>距離{{info.distance}}</div>
          </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        info: {
            type: Object,
            default: () => { return {} }
        },
    },
}
</script>
<style lang="scss" scoped>
.map-info-window {
  width: 344px;
  height: 96px;
  padding: 16px 24px;
  border: 2px solid $primary-300;
  box-shadow: 4px 4px 20px rgba(118, 118, 118, 0.3);
  border-radius: 8px;
  &__name {
    font-weight: bold;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: 0.03em;
    color: $primary-500;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 8px;
  }
  &__info-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__status {
    display: flex;
    align-items: center;
  }
  &__rent-park {
    background: $primary-100;
    border-radius: 4px;
    font-weight: bold;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: 0.03em;
    color: $primary-500;
    margin-right: 12px;
    display: flex;
    align-items: center;
    padding: 4px 12px;
    div {
        margin-left: 8px;
    }
    &--red {
        background: $alert-100;
        color: $alert-500;
    }
    &--gray {
        background: $gray-200;
        color: $gray-400;
    }
  }
  &__distance {
    font-weight: 500;
    font-size: 15px;
    line-height: 20px;
    display: flex;
    align-items: center;
    letter-spacing: 0.03em;
    color: $gray-500;
    div {
      margin-left: 4px;
    }
  }
}
// overwrite
// .gm-style .gm-style-iw-c {
//     padding: 0;
// }
// .gm-style-iw-d {
//     overflow: hidden !important;
// }
</style>