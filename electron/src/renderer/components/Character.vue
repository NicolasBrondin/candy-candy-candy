<template>
    <div class="character-container" :class="{'talking': is_talking, 'start': position == 'start', 'middle': position == 'middle', 'finish': position == 'finish'}">
        <div class="character-sprite" :style="'background-image: url('+sprite+');'"></div>
        <div class="character-bubble">
            {{displayed_text}}
            <button class="btn-next" @click="next_clicked" v-show="step.button">
                {{step.button}}
            </button>
        </div>
    </div>
</template>

<script>
import path from 'path';

  export default {
      data: function(){
          return {
            text_timer: null,
            refactored_text: "",
            displayed_text: "",
            letter_index:0,
            candy_names: {
                1: ["bonbon jaune", "bonbons jaunes"],
                2: ["croco vert", "crocos verts"],
                3: ["dragée rouge", "dragées rouges"],
                4: ["bouteille de coca", "bouteilles de coca"]
            },
            speaking_sound: new Audio("static/speaking.mp3")
          };
      },
      methods: {
          refresh_text: function(val){
              if(val == true){
                  this.displayed_text = "";
                  let candies_sentence = Object.keys(this.candies).reduce(function(str, candy_key){
                      if(this.candies[candy_key] > 0){
                          if(str != "") {
                              str +=", ";
                          }
                          str += this.candies[candy_key]+ " "+ (this.candies[candy_key] == 1 ? this.candy_names[candy_key][0] : this.candy_names[candy_key][1]);
                      }
                      return str;
                  }.bind(this),"");
                  let n = candies_sentence.lastIndexOf(", ");
                  if(n>-1){
                      candies_sentence = candies_sentence.substring(0, n) + " et "+candies_sentence.substring(n+2, candies_sentence.length);
                  }
                  this.refactored_text = this.step.text.replace("%candies%", candies_sentence);
                  this.letter_index = 0;
				    this.speaking_sound.play();
                  this.text_timer = setInterval(function(){
                      this.letter_index++;
                      this.displayed_text = this.refactored_text.substr(0,this.letter_index);
                      if(this.displayed_text === this.refactored_text){
                          this.speaking_sound.pause();
                          clearInterval(this.text_timer);
                      }
                  }.bind(this),15);
              }
        }
      },
      watch: {
          is_talking: function(val){
              this.refresh_text(val);
          },
          step: function(val){
                 this.refresh_text(this.is_talking);
          }
      },
    props: ["position", "is_talking", "step", "sprite", "show_bag", "next_clicked", "candies"]
  }
</script>

<style scoped>

    @keyframes walking {
        0% { transform: rotate(-5deg)}
        50% { transform: rotate(5deg)}
        100% { transform: rotate(-5deg)}
    }

    @keyframes idle {
        0% { transform: translateY(-10px)}
        50% { transform: translateY(0px)}
        100% { transform: translateY(-10px)}
    }

    .character-container {
        position: absolute;
        bottom: 50px;
        left: calc(50% - 250px);
        height: 500px;
        width: 500px;
        transition-property: left;
        transition-timing-function: linear;
    }


    .character-container.start {
        left: calc(0% - 500px);
        transition-duration: 0s;
    }

    .character-container.middle {
        left: calc(50% - 250px);
        transition-duration: 2s;
    }

    .character-container.finish {
        left: 100%;
        transition-duration: 2s;
    }

    .character-sprite {
        position: relative;
        background-position: bottom center;
        background-size: contain;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
        animation-iteration-count: infinite;
        transform-origin: bottom center;
    }

    .character-bubble {
        z-index: 5;
        position: absolute;
        background: white;
        width: 300px;
        height: 125px;
        top: -50px;
        right: -50px;
        border-radius: 25px;
        box-sizing: border-box;
        padding: 20px;
        font-size: 20px;
        animation-iteration-count: infinite;

    }

    .character-container.talking .character-bubble {
         animation-duration: 2s;
        animation-name: idle;
    }

    .character-container.talking .character-bubble {
        display: block;
    }
    .character-container:not(.talking) .character-bubble {
        display: none;
    }

    .character-container.talking .character-sprite {
         animation-duration: 2s;
        animation-name: idle;
    }
    .character-container:not(.talking) .character-sprite {

        animation-duration: 0.5s;
        animation-name: walking;
    }

    .character-bubble::before {
        content: "";
        display: block;
        position: absolute;
        top: 120px;
        right: 230px;
        width: 30px;
        height: 30px;
        background-image: url("../assets/img/bubble-arrow.png");
        background-position: center center;
        background-size: contain;
        background-repeat: no-repeat;
    }

    .btn-next {
        position: absolute;
        top: 80px;
        right: 10px;
        padding: 10px 15px;
        outline: 0;
        border-radius: 15px;
        border: 0;
        background: #8d37ee;
        color: white;
        cursor: pointer;
        font-family: Source Sans Pro, serif;
    }
</style>
