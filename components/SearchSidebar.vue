<template>
    <div class="search-sidebar">
        <div class="search-sidebar__input-wrap">
            <InputText class="search-sidebar__input" placeholder="搜尋站點或鄰近地點" icon="search"/>
            <DropdownMenu class="search-sidebar__filter"/>
        </div>
        <BikeStationCard />
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.search-sidebar {
    width: 100%;
    background: $white;
    box-shadow: 4px 4px 20px rgba(118, 118, 118, 0.3);
    border-radius: 8px;
    padding: 28px 32px;
    overflow: scroll;
    &__input-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    &__input {
        width: 75%;
    }
    &__filter {
        width: 22%;
    }
}
@media screen and (max-width: 768px){
    .search-sidebar {
        
    }
}
@media screen and (max-width: 576px){
}
</style>