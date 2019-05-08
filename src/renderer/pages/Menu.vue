<template>
<div>
    <router-link to="/game"><img src="../assets/img/candy-3.png" height="200"/></router-link>
    <h2>Candy Candy Candy</h2>
    <h1>Cliquez sur le bonbon pour lancer le jeu</h1>
    <div>
        <button @click="set_lang('fr')">FR</button>
        <button @click="set_lang('en')">EN</button>
    </div>
    <div class="stand"></div>
    </div>
</template>

<script>

    import store from '../store/index.js'

    export default {
        computed: {
            lang: function(){
                return store.state.Config.lang;
            }
        },
        mounted: function(){
            store.dispatch("set_lang",{key: 'fr'});
            console.log(this.lang);
        },
        methods: {
            set_lang: function(key){
                store.dispatch("set_lang",{key: key});
            }
        }
    }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  @import url('https://fonts.googleapis.com/css?family=Gloria+Hallelujah');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
      font-family: 'Source Sans Pro', sans-serif;
      background-image: url("../assets/img/background-1.png");
      background-position: bottom center;
      background-size: cover;
      background-repeat: no-repeat;
      height: 100vh;
      overflow: hidden;text-align: center;
      position: relative;
    }

    .stand {
    position: absolute;
    bottom: 0;
    left: calc(50% - 375px);
    background-image: url(../assets/img/stand.png);
    background-position: bottom center;
    background-size: contain;
    background-repeat: no-repeat;
    height: 755px;
    width: 750px;
}

h1 {
    position: absolute;
    width: 500px;
    left: calc(50% - 250px);
    bottom: 120px;
    font-size: 26px;
    z-index: 2;
    color: white;
    text-shadow: 0px 0px 10px black;
}

h2 {
    position: absolute;
    width: 500px;
    left: calc(50% - 250px);
    bottom: 650px;
    font-size: 36px;
    z-index: 2;
    color: white;
    opacity: 0.8;
}

@keyframes giggle{
    0%{ transform: rotate(0deg);}
    10%{ transform: rotate(0deg);}
    20%{transform: rotate(2.5deg);}
    30%{transform: rotate(-2.5deg);}
    40%{transform: rotate(0deg);}
    100% {transform: rotate(0deg); }
}

img {
    z-index: 5;
    position: absolute;
    bottom: 200px;
    left: calc(50% - 150px);
    cursor: pointer;
    animation-name: giggle;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    opacity: 0.9;
    transform-origin: bottom center;
    transition: height 0.5s;
}

img:hover {
    height: 220px;
    left: calc(50% - 157px);
}

</style>