<template>
    <div class="search-sidebar">
        <div class="search-sidebar__input-wrap">
            <InputText class="search-sidebar__input" placeholder="搜尋站點或鄰近地點" icon="search"/>
            <DropdownMenu class="search-sidebar__filter"/>
        </div>
        <div v-if="bikeInfoList.length == 0" class="search-sidebar__list-empty">查無資料</div>
        <div v-else>
            <BikeStationCard v-for="(item, index) in bikeInfoList" :key="index" :info="item" @clickStationCard="clickStationCard"/>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        bikeInfoList: {
            type: Object,
            default: () => { return {} }
        },
    },
    data() {
        return {
        }
    },
    watch: {
    },
    mounted() {
    },
    methods: {
        clickStationCard(item) {
            this.$emit("clickCard", item)
        }
    }
}
</script>
<style lang="scss" scoped>
.search-sidebar {
    width: 100%;
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
        width: 75%;
    }
    &__filter {
        width: 22%;
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
        
    }
}
@media screen and (max-width: 576px){
}
</style>