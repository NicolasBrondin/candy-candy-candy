<template>
    <button class="bag" @click="on_clicked" :class="{'is-showing': is_showing}">
        <span>Clic sur le sac pour le redonner</span>
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
    }

    .bag.is-showing {
        bottom: -30px;
    }

    .bag span {
        position: absolute;
        color: white;
        left: 150px;
        width: 150px;
        font-size: 16px;
        text-shadow: 0px 0px 10px black;
    }

</style>
