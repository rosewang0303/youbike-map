<template>
    <div class="dropdown-menu">
        <div class="dropdown-menu__selected">
            <Fa :icon="['fas', 'sort-amount-down']" />
            <div>排序</div>
        </div>
        <div class="dropdown-menu__menu">
        
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
}
</script>
<style lang="scss" scoped>
.dropdown-menu {
    width: 100%;
    &__selected {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
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

    }
}
</style>