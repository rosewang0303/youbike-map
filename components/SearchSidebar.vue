<template>
    <div class="search-sidebar">
        <div class="search-sidebar__input-wrap">
            <InputText v-model="syncValue.keyword" class="search-sidebar__input" placeholder="搜尋站點或鄰近地點" icon="search" @search="goSearch"/>
            <DropdownMenu v-model="syncValue.city" class="search-sidebar__filter" :options="optionList"/>
        </div>
        <div v-if="list.length == 0" class="search-sidebar__list-empty">查無資料</div>
        <div v-else>
            <BikeStationCard v-for="(item, index) in list" :key="index" :info="item" @clickStationCard="clickStationCard"/>
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
            type: Object,
            default: () => { return {} }
        },
    },
    data() {
        return {
            optionList: [
                {title:"目前位置",value:""},
                {title:"臺北市",value:"Taipei"},
                {title:"新北市",value:"NewTaipei"},
                {title:"桃園市",value:"Taoyuan"},
                {title:"臺中市",value:"Taichung"},
                {title:"臺南市",value:"Tainan"},
                {title:"高雄市",value:"Kaohsiung"},
                {title:"基隆市",value:"Keelung"},
                {title:"新竹市",value:"Hsinchu"},
                {title:"新竹縣",value:"HsinchuCounty"},
                {title:"苗栗縣",value:"MiaoliCounty"},
                {title:"彰化縣",value:"ChanghuaCounty"},
                {title:"南投縣",value:"NantouCounty"},
                {title:"雲林縣",value:"YunlinCounty"},
                {title:"嘉義縣",value:"ChiayiCounty"},
                {title:"嘉義市",value:"Chiayi"},
                {title:"屏東縣",value:"PingtungCounty"},
                {title:"宜蘭縣",value:"YilanCounty"},
                {title:"花蓮縣",value:"HualienCounty"},
                {title:"臺東縣",value:"TaitungCounty"},
                {title:"金門縣",value:"KinmenCounty"},
                {title:"澎湖縣",value:"PenghuCounty"},
                {title:"連江縣",value:"LienchiangCounty"},
            ],
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
        clickStationCard(item) {
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