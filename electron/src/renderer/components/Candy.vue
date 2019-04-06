<template>
    <button class="candy" :class="{'is-active': is_active,'type-1': type == '1', 'type-2': type == '2', 'type-3': type == '3'}" @click="clicked">

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
        clicked: function(){
            if(this.is_active){
                this.on_clicked(this.type);
            }
        }
    },
    props: ['type', 'is_active', 'on_clicked']
  }
</script>

<style scoped>

    .candy {
        padding: 0;
        border: 0;
        outline: 0;
        background: none;
        z-index: 2;
        position: absolute;
        height: 50px;
        width: 50px;
        bottom: 200px;
        opacity: 0.5;
        background-position: bottom center;
        background-size: contain;
        background-repeat: no-repeat;

    }

    .candy.is-active {
        opacity: 1;
        cursor: pointer;
    }

    .candy.type-1 {
        background-image: url("../assets/img/candy-1.png");
        left: calc(50% - 125px);
    }
    .candy.type-2 {
        background-image: url("../assets/img/candy-2.png");
        left: calc(50% - 25px);
    }
    .candy.type-3 {
        background-image: url("../assets/img/candy-3.png");
        left: calc(50% + 75px);
    }

</style>
