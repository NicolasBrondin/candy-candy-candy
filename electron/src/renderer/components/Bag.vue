<template>
    <button class="bag" @click="on_clicked" :class="{'is-showing': is_showing}">
        <span>Terminer la commande</span>
    </button>
</template>

<script>
  export default {
    data () {
        return {
        }
    },
    mounted: function(){

    },
    methods: {

    },
    props: ['is_showing', 'on_clicked']
  }
</script>

<style scoped>

    @keyframes glowing {
        0% { transform: scale(1.05)}
        50% { transform: scale(1)}
        100% { transform: scale(1.05)}
    }

    .bag {
        padding: 0;
        border: 0;
        outline: 0;
        background: none;
        z-index: 2;
        position: absolute;
        height: 150px;
        width: 150px;
        cursor: pointer;
        background-position: center center;
        background-size: contain;
        background-repeat: no-repeat;
        background-image: url("../assets/img/bag.png");
        left: calc(50% - 75px);
        bottom: -150px;
        transition-duration: 0.5s;
        transition-property: bottom;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        font-family: Gloria Hallelujah;
        transform-origin: center bottom;

    }

    .bag.is-showing {
        bottom: 210px;
        left: calc(50% + 100px);
    }

    .bag span {
        position: absolute;
        color: white;
        left: 110px;
        bottom: 50px;
        width: 200px;
        font-size: 18px;
        font-weight: bold;
        text-shadow: 0px 0px 10px black;
        text-align: center;
        line-height: 20px;
    }

    .bag:not(:hover) {
        animation-name: glowing;
    }

    .bag:hover {
        transform: scale(1.1);
    }

</style>
