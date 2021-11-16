<template>
    <div class="bike-station-card">
        <div class="bike-station-card__wrap">
            <div class="bike-station-card__name">捷運臺大醫院站 (四號出口)</div>
            <div class="bike-station-card__info">
                <div class="bike-station-card__rent">
                    <div class="bike-station-card__info-title">
                        <Fa :icon="['fas', 'bicycle']" />
                        <div>可租借</div>
                    </div>
                    <div class="bike-station-card__info-count">40</div>
                </div>
                <div class="bike-station-card__park">
                    <div class="bike-station-card__info-title">
                        <Fa :icon="['fas', 'parking']" />
                        <div>可停車</div>
                    </div>
                    <div class="bike-station-card__info-count">50</div>
                </div>
            </div>
            <div class="bike-station-card__note">
                <div class="bike-station-card__status">可借可還</div>
                <div class="bike-station-card__distance">
                    <Fa :icon="['fas', 'map-marker-alt']" />
                    <div>距離25公尺</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.bike-station-card {
    padding: 20px 0;
    border-bottom: 1px solid $gray-300;
    &__wrap {

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
    &__rent,  
    &__park {
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