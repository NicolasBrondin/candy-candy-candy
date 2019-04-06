<template>
    <div class="popup-container">
        <h1>Jour 1</h1>
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
    props: []
  }
</script>

<style scoped>

    @keyframes fade-out {
        0% {
            opacity: 0.9;
        }
        100% { opacity: 0.0;}
    }
    .popup-container {
        position: absolute;
        display: flex;
        top: 0;
        left: 0;
        width:100vw;
        height: 100vh;
        background: black;
        z-index: 1000;
        opacity: 0.9;
        text-align: center;
        align-items: center;
        align-content: center;
        pointer-events:none;
        animation-name: fade-out;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        animation-duration: 2s;
        animation-delay: 1s;
    }

    h1 {
        color: white;
        text-align: center;
        font-size: 80px;
        margin: auto;
        font-family: Gloria Hallelujah;
    }


</style>
