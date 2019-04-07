<template>
    <div>
        <div class="money">
            {{money}}$
        </div>
        <!--<div class="bar-container" :class="{'classic': bar_value < 50, 'intense': bar_value >=50 && bar_value < 80, 'psyche': bar_value >= 80 && bar_value < 120, 'reverse': bar_value >=120 }">
            <div class="outer-bar">
                <div class="inner-bar" :style="'height:'+bar_value+'%'">

                </div>
            </div>
            <img src="../assets/img/smiley.png" class="smiley" v-show="bar_value<50"/>
            <img src="../assets/img/smiley-2.png" class="smiley" v-show="bar_value>=50 && bar_value < 80"/>
            <img src="../assets/img/smiley-3.png" class="smiley" v-show="bar_value>=80 && bar_value < 120"/>
            <img src="../assets/img/smiley-4.png" class="smiley" v-show="bar_value >= 120"/>
        </div>-->
    </div>
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
    props: ["money", "bar_value"]
  }
</script>

<style scoped>
    .money {
        position: absolute;
        top: 25px;
        left: 260px;
        color: white;
        font-size: 60px;
        text-shadow: 0px 0px 10px black;
        font-family: Gloria Hallelujah;
        z-index: 999;
    }

    .bar-container {
        position: absolute;
        left: 300px;
        top: 25px;
        transform: rotate(180deg);
        z-index: 2000;
    }

    .outer-bar {
        position: relative;
        background: transparent;
        width: 42px;
        height: 200px;
        border: 3px solid white;
        border-radius: 1000px;
        overflow: hidden;
    }

    .inner-bar {
        width: 100%;
        transition-duration: 0.5s;
        transition-property: height;
        border-radius: 1000px;
    }

    .bar-container.classic .inner-bar {
        background-color: #51b553;
    }
    .bar-container.intense .inner-bar {
        background-color: #8400ff;
    }

    @keyframes psyche {
        0% {background-position-y: 0px;}
        100% {background-position-y: 1000px;}
    }

    @keyframes danger {
        0% {background-color: #c0392b;}
        50% {background-color: #f1c40f;}
        100% {background-color: #c0392b;}
    }

    .bar-container.psyche .inner-bar {
        background: linear-gradient(#8400ff,#ff0000,#fff600,#00ff18,#8400ff);
        animation-name: psyche;
        animation-duration: 10s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    .bar-container.reverse .inner-bar {
        animation-name: danger;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    .smiley {
        transform: rotate(180deg);
        width: 30px;
        position: absolute;
        top: 11px;
        left: 6px;
    }

</style>
