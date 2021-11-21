<template>
    <div class="search-sidebar">
        <div class="search-sidebar__input-wrap">
            <InputText v-model="syncValue.keyword" class="search-sidebar__input" placeholder="搜尋站點或鄰近地點" icon="search" @search="goSearch"/>
            <DropdownMenu v-model="syncValue.city" class="search-sidebar__filter" :options="optionList"/>
        </div>
        <div v-if="list.length == 0" class="search-sidebar__list-empty">查無資料</div>
        <div v-else-if="type =='station'">
            <BikeStationCard v-for="(item, index) in list" :key="index" :info="item" @clickCard="clickCard"/>
        </div>
        <div v-else>
            <BikeRouteCard v-for="(item, index) in list" :key="index" :info="item" @clickCard="clickCard"/>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: Object,
            default: () => { return {} }
        },
        list: {
            type: Array,
            default: () => { return [] }
        },
        optionList: {
            type: Array,
            default: () => { return [] }
        },
        type: {
            type: String,
            default: 'station',
        },
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
    mounted() {

    },
    methods: {
        clickCard(item) {
            this.$emit("clickCard", item)
        },
        goSearch() {
            this.$emit("goSearch", this.syncValue)
        },
    }
}
</script>
<style lang="scss" scoped>
.search-sidebar {
    background: $white;
    box-shadow: 4px 4px 20px rgba(118, 118, 118, 0.3);
    border-radius: 8px;
    padding: 28px 0;
    overflow: scroll;
    &__input-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 32px;
        margin-bottom: 8px;
    }
    &__input {
        width: 65%;
    }
    &__filter {
        width: 32%;
    }
    &__list-empty {
        color: $primary-400;
        font-weight: 500;
        text-align: center;
        margin-top: 20px;
    }
}
@media screen and (max-width: 768px){
    .search-sidebar {
        box-shadow: 0px -2px 4px rgba(118, 118, 118, 0.3);
    }
}
@media screen and (max-width: 576px){
}
</style>