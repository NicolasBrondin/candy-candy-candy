<template>
    <div class="character-container" :class="{'talking': is_talking, 'start': position == 'start', 'middle': position == 'middle', 'finish': position == 'finish'}">
        <div class="character-sprite">

        </div>
        <div class="character-bubble">
            {{steps[current_step].text}}
            <button class="btn-next" @click="next()" v-show="current_step == 0">Next</button>
        </div>
    </div>
</template>

<script>
  export default {
    data () {
        return {
            position: "start",
            is_talking: true,
            current_step: 0,
            steps: [
                {text: "Salut, je m'appelle Nick, Nick Tahmer !"},
                {text: "Je veux deux bonbons rouges"}
            ]

        }
    },
    mounted: function(){
        setTimeout(function(){ this.position = "start";this.is_talking = false;}.bind(this), 0);
        setTimeout(function(){ this.position = "middle";}.bind(this), 2000);
        setTimeout(function(){ this.is_talking = true;}.bind(this), 7000);

    },
    methods: {
        next: function (){
            if(this.current_step == 0){
                this.current_step++;
                this.show_bag(true);
            } else {
                this.position = "finish";
                this.is_talking = false;
                this.current_step = 0;
                this.show_bag(false);
            }

        }
    },
    props: ["show_bag"]
  }
</script>

<style scoped>

    @keyframes walking {
        0% { transform: rotate(-5deg)}
        50% { transform: rotate(5deg)}
        100% { transform: rotate(-5deg)}
    }

    .character-container {
        position: absolute;
        bottom: 30px;
        left: calc(50% - 200px);
        height: 400px;
        width: 400px;
        transition-property: left;
        transition-timing-function: linear;
    }


    .character-container.start {
        left: calc(0% - 400px);

        transition-duration: 0s;
    }

    .character-container.middle {
        left: calc(50% - 200px);

        transition-duration: 5s;
    }

    .character-container.finish {
        left: 100%;

        transition-duration: 5s;
    }

    .character-sprite {
        position: relative;
        background-image: url("../assets/img/character.png");
        background-position: bottom center;
        background-size: contain;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
        animation-duration: 0.5s;
        animation-iteration-count: infinite;
        transform-origin: bottom center;
    }

    .character-bubble {
        position: absolute;
        background: white;
        width: 300px;
        height: 125px;
        top: -100px;
        right: -200px;
        border-radius: 25px;
        box-sizing: border-box;
        padding: 20px;
        font-size: 20px;
    }

    .character-container.talking .character-bubble {
        display: block;
    }
    .character-container:not(.talking) .character-bubble {
        display: none;
    }

    .character-container.talking .character-sprite {

        animation-name: none;
    }
    .character-container:not(.talking) .character-sprite {

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
        padding: 5px 10px;
        outline: 0;
        border-radius: 5px;
        border: 0;
        background: #8d37ee;
        color: white;
    }
</style>
