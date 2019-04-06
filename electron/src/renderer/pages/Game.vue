<template>
    <div>
        <UI></UI>
        <Character :show_bag="show_bag"></Character>
        <Candy type="1"></Candy>
        <Candy type="2"></Candy>
        <Candy type="3"></Candy>
        <div class="stand"></div>
        <Bag v-show="bag_showing" :on_clicked="bag_clicked"></Bag>
    </div>
</template>

<script>
  import SystemInformation from '../components/SystemInformation'
  import UI from '../components/UI'
  import Character from '../components/Character'
  import Bag from '../components/Bag'
  import Candy from '../components/Candy'

  export default {
    name: 'landing-page',
    components: { SystemInformation, UI, Character, Candy, Bag },
    data: function(){
        return {
            bag_showing : false
        };
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      show_bag: function(value){
          this.bag_showing = value;
      },
      bag_clicked: function(){

      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

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
      overflow: hidden;
    }

    .stand {
        position: absolute;
        bottom: 30px;
        left: calc(50% - 200px);
        background-image: url("../assets/img/stand.png");
        background-position: bottom center;
        background-size: contain;
        background-repeat: no-repeat;
        height: 200px;
        width: 400px;
    }

</style>
