<template>
    <nav class="header">
        <div class="header__nav">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="header__wrap">
                            <img class="header__logo" src="~/assets/logo.svg"/>
                            <Fa :icon="['fas', 'bars']" class="header__menu-icon" @click="openMenu = !openMenu"/>
                            <ul class="header__item-wrap">
                                <li class="header__item">
                                    <nuxt-link :to="{name: 'index'}">
                                        <button class="btn">
                                            <Fa class="header__icon" :icon="['fas', 'bicycle']" />找單車
                                        </button>
                                    </nuxt-link>
                                </li>
                                <li class="header__item">
                                    <nuxt-link :to="{name: 'route'}">
                                        <button class="btn">
                                            <Fa class="header__icon" :icon="['fas', 'route']" />找路線
                                        </button>
                                    </nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ul v-if="openMenu" class="header__menu">
            <li class="header__item" @click="openMenu = !openMenu">
                <nuxt-link :to="{name: 'index'}">
                    <Fa class="header__icon" :icon="['fas', 'bicycle']" />
                    <div>找單車</div>
                </nuxt-link>
            </li>
            <li class="header__item" @click="openMenu = !openMenu">
                <nuxt-link :to="{name: 'route'}">
                    <Fa class="header__icon" :icon="['fas', 'route']" />
                    <div>找路線</div>
                </nuxt-link>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
  data() {
    return {
        openMenu: false,
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
    &__nav {
        width: 100%;
        padding: 22px 0;
        background-color: $primary-400;
    }
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
    &__menu {
        display: none;
    }
    &__menu-icon {
        display: none;
    }
}   
@media screen and (max-width: 768px){
    .header {
        &__nav {
            padding: 10px 20px;
        }
        &__logo {
            width: 106px;
        }
        &__item-wrap {
            display: none;
        }
        &__menu-icon {
            display: block;
            color: $white;
            font-size: 15px;
        }
        &__menu {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: $primary-100;
            padding: 8px 12px;
        }
        &__item {
            margin: 0;
            font-weight: bold;
            font-size: 12px;
            line-height: 18px;
            letter-spacing: 0.03em;
            color: $primary-400;
            text-align: center;
            width: 50%;
            &:nth-child(2) {
                border-left: 1px solid $primary-300;
            }
        }
        a {
            color: $primary-400;
        }
    }
}
</style>