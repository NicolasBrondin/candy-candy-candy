<template>
    <div>
        <div class="money">
            {{money}}$
        </div>
        <div class="bar-container" :class="{'classic': bar_version == 'classic'}">
            <div class="outer-bar">
                <div class="inner-bar" :style="'height:'+bar_value+'%'">

                </div>
            </div>
            <img src="../assets/img/smiley.png" class="smiley" v-show="bar_value<50"/>
            <img src="../assets/img/smiley-2.png" class="smiley" v-show="bar_value>=50"/>
        </div>
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
    props: ["money", "bar_value", "bar_version"]
  }
</script>

<style scoped>
    .money {
        position: absolute;
        top: 25px;
        right: 260px;
        color: white;
        font-size: 60px;
        text-shadow: 0px 0px 10px black;
        font-family: Gloria Hallelujah;
    }

    .bar-container {
        position: absolute;
        left: 300px;
        top: 25px;
        transform: rotate(180deg);
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
    }

    .bar-container.classic .inner-bar {
        background: #51b553;
    }

    .smiley {
        transform: rotate(180deg);
    width: 30px;
    position: absolute;
    top: 11px;
    left: 6px;

    }

</style>
