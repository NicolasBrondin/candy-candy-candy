<template>
    <div>
        <UI :money="money" :bar_value="bar_value" bar_version="classic"></UI>
        <Character :next_clicked="next_clicked" :position="character.position" :step="character.current_dialog" :is_talking="character.is_talking" :show_bag="show_bag" :sprite="character.sprite"></Character>
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
                dialogs: {
                    start: [
                        {
                            text: "Salut, je m'appelle Nick, Nick Tahmer !",
                            button: "Suivant"
                        },
                        {
                            text: "Je veux deux bonbons rouges",
                            action: "show_bag"
                        }
                    ],
                    end: [
                        {
                            text: "Merci !",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ],
                    bad: [
                        {
                            text: "Enculé",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ]
                },
                money: 10,
                points: 5,
                expected_bag: {1:2,2:0,3:0},
                current_bag: {1:0,2:0,3:0},
                position: "start",
                is_talking: false,
                current_dialog: {},
                current_dialog_index: 0,
                current_dialog_type: "start"
            }
        };
    },
    mounted: function(){
        this.refresh_dialog();
        setTimeout(function(){this.bar_value = 10}.bind(this),1000);
        setTimeout(function(){ this.character.position = "start";this.character.is_talking = false;}.bind(this), 0);
        setTimeout(function(){ this.character.position = "middle";}.bind(this), 2000);
        setTimeout(function(){ this.character.is_talking = true;}.bind(this), 7000);
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      show_bag: function(){
          this.bag_showing = true;
          this.game_step = "candy";
      },
      candy_clicked: function(type){
          this.character.current_bag[type]++;
      },
      finish_character: function(){
          this.character.position = "finish";
          this.character.is_talking = false;
      },
      bag_clicked: function(){
          if(JSON.stringify(this.character.expected_bag) == JSON.stringify(this.character.current_bag)){
            this.money += this.character.money;
            this.points += this.character.points;
            this.character.current_dialog_type = "end";
            this.character.current_dialog_index = 0;
            this.refresh_dialog();
          } else {
            this.points += this.character.points;
            this.character.current_dialog_type = "bad";
            this.character.current_dialog_index = 0;
            this.refresh_dialog();
          }
          this.bag_showing = false;

      },
       next_clicked: function (){
            this.character.current_dialog_index++;
            this.refresh_dialog();
        },
        refresh_dialog: function(){
            this.character.current_dialog = this.character.dialogs[this.character.current_dialog_type][this.character.current_dialog_index];
            if(this.character.current_dialog.action){
                this[this.character.current_dialog.action]();
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
