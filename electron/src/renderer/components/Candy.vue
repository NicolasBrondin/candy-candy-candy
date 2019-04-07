<template>
    <button class="candy" :class="{'animated': animated, 'is-active': is_active, 'is-available': is_available, 'type-1': type == '1', 'type-2': type == '2', 'type-3': type == '3', 'type-4': type == '4'}" @click="clicked">
        <div class="shadow-candy"></div>
        <span v-show="!is_available">{{price}}$</span>
    </button>
</template>

<script>
  export default {
    data () {
        return {
            animated: false
        }
    },
    mounted: function(){

    },
    methods: {
        clicked: function(){
            if(this.is_active && this.is_available){
                this.animated = true;
                setTimeout(function(){this.animated = false;}.bind(this),500);
                this.on_clicked(this.type);
            } else if(!this.is_available){
                this.on_unlock(this.type, this.price);
            }
        }
    },
    props: ['type','is_available','price', 'is_active', 'on_clicked', 'on_unlock']
  }
</script>

<style scoped>

    @keyframes clicked-1 {
        0% {
            transform: translate(0px, 0px) scale(1.0);
        }
        100% {
            transform: translate(370px, -140px) scale(0.5);
        }
    }

    @keyframes clicked-2 {
        0% {
            transform: translate(0px, 0px);
        }
        100% {
            transform: translate(260px, -120px) scale(0.5);
        }
    }

    @keyframes clicked-3 {
        0% {
            transform: translate(0px, 0px);
        }
        100% {
            transform: translate(150px, -120px) scale(0.5);
        }
    }

    @keyframes clicked-4 {
        0% {
            transform: translate(0px, 0px);
        }
        100% {
            transform: translate(40px, -120px) scale(0.5);
        }
    }

    @keyframes jump {
        0% {
            transform: translate(0px, 0px);
        }
        40% {
            transform: translate(0px, 0px);
        }
        50% {
            transform: translate(0px, -10px);
        }
        60% {
            transform: translate(0px, 0px);
        }
        100% {
            transform: translate(0px, 0px);
        }
    }

    .candy{
        padding: 0;
        border: 0;
        outline: 0;
        background: none;
        z-index: 2;
        position: absolute;
        height: 100px;
        width: 100px;
        bottom: 100px;
        opacity: 0.5;
        background-position: bottom center;
        background-size: contain;
        background-repeat: no-repeat;
        transition-duration: 0.3s;
        transition-property: transform;
    }

    .candy span {
        position: absolute;
        right: -25px;
        top: 20px;
        color: white;
        font-family: Gloria Hallelujah;
        font-size: 26px;
    }

    .shadow-candy {
        position: relative;
        height: 100px;
        width: 100px;
        background-position: bottom center;
        background-size: contain;
        background-repeat: no-repeat;
        display: none;
    }

    .candy.animated .shadow-candy {
        animation-duration: 0.5s;
        animation-timing-function: ease-in-out;
        display: block;
    }

    .candy.is-active.is-available {
        opacity: 1;
        cursor: pointer;
        animation-name: jump;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }

    .candy.is-active:hover, .candy:not(.is-available):not(.is-active):hover {
        opacity: 1;
        cursor: pointer;
        transform: scale(1.1);
    }

    .candy.type-1.is-available, .candy.type-1 .shadow-candy {
        background-image: url("../assets/img/candy-1.png");
    }

    .candy.type-1:not(.is-available) {
        background-image: url("../assets/img/candy-1-shadow.png");
    }

    .candy.animated.type-1 .shadow-candy {
        animation-name: clicked-1;
    }

    .candy.type-1{
        left: calc(50% - 250px);
        animation-delay: 0s;
    }


    .candy.type-2.is-available, .candy.type-2 .shadow-candy {
        background-image: url("../assets/img/candy-2.png");
    }

    .candy.type-2:not(.is-available) {
        background-image: url("../assets/img/candy-2-shadow.png");
    }
    .candy.type-2{
        left: calc(50% - 150px);
        animation-delay: 0.5s;
    }

    .candy.animated.type-2 .shadow-candy {
        animation-name: clicked-2;
    }

    .candy.type-3.is-available, .candy.type-3 .shadow-candy {
        background-image: url("../assets/img/candy-3.png");
    }
    .candy.type-3:not(.is-available){
        background-image: url("../assets/img/candy-3-shadow.png");
    }
    .candy.type-3 {
        left: calc(50% - 15px);
        animation-delay: 1s;
    }

    .candy.animated.type-3 .shadow-candy {
        animation-name: clicked-3;
    }

    .candy.type-4.is-available, .candy.type-4 .shadow-candy {
        background-image: url("../assets/img/candy-4.png");
    }
    .candy.type-4:not(.is-available){
        background-image: url("../assets/img/candy-4-shadow.png");
    }
    .candy.type-4 {
        left: calc(50% + 100px);
        animation-delay: 1.5s;
    }

    .candy.animated.type-4 .shadow-candy {
        animation-name: clicked-4;
    }
</style>
