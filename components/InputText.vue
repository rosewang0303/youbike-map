<template>
    <div class="input-text">
        <input v-model="syncValue" :type="type" :placeholder="placeholder" :disabled="disabled"/>
        <Fa v-if="icon == 'search'" class="input-text__icon input-text__icon--search" :icon="['fas', 'search']" @click="search()"/>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: String,
            default: null,
        }, // 綁定的值:menuList的index
        placeholder: {
            type: String,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'text',
        },
        icon: {
            type: String,
            default: null,
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
    methods: {
        // 搜尋
        search() {
            this.$emit('search', this.syncValue)
        },
    }
}
</script>
<style lang="scss" scoped>
.input-text {
    input {
        width: 100%;
        background: $gray-200;
        padding: 9px 20px;
        border: 2px solid $gray-200;
        box-sizing: border-box;
        border-radius: 8px;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: $black;
        &:hover {
            border: 2px solid $primary-300;
        }
        &:focus {
            border: 2px solid $primary-300;
        }
        &::placeholder {
            color: $gray-500;
        }
    }
    &__icon {
        cursor: pointer;
        &--search {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 20px;
            color: $gray-500;
            font-size: 20px;
        }
    }
}
</style>