<template>
    <div>
        <div class="money">
            0$
        </div>
        <div class="bar-container">
            <div class="outer-bar">
                <div class="inner-bar">

                </div>
            </div>
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

    }
  }
</script>

<style scoped>
    .money {
        position: absolute;
        top: 25px;
        left: 25px;
        color: white;
        font-size: 42px;
        text-shadow: 0px 0px 10px black;
    }

    .bar-container {
         position: absolute;
        left: 25px;
        top: 100px;
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
        background: #ee25ec;
        width: 100%;
        height: 10%;
    }
</style>
