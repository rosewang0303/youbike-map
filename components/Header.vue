<template>
    <nav class="header">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="header__wrap">
                        <img class="header__logo" src="~/assets/logo.svg"/>
                        <ul class="header__item-wrap">
                            <li class="header__item">
                                <button class="btn">
                                    <Fa class="header__icon" :icon="['fas', 'bicycle']" />找單車
                                </button>
                            </li>
                            <li class="header__item">
                                <button class="btn">
                                    <Fa class="header__icon" :icon="['fas', 'route']" />找路線
                                </button>
                            </li>
                            <li class="header__item">
                                <button class="btn">
                                    <Fa class="header__icon" :icon="['fas', 'umbrella-beach']" />找景點
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<style lang="scss" scoped>
.header {
    padding: 22px 0;
    background-color: $primary-400;
    &__wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    &__logo {

    }
    &__item-wrap {
        display: flex;
        align-items: center;
    }
    &__item {
        margin-left: 16px;
    }
    &__icon {
        margin-right: 4px;
    }
}   
</style>