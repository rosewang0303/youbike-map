<template>
    <div class="bike-route-card" @click="clickCard()">
        <div v-if="info" class="bike-route-card__wrap">
            <div class="bike-route-card__name-city-wrap">
                <div class="bike-route-card__name">{{info.RouteName}}</div>
                <div class="bike-route-card__city">
                    <Fa :icon="['fas', 'map-marker-alt']" />
                    <div>{{info.City}}</div>
                </div>
            </div>
            <div class="bike-route-card__info">
                <img src="~assets/icon/line.svg"/>
                <div class="bike-route-card__route-wrap">
                    <div class="bike-route-card__route">
                        <div class="bike-route-card__title">起</div>
                        <div class="bike-route-card__value">{{info.RoadSectionStart}}</div>
                    </div>
                    <div class="bike-route-card__route">
                        <div class="bike-route-card__title">訖</div>
                        <div class="bike-route-card__value">{{info.RoadSectionEnd}}</div>
                    </div>
                </div>
            </div>
            <div class="bike-route-card__note">
                <div class="bike-route-card__distance">
                    <Fa class="header__icon" :icon="['fas', 'route']" />
                    <div>總長{{info.CyclingLength}}公尺</div>
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
        
    },
    methods: {
        clickCard() {
            this.$emit("clickCard", this.info)
        }
    }
}
</script>
<style lang="scss" scoped>
.bike-route-card {
    cursor: pointer;
    padding: 0 32px;
    &:hover {
        background-color: $gray-200;
    }
    &__wrap {
        padding: 20px 0;
        border-bottom: 1px solid $gray-300;
    }
    &__name-city-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
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
    &__city {
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 15px;
        line-height: 20px;
        letter-spacing: 0.03em;
        color: $gray-400;
        div {
            margin-left: 4px;
        }
    }
    &__info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
    }
    &__route-wrap {
       width: calc(100% - 4px);
    }
    &__route {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 12px;
    }
    &__title {
        padding: 8px 12px;
        width: 39px;
        height: 39px;
        background: $primary-100;
        border-radius: 8px;
        font-weight: 500;
        font-size: 15px;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.03em;
        color: $primary-500;
        margin-left: 4px;
        margin-right: 8px;
    }
    &__value {
        padding: 8px 12px;
        width: calc(100% - 48px);
        height: 39px;
        background: $primary-100;
        border-radius: 8px;
        font-weight: 500;
        font-size: 15px;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        letter-spacing: 0.03em;
        color: $primary-500;
    }
    &__note {
        display: flex;
        align-items: center;
        justify-content: flex-end; 
    }
    &__distance {
        display: flex;
        align-items: center;
        font-weight: 500;
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
    .bike-route-card {
        
    }
}
@media screen and (max-width: 576px){
}
</style>