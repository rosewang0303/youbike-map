<template>
    <div class="loading">
        <div class="loading__wrap">{{title}}</div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Loading...'
        },
    }
}
</script>
<style lang="scss" scoped>
    .loading {
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: $gray-400;
        opacity: 0.8;
        &__wrap {
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translateX(-50%);
            color: $white;
            font-weight: bold;
            font-size: 20px;
        }
    }
</style>