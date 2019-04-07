<template>
    <div>
		<audio autoplay loop>
			<source src="static/background.mp3" type="audio/mpeg">
		</audio>
        <Popup :day="day_index" :money="money"></Popup>
        <UI :money="money" :bar_value="points" bar_version="classic"></UI>
        <Character v-if="character" :candies="character.expected_bag" :next_clicked="next_clicked" :position="character.position" :step="character.current_dialog" :is_talking="character.is_talking" :show_bag="show_bag" :sprite="character.sprite"></Character>
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
  import Popup from '../components/Popup'
  import UI from '../components/UI'
  import Character from '../components/Character'
  import Bag from '../components/Bag'
  import Candy from '../components/Candy'

  import SpriteCharacter1 from "../assets/img/character-1.png"
  import SpriteCharacter2 from "../assets/img/character-2.png"
  import SpriteCharacter3 from "../assets/img/character-3.png"

  export default {
    name: 'landing-page',
    components: { UI, Character, Candy, Bag , Popup},
    data: function(){
        return {
            tuto: true,
            bag_showing : false,
            money: 0,
            points: 0,
            game_step: "walking",
            available_candies: {1:true},
            characters: {
                1: [{
                sprite:  SpriteCharacter1,
                dialogs: {
                    start: [
                        {
                            text: "Tiens, tu fais des bonbons, toi ?",
                            button: "Suivant"
                        },
                        {
                            text: "Fais goûter %candies% pour voir ?",
                            action: "show_bag"
                        }
                    ],
                    end: [
                        {
                            text: "Hmmm, mais c'est vachement bon ! T'en as d'autres ?",
                            button: "Suivant"
                        },
                        {
                            text: "Continue, tu vas faire fortune mec !",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ],
                    bad: [
                        {
                            text: "Je voulais pas ça !",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "reload_bag"
                        }
					],
                    waiting: [
                        {
                            text: "Allez steuplait !",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "reload_bag"
                        }
					],
                    empty: [
                        {
                            text: "Allez steuplait !",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "reload_bag"
                        }
					]
                },
                money: 10,
                points: 20,
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
                            text: "Oh, quel charmant petit stand ! Qu'est-ce que tu vends mon petit ?",
                            button: "Suivant"
                        },
                        {
                            text: "Oh, des bonbons ! Tu les fais toi-même ?",
                            button: "Suivant"
                        },
                        {
                            text: "C'est super ! Et bien ma foi je vais me laisser tenter !",
                            button: "Suivant"
                        },
                        {
                            text: "Je vais prendre %candies% s'il-te-plaît.",
                            action: "show_bag"
                        }
                    ],
                    end: [
                        {
                            text: "Merci beaucoup mon petit, ça a égayé ma journée !",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ],
                    bad: [
                        {
                            text: "Oh, mais ce n'est pas ce que j'avais demandé !",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
					],
                    empty: [
                        {
                            text: "Oh, tu es en rupture de stocks ? Ce n'est pas grave, je retenterai ma chance une autre fois !",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ],
					wait: [
						{
							text: "Eh bien ?",
                            button: "Suivant"
						},
                        {
                            text: "",
                            action: "reload_bag"
                        }
					]
                },
                money: 10,
                points: 20,
                position: "start",
                is_talking: false,
                current_dialog: {},
                current_dialog_index: 0,
                current_dialog_type: "start"
            }],
            2: [{
                sprite:  SpriteCharacter2,
                dialogs: {
                    start: [

                        {
                            text: "Bonjour mon garçon ! Comment te portes-tu ?",
                            button: "Suivant"
                        },
                        {
                            text: "Je n'arrive pas à m'enlever ces confiseries de la tête ! Je vais en reprendre !",
                            button: "Suivant"
                        },
                        {
                            text: "%candies% ça devrait suffire.",
                            action: "show_bag"
                        }
                    ],
                    end: [
                        {
                            text: "Ah enfin ! A très bientôt !",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ],
                    bad: [
                        {
                            text: "Ce n'était pas ma commande !",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "reload_bag"
                        }
					],
					wait: [
						{
							text: "Que se passe-t-il ?",
                            button: "Suivant"
						},
                        {
                            text: "",
                            action: "reload_bag"
                        }
					],
					empty: [
						{
							text: "Tu n'en as plus ? Tu es certain ? ",
                            button: "Suivant"
						},
                        {
                            text: "",
                            action: "reload_bag"
                        }
					]
                },
                money: 10,
                points: 20,
                position: "start",
                is_talking: false,
                current_dialog: {},
                current_dialog_index: 0,
                current_dialog_type: "start"
            },
            {
                sprite:  SpriteCharacter1,
                dialogs: {
                    start: [
                        {
                            text: "Salut, comment ça va ? T'as l'air de te faire plein d'argent !",
                            button: "Suivant"
                        },
                        {
                            text: "Par contre avoir un seul genre de bonbon c'est un peu nul. ",
                            button: "Suivant"
                        },
                        {
                            text: "Tu devrais investir dans la fabrication de nouveaux bonbons...",
                            action: "finish_tuto",
                            button: "Suivant"
                        },
                        {
                            text: "...maintenant que t'as assez d'argent pour le faire !",
                            button: "Suivant"
                        },
                        {
                            text: "J'ai hâte de goûter ça!",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ],
                    end: [
                        {
                            text: "Hmmm, mais c'est vachement bon ! T'en as d'autres ?",
                            button: "Suivant"
                        },
                        {
                            text: "Continue, tu vas faire fortune mec !",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ],
                    bad: [
                        {
                            text: "Allez steuplait !",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "reload_bag"
                        }
					]
                },
                money: 10,
                points: 20,
                position: "start",
                is_talking: false,
                current_dialog: {},
                current_dialog_index: 0,
                current_dialog_type: "start"
            },
            {
                sprite:  SpriteCharacter3,
                dialogs: {
                    start: [
                        {
                            text: "Oh que tu es mignon, j'aime tellement les enfants !",
                            button: "Suivant"
                        },
                        {
                            text: "Et si je te prenais %candies% pour t'encourager ?",
                            action: "show_bag"
                        }
                    ],
                    end: [
                        {
                            text: "Merci mon petit, j'aimerais que mes futurs enfants soient aussi gentils que toi !",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ],
                    bad: [
                        {
                            text: "Je n'avais pas commandé ça mais ce n'est pas grave, tu es trop mignon !",
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
                position: "start",
                is_talking: false,
                current_dialog: {},
                current_dialog_index: 0,
                current_dialog_type: "start"
            }],
            3: [{
                sprite:  SpriteCharacter3,
                dialogs: {
                    start: [

                        {
                            text: "Bonjour mon garçon ! Contente que tu sois encore là !",
                            button: "Suivant"
                        },
                        {
                            text: "On a dégusté tes sucreries avec mon mari hier soir, elles sont à tomber.",
                            button: "Suivant"
                        },
                        {
                            text: "Si tu me donnais %candies%, tu serais un amour.",
                            action: "show_bag"
                        }
                    ],
                    end: [
                        {
                            text: "C'est mon mari qui va être content !",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ],
                    bad: [
                        {
                            text: "Pas grave, on les mangera quand même !",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
					],
					wait: [
						{
							text: "Tout va bien ?",
                            button: "Suivant"
						},
                        {
                            text: "",
                            action: "reload_bag"
                        }
					],
					empty: [
						{
							text: "Oh comme c'est dommage ",
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
                            text: "Salut gamin, je ne sais pas ce que tu mets dans tes bonbons...",
                            button: "Suivant"
                        },
                        {
                            text: "...mais ça me fait plus d'effet que mes satanés médicaments !",
                            button: "Suivant"
                        },
                        {
                            text: "Tu seras gentil de me donner %candies%, je faiblis",
                            action: "show_bag"
                        }
                    ],
                    end: [
                        {
                            text: "Mmmerci, et surtout tu n'en parles pas à mon médecin...",
                            button: "Suivant"
                        },
                        {
                            text: "Je te fais confiance !",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ],
                    bad: [
                        {
                            text: "Ne joue pas avec ma santé",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "reload_bag"
                        }
					],
                    empty: [
                        {
                            text: "Mais enfin c'est grotesque ! Vilain petit personnage !",
                            button: "Suivant"
                        },
                        {
                            text: "Pour la peine j'irai me fournir ailleurs !",
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
                position: "start",
                is_talking: false,
                current_dialog: {},
                current_dialog_index: 0,
                current_dialog_type: "start"
            }],
            4:[
            {
                sprite:  SpriteCharacter3,
                dialogs: {
                    start: [
                        {
                            text: "Ça me fait plaisir de te voir...",
                            button: "Suivant"
                        },
                        {
                            text: "Je suis très fatiguée en ce moment...",
                            button: "Suivant"
                        },
                        {
                            text: "Non ne t'inquiète pas, ce n'est pas à cause de tes merveilleux bonbons.",
                            button: "Suivant"
                        },
                        {
                            text: "Mais plutôt parce que je pense que j'attends un bébé.",
                            button: "Suivant"
                        },
                        {
                            text: "C'est tellement féérique...",
                            button: "Suivant"
                        },
                        {
                            text: "Pour fêter ça j'adorerais %candies%",
                            action: "show_bag"
                        }
                    ],
                    end: [
                        {
                            text: "Mmmh j'en deviendrais presque accrocs...",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ],
                    bad: [
                        {
                            text: "Si c'est une blague, je ne la trouve pas drôle...",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "reload_bag"
                        }
					],
                    empty: [
                        {
                            text: "Si c'est une blague, je ne la trouve pas drôle...",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "reload_bag"
                        }
					]
                },
                money: 10,
                points: 20,
                position: "start",
                is_talking: false,
                current_dialog: {},
                current_dialog_index: 0,
                current_dialog_type: "start"
            }]},
            character: null,
            character_index: 0,
            day_index: 0,
			wait_timer : null
        };
    },
    mounted: function(){
        this.day_index = 1;
        setTimeout(function(){
            setTimeout(function(){this.points = 10}.bind(this),1000);
            this.load_character();
        }.bind(this), 2000);
    },
    methods: {
        finish_tuto: function(){
            this.tuto = false;
        },
        generate_bag: function(){
            let bag = {};
            bag[1] = Math.floor((Math.random()*2*this.day_index)+1);
            if(this.available_candies[2]){
                bag[2] = Math.floor((Math.random()*2*this.day_index)+1);
            } else {
                bag[2] = 0;
            }
            if(this.available_candies[3]){
            bag[3] = Math.floor((Math.random()*2*this.day_index)+1);
            } else {
                bag[3] = 0;
            }
            if(this.available_candies[4]){
            bag[4] = Math.floor((Math.random()*2*this.day_index)+1);
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
            if(price < this.money){
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
