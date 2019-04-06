<template>
    <button class="bag" @click="on_clicked">

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
    props: ['on_clicked']
  }
</script>

<style scoped>

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
        bottom: -30px;
        background-position: center center;
        background-size: contain;
        background-repeat: no-repeat;
        background-image: url("../assets/img/bag.png");
        left: calc(50% - 75px);
    }

</style>
