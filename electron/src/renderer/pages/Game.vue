<template>
    <div>
        <UI :money="money" :bar_value="bar_value" bar_version="classic"></UI>
        <Character :next_clicked="next_clicked" :position="character.position" :current_step="character.current_step" :is_talking="character.is_talking" :show_bag="show_bag" :sprite="character.sprite" :steps="character.steps"></Character>
        <Candy type="1" :is_active="game_step == 'candy'" :on_clicked="candy_clicked"></Candy>
        <Candy type="2" :is_active="game_step == 'candy'" :on_clicked="candy_clicked"></Candy>
        <Candy type="3" :is_active="game_step == 'candy'" :on_clicked="candy_clicked"></Candy>
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

  import SpriteCharacter from "../assets/img/character.png"

  export default {
    name: 'landing-page',
    components: { SystemInformation, UI, Character, Candy, Bag },
    data: function(){
        return {
            bag_showing : false,
            money: 0,
            bar_value: 0,
            game_step: "walking",
            character: {
                sprite:  SpriteCharacter,
                steps: [
                    {
                        text: "Salut, je m'appelle Nick, Nick Tahmer !",
                        button: "Suivant"
                    },
                    {
                        text: "Je veux deux bonbons rouges"
                    }
                ],
                position: "start",
            is_talking: false,
            current_step: 0,

            }
        };
    },
    mounted: function(){
        setTimeout(function(){this.bar_value = 10}.bind(this),1000);
        setTimeout(function(){ this.character.position = "start";this.character.is_talking = false;}.bind(this), 0);
        setTimeout(function(){ this.character.position = "middle";}.bind(this), 2000);
        setTimeout(function(){ this.character.is_talking = true;}.bind(this), 7000);
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      show_bag: function(value){
          this.bag_showing = value;
          this.game_step = "candy";
      },
      candy_clicked: function(){

      },
      bag_clicked: function(){
          this.character.position = "finish";
          this.bag_showing = false;

                this.character.is_talking = false;
                this.character.current_step = 0;
                this.show_bag(false);
      },
       next_clicked: function (){
            if(this.character.current_step == 0){
                this.character.current_step++;
                this.show_bag(true);
            }

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
