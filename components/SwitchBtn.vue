<template>
    <div class="switch-btn">
        <div class="switch-btn__wrap">
            <div class="switch-btn__checked-bg" :class="{'switch-btn__checked-bg--right': !switchLeft}"></div>
            <div class="switch-btn__btn-wrap">
                <div class="switch-btn__item" :class="{'switch-btn__item--active': switchLeft}" @click="changeValue('left')">
                    <Fa class="switch-btn__icon" :icon="['fas', 'bicycle']" />
                    <div>找單車</div>
                </div>
                <div class="switch-btn__item" :class="{'switch-btn__item--active': !switchLeft}" @click="changeValue('right')">
                    <Fa class="switch-btn__icon" :icon="['fas', 'parking']" />
                    <div>找車位</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            switchLeft: true,
        }
    },
    computed: {
        syncValue: {
            get() {
                return  this.value
            },
            set(v) {
                this.$emit('input', v)
            }
        }
    },
    methods:{
        changeValue(type) {
            if(type === 'left') {
                this.switchLeft = true;
                this.syncValue = 'bicycle'
            }else {
                this.switchLeft = false;
                this.syncValue = 'parking'
            }
        }
    },
}
</script>
<style lang="scss" scoped>
.switch-btn {
    display: inline-block;
    &__wrap {
        width: 276px;
        height: 60px;
        background: $white;
        padding: 8px 12px;
        box-shadow: 4px 4px 20px rgba(118, 118, 118, 0.3);
        border-radius: 40px;
    }
    &__btn-wrap {
        position: absolute;
        z-index: 2;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        white-space: nowrap;
    }
    &__checked-bg {
        width: 124px;
        height: 44px;
        position: absolute;
        z-index: 1;
        background: $primary-400;
        border-radius: 40px;
		transition: .3s ease-out all;
        &--right {
            transform: translateX(100%);
        }
    }
    &__item {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 124px;
        cursor: pointer;
        font-weight: bold;
        font-size: 18px;
        line-height: 28px;
        letter-spacing: 0.03em;
        padding: 8px 16px;
        color: $primary-400;
        &:hover {
            color: $primary-300;
        }
        &--active {
            color: $white;
        }
    }
    &__icon {
        margin-right: 8px;
    }
}
</style>
