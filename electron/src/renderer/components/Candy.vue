<template>
    <button class="candy" :class="{'is-active': is_active, 'type-1': type == '1', 'type-2': type == '2', 'type-3': type == '3'}" @click="clicked">
        <div class="shadow-candy" :class="{'animated': animated}"></div>
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
            if(this.is_active){
                this.animated = true;
                setTimeout(function(){this.animated = false;}.bind(this),500);
                this.on_clicked(this.type);
            }
        }
    },
    props: ['type', 'is_active', 'on_clicked']
  }
</script>

<style scoped>

    @keyframes clicked-1 {
        0% {
            transform: translate(0px, 0px) scale(1.0);
        }
        100% {
            transform: translate(260px, -140px) scale(0.5);
        }
    }

    @keyframes clicked-2 {
        0% {
            transform: translate(0px, 0px);
        }
        100% {
            transform: translate(120px, -100px) scale(0.5);
        }
    }

    @keyframes clicked-3 {
        0% {
            transform: translate(0px, 0px);
        }
        100% {
            transform: translate(0px, -120px) scale(0.5);
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

    .shadow-candy {
        position: relative;
        height: 100px;
        width: 100px;
        background-position: bottom center;
        background-size: contain;
        background-repeat: no-repeat;
    }

    .shadow-candy.animated {
        animation-duration: 0.5s;
        animation-timing-function: ease-in-out;
    }

    .candy.is-active {
        opacity: 1;
        cursor: pointer;
    }

    .candy.is-active:hover {
        opacity: 1;
        cursor: pointer;
        transform: scale(1.1);
    }

    .candy.type-1,.candy.type-1 .shadow-candy {
        background-image: url("../assets/img/candy-1.png");
    }

    .candy.type-1 .shadow-candy.animated {
        animation-name: clicked-1;
    }

    .candy.type-1{
        left: calc(50% - 200px);
    }


    .candy.type-2, .candy.type-2 .shadow-candy {
        background-image: url("../assets/img/candy-2.png");
    }
    .candy.type-2{
        left: calc(50% - 50px);
    }

    .candy.type-2 .shadow-candy.animated {
        animation-name: clicked-2;
    }

    .candy.type-3, .candy.type-3 .shadow-candy {
        background-image: url("../assets/img/candy-3.png");
    }
    .candy.type-3 {
        left: calc(50% + 100px);
    }

    .candy.type-3 .shadow-candy.animated {

        animation-name: clicked-3;
    }
</style>
