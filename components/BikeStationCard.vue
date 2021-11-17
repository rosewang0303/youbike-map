<template>
    <div class="bike-station-card" @click="clickStationCard()">
        <div v-if="info" class="bike-station-card__wrap">
            <div class="bike-station-card__name">{{info.StationName.Zh_tw}}</div>
            <div class="bike-station-card__info">
                <div class="bike-station-card__rent-park" 
                    :class="{'bike-station-card__rent-park--red': info.AvailableRentBikes <= 5, 'bike-station-card__rent-park--gray': info.AvailableRentBikes == 0}">
                    <div class="bike-station-card__info-title">
                        <Fa :icon="['fas', 'bicycle']" />
                        <div>可租借</div>
                    </div>
                    <div class="bike-station-card__info-count">{{info.AvailableRentBikes}}</div>
                </div>
                <div class="bike-station-card__rent-park"
                    :class="{'bike-station-card__rent-park--red': info.AvailableReturnBikes <= 5, 'bike-station-card__rent-park--gray': info.AvailableReturnBikes == 0}">
                    <div class="bike-station-card__info-title">
                        <Fa :icon="['fas', 'parking']" />
                        <div>可停車</div>
                    </div>
                    <div class="bike-station-card__info-count">{{info.AvailableReturnBikes}}</div>
                </div>
            </div>
            <div class="bike-station-card__note">
                <div v-if="info.ServiceStatus == 1" class="bike-station-card__status"
                    :class="{'bike-station-card__status--gray': statusText == '無法借還',
                        'bike-station-card__status--red': statusText == '只可還車' || statusText == '只可借車'}">{{statusText}}</div>
                <div v-else class="bike-station-card__status">{{info.ServiceStatus==0?'停止營運':'暫停營運'}}</div>
                <div class="bike-station-card__distance">
                    <Fa :icon="['fas', 'map-marker-alt']" />
                    <div>距離{{info.distance}}</div>
                </div>
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
    computed: {
        statusText() {
            if(this.info.AvailableRentBikes > 0 && this.info.AvailableReturnBikes > 0) {
                return '可借可還'
            }else if(this.info.AvailableRentBikes <= 0 && this.info.AvailableReturnBikes > 0) {
                return '只可還車'
            }else if(this.info.AvailableRentBikes > 0 && this.info.AvailableReturnBikes <= 0) {
                return '只可借車'
            }else {
                return '無法借還'
            }
        }
    },
    methods: {
        clickStationCard() {
            this.$emit("clickStationCard", this.info)
        }
    }
}
</script>
<style lang="scss" scoped>
.bike-station-card {
    cursor: pointer;
    padding: 0 32px;
    &:hover {
        background-color: $gray-200;
    }
    &__wrap {
        padding: 20px 0;
        border-bottom: 1px solid $gray-300;
    }
    &__name {
        font-weight: bold;
        font-size: 22px;
        line-height: 26px;
        letter-spacing: 0.04em;
        color: $primary-500;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 12px;
    }
    &__info {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    &__rent-park {
        width: 47%;
        text-align: center;
        background-color: $primary-100;
        border-radius: 8px;
        padding: 8px;
        color: $primary-500;
        &--red {
            background-color: $alert-100;
            color: $alert-600;
        }
        &--gray {
            background-color: $gray-200;
            color: $gray-400;
        }
    }
    &__info {
        margin-bottom: 12px;
    }
    &__info-title {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        font-size: 15px;
        line-height: 20px;
        letter-spacing: 0.03em;
        div {
            margin-left: 4px;
        }
    }
    &__info-count {
        font-size: 26px;
        line-height: 31px;
        letter-spacing: 0.05em;
        margin-top: 4px;
    }
    &__note {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    &__status {
        border: 1px solid $accent-300;
        border-radius: 6px;
        font-weight: 500;
        font-size: 15px;
        line-height: 20px;
        display: flex;
        align-items: center;
        letter-spacing: 0.03em;
        color: $accent-500;
        padding: 6px 12px;
        &--red {
            color: $alert-400;
            border: 1px solid $alert-300;
        }
        &--gray {
            color: $gray-400;
            border: 1px solid $gray-300;
        }
    }
    &__distance {
        display: flex;
        align-items: center;
        font-size: 15px;
        line-height: 20px;
        letter-spacing: 0.03em;
        color: $gray-500;
        div {
            margin-left: 4px;
        }
    }
}
@media screen and (max-width: 768px){
    .bike-station-card {
        
    }
}
@media screen and (max-width: 576px){
}
</style>