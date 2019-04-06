<template>
    <div>
		<audio autoplay>
			<source src="static/background.mp3" type="audio/mpeg">
		</audio>
        <Popup></Popup>
        <UI :money="money" :bar_value="points" bar_version="classic"></UI>
        <Character v-if="character" :next_clicked="next_clicked" :position="character.position" :step="character.current_dialog" :is_talking="character.is_talking" :show_bag="show_bag" :sprite="character.sprite"></Character>
        <Candy type="1" :is_active="game_step == 'candy'" :on_clicked="candy_clicked"></Candy>
        <Candy type="2" :is_active="game_step == 'candy'" :on_clicked="candy_clicked"></Candy>
        <Candy type="3" :is_active="game_step == 'candy'" :on_clicked="candy_clicked"></Candy>
        <div class="stand"></div>
        <Bag :is_showing="bag_showing" :on_clicked="bag_clicked"></Bag>
    </div>
</template>

<script>
  import Popup from '../components/Popup'
  import UI from '../components/UI'
  import Character from '../components/Character'
  import Bag from '../components/Bag'
  import Candy from '../components/Candy'

  import SpriteCharacter1 from "../assets/img/character-1.png"
  import SpriteCharacter2 from "../assets/img/character-2.png"

  export default {
    name: 'landing-page',
    components: { UI, Character, Candy, Bag , Popup},
    data: function(){
        return {
            bag_showing : false,
            money: 0,
            points: 0,
            game_step: "walking",
            characters: [{
                sprite:  SpriteCharacter1,
                dialogs: {
                    start: [
                        {
                            text: "Salut, je m'appelle Nick, Nick Tahmer !",
                            button: "Suivant"
                        },
                        {
                            text: "Je veux DEUX bonbons rouges, et vite.",
                            action: "show_bag"
                        }
                    ],
                    end: [
                        {
                            text: "Efficace, merci !",
                            button: "A bientôt"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ],
                    bad: [
                        {
                            text: "J'ai pas commandé ça, voleur !!",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
					]
                },
                money: 10,
                points: 20,
                expected_bag: {1:2,2:0,3:0},
                current_bag: {1:0,2:0,3:0},
                position: "start",
                is_talking: false,
                current_dialog: {},
                current_dialog_index: 0,
                current_dialog_type: "start"
            },
            {
                sprite:  SpriteCharacter2,
                dialogs: {
                    start: [
                        {
                            text: "Mmmhmhmm mhmhm bonjour",
                            button: "Suivant"
                        },
                        {
                            text: "Je veux mhmmh bonbons oranges",
                            action: "show_bag"
                        }
                    ],
                    end: [
                        {
                            text: "Hmhmmh super, merci !",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ],
                    bad: [
                        {
                            text: "Hmhmhm sale fils de mhhmhm !",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
					],
					wait: [
						{
							text: "J'en ai marre d'attendre, je me casse !"
						}
					]
                },
                money: 10,
                points: 20,
                expected_bag: {1:0,2:1,3:0},
                current_bag: {1:0,2:0,3:0},
                position: "start",
                is_talking: false,
                current_dialog: {},
                current_dialog_index: 0,
                current_dialog_type: "start"
            }],
            character: null,
			character_index: 0,
			wait_timer : null
        };
    },
    mounted: function(){
        setTimeout(function(){
            this.character = this.characters[0];
            this.refresh_dialog();
            setTimeout(function(){this.points = 10}.bind(this),1000);
            this.load_character();
        }.bind(this), 2000);
    },
    methods: {
        load_character: function(){
            this.character.is_talking = false;
			this.character = this.characters[this.character_index];
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
				if(this.character.current_dialog.text != ""){
					let speaking_sound = new Audio("static/speaking.mp3");
					speaking_sound.play();
				}
			}.bind(this), 2500);
        },
      show_bag: function(){
          	this.bag_showing = true;
			  this.game_step = "candy";
			  this.wait_timer = setTimeout(function(){
				  if(this.character.dialogs.wait){
					  this.game_step = "dialog";
					  this.character.current_dialog_type = "wait";
					  this.character.current_dialog_index = 0;
					  this.refresh_dialog();
						if(this.character.current_dialog.text != ""){
							let speaking_sound = new Audio("static/speaking.mp3");
							speaking_sound.play();
						}
						this.bag_showing = false;
						setTimeout(function(){
							this.finish_character();
						}.bind(this),2000);
				  }
			  }.bind(this), 10000);
      },
      candy_clicked: function(type){
		  	let candy_sound = new Audio("static/candy.mp3");
			candy_sound.play();
          	this.character.current_bag[type]++;
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
                this.load_character();
          	}.bind(this),2000)
      },
      bag_clicked: function(){
		  this.game_step = "dialog";
		  clearTimeout(this.wait_timer);
		  console.log(JSON.stringify(this.character.expected_bag));
		  console.log(JSON.stringify(this.character.current_bag));
          if(JSON.stringify(this.character.expected_bag) == JSON.stringify(this.character.current_bag)){
            this.money += this.character.money;
            this.points += this.character.points;
            this.character.current_dialog_type = "end";
			this.character.current_dialog_index = 0;
			let money_sound = new Audio("static/money.mp3");
			money_sound.play();
            this.refresh_dialog();
          } else {
            this.points += this.character.points;
            this.character.current_dialog_type = "bad";
			this.character.current_dialog_index = 0;
			let wrong_sound = new Audio("static/wrong.mp3");
			wrong_sound.play();
            this.refresh_dialog();
		  }
		  if(this.character.current_dialog.text != ""){
					let speaking_sound = new Audio("static/speaking.mp3");
					speaking_sound.play();
				}
          this.bag_showing = false;

      },
       next_clicked: function (){
            this.character.current_dialog_index++;
			this.refresh_dialog();
			if(this.character.current_dialog.text != ""){
				let speaking_sound = new Audio("static/speaking.mp3");
				speaking_sound.play();
			}
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
