<template>
    <div class="popup-container" v-if="showing">
        <div>
            <h1>Jour {{day}}</h1>
            <h2 v-show="day > 1">Argent: {{money}}$</h2>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
        return {
            showing: false
        }
    },
    mounted: function(){

    },
    methods: {

    },
    watch: {
    day: function (val) {
        this.showing = true;
        setTimeout(function(){this.showing = false;}.bind(this),3000);
    }
    },
    props: ['day', 'money']
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

    .popup-container div {

        margin: auto;
    }

    h1, h2 {
        color: white;
        text-align: center;
        font-size: 80px;
        font-family: Gloria Hallelujah;
    }
    h2 {
        font-size: 40px;
    }
</style>

