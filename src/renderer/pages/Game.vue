<template>
    <div>
        <Popup :day="day_index" :money="money"></Popup>
        <UI :money="money" :bar_value="points" bar_version="classic"></UI>
        <Character v-if="character" :money="money" :candies="character.expected_bag" :next_clicked="next_clicked" :position="character.position" :step="character.current_dialog" :is_fear="character.current_dialog.state == 'fear'" :is_angry="character.current_dialog.state == 'angry'" :is_talking="character.is_talking" :show_bag="show_bag" :sprite="character.sprite"></Character>
        <Candy type="1" :is_available="available_candies[1]" :on_unlock="unlock_candy" price="5" :is_active="game_step == 'candy'" :on_clicked="candy_clicked"></Candy>
        <Candy type="2" v-show="!tuto" :is_available="available_candies[2]" :on_unlock="unlock_candy" price="15" :is_active="game_step == 'candy'" :on_clicked="candy_clicked"></Candy>
        <Candy type="3" v-show="!tuto" :is_available="available_candies[3]" :on_unlock="unlock_candy" price="50" :is_active="game_step == 'candy'" :on_clicked="candy_clicked"></Candy>
        <Candy type="4" v-show="!tuto" :is_available="available_candies[4]" :on_unlock="unlock_candy" price="100" :is_active="game_step == 'candy'" :on_clicked="candy_clicked"></Candy>
        <div class="stand"></div>
        <Bag :is_showing="bag_showing" :on_clicked="bag_clicked"></Bag>
    </div>
</template>

<script>


  import Vue from 'vue'
    import store from '../store/index.js'
  import Popup from '../components/Popup'
  import UI from '../components/UI'
  import Character from '../components/Character'
  import Bag from '../components/Bag'
  import Candy from '../components/Candy'

  import characters_en from "../data/en.js"
  import characters_fr from "../data/fr.js"

  export default {
    name: 'landing-page',
    components: { UI, Character, Candy, Bag , Popup},
    computed: {
        lang: function(){
            return store.state.Config.lang;
        }
    },
    data: function(){
        return {
            tuto: true,
            bag_showing : false,
            money: 0,
            points: 0,
            game_step: "walking",
            available_candies: {1:true},
            character: null,
            character_index: 0,
            day_index: 0,
            wait_timer : null,
            background_music: null,
            characters: null
        };
    },
    mounted: function(){
        this.day_index = 1;
        console.log(this.lang);
        if(this.lang === "fr"){
            this.characters = characters_fr;
        } else {
            this.characters = characters_en;
        }
        setTimeout(function(){
            setTimeout(function(){this.points = 10}.bind(this),1000);
            this.load_character();
        }.bind(this), 2000);
    },
    methods: {
        load_music: function(name){
            if(this.background_music){
                this.background_music.pause();
                this.background_music.src = null;
                this.background_music = null
            }
            this.background_music = new Audio("static/"+name+".mp3");
            this.background_music.loop = true;
            this.background_music.play();
        },
        load_sprite: function(s){
            this.character.sprite = s;
        },
        finish_tuto: function(){
            this.tuto = false;
        },
        generate_bag: function(){
            let bag = {};
            bag[1] = Math.floor((Math.random()*1.5*this.day_index)+1);
            if(this.available_candies[2]){
                bag[2] = Math.floor((Math.random()*1.5*this.day_index)+1);
            } else {
                bag[2] = 0;
            }
            if(this.available_candies[3]){
            bag[3] = Math.floor((Math.random()*1.5*this.day_index)+1);
            } else {
                bag[3] = 0;
            }
            if(this.available_candies[4]){
            bag[4] = Math.floor((Math.random()*1.5*this.day_index)+1);
            } else {
                bag[4] = 0;
            }
            Vue.set(this.character,"expected_bag",bag);
            console.log(this.character.expected_bag);
        },
        load_character: function(){
            this.current_bag = {1:0,2:0,3:0,4:0};
			this.character = this.characters[this.day_index][this.character_index];
            this.generate_bag();
            this.character.is_talking = false;
			this.character.position = "start";
			let walking_sound = new Audio("static/walking.mp3");
			this.character.is_talking = false;
			this.refresh_dialog();
            setTimeout(function(){
				this.character.position = "middle";
				walking_sound.play();
			}.bind(this), 500);
            setTimeout(function(){
				this.character.is_talking = true;
				walking_sound.pause();
				/*if(this.character.current_dialog.text != ""){
					let speaking_sound = new Audio("static/speaking.mp3");
					speaking_sound.play();
				}*/
			}.bind(this), 2500);
        },
        reload_bag: function(){
            this.current_bag = {1:0,2:0,3:0,4:0};
            this.character.current_dialog_type = "start";
            let bag_dialog = this.character.dialogs.start.forEach(function(d, index){
                if(d.action == "show_bag") {
                    this.character.current_dialog_index = index;
                }
            }.bind(this));
			this.refresh_dialog();
        },
      show_bag: function(){
          setTimeout(function(){
          	this.bag_showing = true;
			  this.game_step = "candy";
			  this.wait_timer = setTimeout(function(){
				  if(this.character.dialogs.wait){
					  this.game_step = "dialog";
					  this.character.current_dialog_type = "wait";
					  this.character.current_dialog_index = 0;
					  this.refresh_dialog();
						this.bag_showing = false;
				  }
			  }.bind(this), 20000);
            }.bind(this),1500);
      },
      candy_clicked: function(type){
		  	let candy_sound = new Audio("static/candy.mp3");
			candy_sound.play();
          	this.current_bag[type]++;
      },
      finish_character: function(){

			  this.character.position = "finish";
			  this.character.is_talking = false;
			  let walking_sound = new Audio("static/walking.mp3");
			  walking_sound.play();
			  setTimeout(function(){
				walking_sound.pause();
			}.bind(this), 2000);
          	setTimeout(function(){
                  this.character_index++;
                  if(!this.characters[this.day_index][this.character_index]){
                      this.character_index = 0;
                      this.day_index++;
                  }
                this.load_character();
          	}.bind(this),2000)
      },
      bag_clicked: function(){
		  this.game_step = "dialog";
		  clearTimeout(this.wait_timer);
          if(this.character.dialogs.empty &&
          this.current_bag[1] == 0 &&
          this.current_bag[2] == 0 &&
          this.current_bag[3] == 0 &&
          this.current_bag[4] == 0 ){
                this.character.current_dialog_type = "empty";
			    this.character.current_dialog_index = 0;

                this.refresh_dialog();
          } else if(JSON.stringify(this.character.expected_bag) == JSON.stringify(this.current_bag)){
            this.money += this.character.money;
            this.points += this.character.points;
            this.character.current_dialog_type = "end";
			this.character.current_dialog_index = 0;
			let money_sound = new Audio("static/money.mp3");
			money_sound.play();
            this.refresh_dialog();
          } else {
            this.points -= this.character.points / 3;
            this.character.current_dialog_type = "bad";
			this.character.current_dialog_index = 0;
			let wrong_sound = new Audio("static/wrong.mp3");
			wrong_sound.play();
            this.refresh_dialog();
		  }
          this.bag_showing = false;

      },
       next_clicked: function (){
            this.character.current_dialog_index++;
			this.refresh_dialog();
			/*if(this.character.current_dialog.text != ""){
				let speaking_sound = new Audio("static/speaking.mp3");
				speaking_sound.play();
			}*/
        },
        unlock_candy: function(id, price){
            if(price <= this.money){
                let money_sound = new Audio("static/money.mp3");
			    money_sound.play();
                this.money -= price;
                Vue.set(this.available_candies,id,true);
            }
        },
        refresh_dialog: function(){
            this.character.current_dialog = this.character.dialogs[this.character.current_dialog_type][this.character.current_dialog_index];
            if(this.character.current_dialog.action){
                this[this.character.current_dialog.action](this.character.current_dialog.action_data);
			}
            if(this.character.current_dialog.sprite){
                this.character.sprite = this.character.current_dialog.sprite;
            }

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
      overflow: hidden;
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


</style>
