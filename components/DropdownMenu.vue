<template>
    <div class="dropdown-menu">
        <div class="dropdown-menu__selected" @click="openMenu()">
            <div>{{selected.title}}</div>
        </div>
        <div v-if="menuOpen" class="dropdown-menu__menu">
            <div v-for="(item, index) in options" :key="index" class="dropdown-menu__menu-item" @click="selectOption(item)">{{item.title}}</div>
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
        options: {
            type: Array,
            default: () => { return [] }
        }
    },
    data() {
        return {
            selected: {
                value: '',
                title: '目前位置',
            },
            menuOpen: false,
        }
    },
    computed: {
        syncValue: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        },
    },
    watch: {
        value: {
            handler(val, oldVal) {
                for(let i=0; i<=this.options.length; i++) {
                    if(this.syncValue === this.options[i].value) {
                        this.selected.title = this.options[i].title
                        this.selected.value = this.options[i].value
                        return 
                    }
                }
            },
            immediate: true,
        },
    },
    beforeDestroy() {
        window.removeEventListener('click', this.clickHandler);
    },
    mounted() {
        // 監聽click事件
        window.addEventListener('click', this.clickHandler);
    },
    methods: {
        // 點擊選單外:選單關閉
        clickHandler(event) {
            if(!this.$el.contains(event.target)){
                this.menuOpen = false;
            }
        },
        selectOption(item) {
            this.syncValue = item.value;
            this.selected.value = item.value;
            this.selected.title = item.title;
            this.closeMenu();
        },
        openMenu() {
            this.menuOpen = true;
        },
        closeMenu() {
            this.menuOpen = false;
        },
    }
}
</script>
<style lang="scss" scoped>
.dropdown-menu {
    position: relative;
    z-index: 1;
    &__selected {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid $primary-300;
        border-radius: 8px;
        font-weight: bold;
        font-size: 15px;
        line-height: 20px;
        letter-spacing: 0.03em;
        color: $primary-400;
        padding: 8px 12px;
        white-space: nowrap;
        &:hover {
            background-color: $primary-100;
        }
    }
    &__menu {
        position: absolute;
        width: 100%;
        background: $white;
        border: 1px solid $primary-300;
        box-sizing: border-box;
        box-shadow: 4px 4px 20px rgba(118, 118, 118, 0.3);
        border-radius: 8px;
        padding: 3px 0;
        max-height: 120px;
        overflow: scroll;
    }
    &__menu-item {
        cursor: pointer;
        text-align: center;
        white-space: nowrap;
        font-weight: 500;
        font-size: 15px;
        line-height: 20px;
        letter-spacing: 0.03em;
        color: $primary-400;
        padding: 8px 11px;
        border-bottom: 1px solid $gray-300;
        &:nth-last-child(1) {
            border: none;
        }
        &:hover {
            background-color: $primary-100;
        }
    }
}
</style>