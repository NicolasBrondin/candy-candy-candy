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
  import Popup from '../components/Popup'
  import UI from '../components/UI'
  import Character from '../components/Character'
  import Bag from '../components/Bag'
  import Candy from '../components/Candy'

  import SpriteCharacter1 from "../assets/img/character-1-idle.png"
  import SpriteCharacter1_angry from "../assets/img/character-1-angry.png"
  import SpriteCharacter1_drug from "../assets/img/character-1-drug.png"
  import SpriteCharacter1_fear from "../assets/img/character-1-fear.png"
  import SpriteCharacter2 from "../assets/img/character-2-idle.png"
  import SpriteCharacter2_angry from "../assets/img/character-2-angry.png"
  import SpriteCharacter2_drug from "../assets/img/character-2-drug.png"
  import SpriteCharacter2_sad from "../assets/img/character-2-sad.png"
  import SpriteCharacter2_angry_cementery from "../assets/img/character-2-angry-cementery.png"
  import SpriteCharacter3 from "../assets/img/character-3-idle.png"
  import SpriteCharacter3_angry from "../assets/img/character-3-angry.png"
  import SpriteCharacter3_drug from "../assets/img/character-3-drug.png"
  import SpriteCharacter4 from "../assets/img/character-4-idle.png"
  import SpriteCharacter4_drug from "../assets/img/character-4-drug.png"
  import SpriteCharacter4_angry from "../assets/img/character-4-angry.png"
  import SpriteCharacter4_very_angry from "../assets/img/character-4-very-angry.png"

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
            character: null,
            character_index: 0,
            day_index: 0,
            wait_timer : null,
            background_music: null,
            characters: {
                1: [{
                sprite:  SpriteCharacter1,
                dialogs: {
                    start: [
                        {
                            text: "Tiens, tu vends des bonbons, toi ?",
                            button: "Suivant",
                            action: "load_music",
                            action_data: "background"
                        },
                        {
                            text: "Fais goûter %candies% pour voir ?",
                            action: "show_bag",
                            sprite: SpriteCharacter1
                        }
                    ],
                    end: [
                        {
                            text: "Mais c'est vachement bon ! T'en as d'autres ?",
                            button: "Suivant",
                            sprite: SpriteCharacter1_drug
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
                            button: "Suivant",
                            sprite: SpriteCharacter3_angry
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
                            button: "Suivant",
                            sprite: SpriteCharacter2_drug
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
                            text: "Tu es en rupture de stocks ? Ce n'est pas grave, je reviendrai une autre fois !",
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
                            text: "Ah enfin ! À très bientôt !",
                            button: "Suivant",
                            sprite: SpriteCharacter2_drug
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
                            text: "Tu pourrais me donner %candies% pour la route ?",
                            action: "show_bag"
                        }
                    ],
                    end: [
                        {
                            text: "Merci à plus !",
                            button: "Suivant",
                            sprite: SpriteCharacter1_drug
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ],
                    bad: [
                        {
                            text: "Heureusement que je délivre mieux les conseils que toi les bonbons ! ",
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
                            button: "Suivant",
                            sprite: SpriteCharacter3_drug
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
                            button: "Suivant",
                            sprite: SpriteCharacter3_drug
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
                money: 11,
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
                            button: "Suivant",
                            sprite: SpriteCharacter2_drug
                        },
                        {
                            text: "...mais ça me fait plus d'effet que mes satanés médicaments !",
                            button: "Suivant"
                        },
                        {
                            text: "Tu seras gentil de me donner %candies%, je faiblis.",
                            action: "show_bag",
                            sprite: SpriteCharacter2_drug
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
                            text: "Ne joue pas avec ma santé.",
                            button: "Suivant",
                            sprite: SpriteCharacter2_angry,
                            state: "angry"
                        },
                        {
                            text: "",
                            action: "reload_bag"
                        }
					],
                    empty: [
                        {
                            text: "Mais enfin c'est grotesque ! Vilain petit personnage !",
                            button: "Suivant",
                            sprite: SpriteCharacter2_angry,
                            state: "angry"
                        },
                        {
                            text: "Pour la peine j'irai me fournir ailleurs !",
                            button: "Suivant",
                            state: "angry"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
					]
                },
                money: 12,
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
                            text: "Pour fêter ça j'adorerais %candies%.",
                            action: "show_bag",
                            sprite: SpriteCharacter3
                        }
                    ],
                    end: [
                        {
                            text: "Mmmh j'en deviendrais presque accroc...",
                            button: "Suivant",
                            sprite: SpriteCharacter3_drug
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ],
                    bad: [
                        {
                            text: "Si c'est une blague, je ne la trouve pas drôle...",
                            button: "Suivant",
                            sprite: SpriteCharacter3_angry
                        },
                        {
                            text: "",
                            action: "reload_bag"
                        }
					],
                    empty: [
                        {
                            text: "Si c'est une blague, je ne la trouve pas drôle...",
                            button: "Suivant",
                            sprite: SpriteCharacter3_angry
                        },
                        {
                            text: "",
                            action: "reload_bag"
                        }
					]
                },
                money: 15,
                points: 20,
                position: "start",
                is_talking: false,
                current_dialog: {},
                current_dialog_index: 0,
                current_dialog_type: "start"
            },
            {
                sprite:  SpriteCharacter4,
                dialogs: {
                    start: [
                        {
                            text: "Hum salut. Il parait que...",
                            button: "Suivant"
                        },
                        {
                            text: "...tu vends, tu sais, des petits...",
                            button: "Suivant"
                        },
                        {
                            text: "...\"bonbons\", enfin tu sais, tu vois de quoi je parle.",
                            button: "Suivant"
                        },
                        {
                            text: "Il me faudrait %candies%, mais dépêche-toi.",
                            action: "show_bag"
                        }
                    ],
                    end: [
                        {
                            text: "Merci, et fais quand même gaffe, il y a des gens chelous dans le coin...",
                            sprite: SpriteCharacter4_drug,
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ],
                    bad: [
                        {
                            text: "T'es sérieux !? T'aimes pas la vie ?",
                            sprite: SpriteCharacter4_angry,
                            state: "angry",
                            button: "Suivant"
                        },
                        {
                            text: "T'as de la chance que je puisse pas rester.",
                            state: "angry",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
					],
                    wait: [
                        {
                            text: "Merde ils arrivent !",
                            sprite: SpriteCharacter4_angry,
                            state: "angry",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
					]
                },
                money: 30,
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
                            text: "Psst, j'ai décidé de monter un business de revente de sucre, t'en es ?",
                            button: "Suivant",
                            sprite: SpriteCharacter1_drug
                        },
                        {
                            text: "Tu veux pas t'associer ?",
                            button: "Suivant"
                        },
                        {
                            text: "Sérieux penses-y !",
                            button: "Suivant"
                        },
                        {
                            text: "Je fournis, tu coupes et tu vends, ce serait incroyable.",
                            button: "Suivant"
                        },
                        {
                            text: "Hugo qui est en 5ème pense qu'on peut se faire...",
                            button: "Suivant"
                        },
                        {
                            text: "...pas mal d'argent de poche !",
                            button: "Suivant"
                        },
                        {
                            text: "Okay, tant pis, je le ferai tout seul !",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ]
                },
                money: 0,
                points: 20,
                position: "start",
                is_talking: false,
                current_dialog: {},
                current_dialog_index: 0,
                current_dialog_type: "start"
            }
            ],
            5: [
                {
                sprite:  SpriteCharacter1,
                dialogs: {
                    start: [
                        {
                            text: "Mec, je suis mal...",
                            button: "Suivant",
                            action: "load_music",
                            action_data: "background-sad",
                            sprite: SpriteCharacter1_fear,
                            state: "fear"
                        },
                        {
                            text: "Je crois que je me suis associé avec les mauvaises personnes...",
                            button: "Suivant",
                            state: "fear"
                        },
                        {
                            text: "Ils m'ont tout pris !!",
                            button: "Suivant",
                            state: "fear"
                        },
                        {
                            text: "J'ai besoin de ton aide, tu peux pas me filer quelques bonbons pour me refaire ?",
                            button: "Suivant",
                            state: "fear"
                        },
                        {
                            text: "Juste %candies% ça devrait suffire !",
                            action: "show_bag",
                            state: "fear"
                        }
                    ],
                    bad: [
                        {
                            text: "Bon je vais essayer de faire en sorte de survivre avec ça...",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ],
                    end: [
                        {
                            text: "Merci, toi t'es un vrai pote !",
                            button: "Suivant",
                            sprite: SpriteCharacter1
                        },
                        {
                            text: "Je vais me refaire et je vais leur montrer qui c'est le patron !",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ]
                },
                money: 0,
                points: 20,
                position: "start",
                is_talking: false,
                current_dialog: {},
                current_dialog_index: 0,
                current_dialog_type: "start"
            }],
            6:[
            {
                sprite:  SpriteCharacter4,
                dialogs: {
                    start: [
                        {
                            text: "Hey... Salut.. Je voulais te dire...",
                            button: "Suivant"
                        },
                        {
                            text: "Désolé pour hier, j'étais un peu à cran tu vois.",
                            button: "Suivant"
                        },
                        {
                            text: "Ça devient vraiment n'importe quoi ici...",
                            button: "Suivant"
                        },
                        {
                            text: "...ce matin y'a même un gamin qui s'est fait buter...",
                            button: "Suivant"
                        },
                        {
                            text: "... parce qu'il revendait du sucre dans la rue, DU SUCRE BORDEL !!!",
                            button: "Suivant"
                        },
                        {
                            text: "Il devait avoir ton âge à peu près... C'est trop triste.",
                            button: "Suivant"
                        },
                        {
                            text: "Bon j'y vais, je veux pas rester dans le coin. Salut.",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ],
                    end: [

                    ],
                    bad: [

					],
                    empty: [

					]
                },
                money: 0,
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
                            text: "Écoute petit, je sais que cela fait longtemps que je ne suis pas venue...",
                            button: "Suivant",
                            sprite: SpriteCharacter2_sad
                        },
                        {
                            text: "J'ai voulu essayer d'acheter mes bonbons dans une autre boutique mais...",
                            button: "Suivant"
                        },
                        {
                            text: "...je n'en ai trouvé aucun qui soit aussi bon.",
                            button: "Suivant"
                        },
                        {
                            text: "Et aujourd'hui j'ai besoin d'un remontant parce que...",
                            button: "Suivant"
                        },
                        {
                            text: "...mon mari est mort il y a trois jours, l'enterrement est aujourd'hui.",
                            button: "Suivant"
                        },
                        {
                            text: "Je devrais y être en ce moment, mais je ne peux pas surmonter ça seule.",
                            button: "Suivant"
                        },
                        {
                            text: "Donne moi vite %candies% sinon je vais le manquer !",
                            action: "show_bag"
                        }
                    ],
                    end: [
                        {
                            text: "Merci...",
                            button: "Suivant",
                            sprite: SpriteCharacter2_sad
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ],
                    bad: [
                        {
                            text: "...",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
					],
                    empty: [
                        {
                            text: "JE NE PARTIRAI PAS SANS CES BONBONS !!!!!",
                            button: "Suivant",
                            sprite: SpriteCharacter2_angry_cementery,
                            state: "angry"
                        },
                        {
                            text: "",
                            action: "reload_bag"
                        }
					]
                },
                money: 50,
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
                            text: "...",
                            button: "Suivant",
                            sprite: SpriteCharacter2_sad
                        },
                        {
                            text: "J'en veux encore...",
                            button: "Suivant"
                        },
                        {
                            text: "Donne-moi %candies%.",
                            action: "show_bag"
                        }
                    ],
                    end: [
                        {
                            text: "Merci...",
                            button: "Suivant",
                            sprite: SpriteCharacter2_sad
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ],
                    bad: [
                        {
                            text: "...",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
					],
                    empty: [
                        {
                            text: "JE NE PARTIRAI PAS SANS CES BONBONS !!!!!",
                            button: "Suivant",
                            sprite: SpriteCharacter2_angry_cementery,
                            state: "angry"
                        },
                        {
                            text: "",
                            action: "reload_bag"
                        }
					]
                },
                money: 75,
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
                            text: "À ton avis combien faut-il manger de bonbons pour en mourir ?",
                            button: "Oui",
                            sprite: SpriteCharacter2_sad
                        },
                        {
                            text: "Ah oui ? %candies%, alors donne-moi ça que j'en finisse.",
                            action: "show_bag"
                        }
                    ],
                    end: [
                        {
                            text: "Adieu...",
                            button: "Suivant",
                            sprite: SpriteCharacter2_sad
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ],
                    bad: [
                        {
                            text: "Adieu...",
                            button: "Suivant",
                            sprite: SpriteCharacter2_sad
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
					],
                    empty: [
                        {
                            text: "JE NE PARTIRAI PAS SANS CES BONBONS !!!!!",
                            button: "Suivant",
                            sprite: SpriteCharacter2_angry_cementery,
                            state: "angry"
                        },
                        {
                            text: "",
                            action: "reload_bag"
                        }
					]
                },
                money: 100,
                points: 20,
                position: "start",
                is_talking: false,
                current_dialog: {},
                current_dialog_index: 0,
                current_dialog_type: "start"
            }
            ],
            7: [
                {
                sprite:  SpriteCharacter4,
                dialogs: {
                    start: [
                        {
                            text: "Petit. Je vais te poser une question. Et UNE SEULE.",
                            sprite: SpriteCharacter4_angry,
                            state: "angry",
                            button: "Suivant"
                        },
                        {
                            text: "Est-ce que c'est TOI qui vendais toutes ces MERDES à ma femme ?",
                            state: "angry",
                            button: "Suivant"
                        },
                        {
                            text: "Ne fais pas comme si tu ne la CONNAISSAIS PAS !",
                            state: "angry",
                            button: "Suivant"
                        },
                        {
                            text: "Elle a les cheveux très LONGS, BRUNS, et adore les ENFANTS...",
                            state: "angry",
                            button: "Suivant"
                        },
                        {
                            text: "TON SILENCE EN DIT LONG !",
                            sprite: SpriteCharacter4_very_angry,
                            state: "angry",
                            button: "Suivant"
                        },
                        {
                            text: "Et bien sache qu'à cause de TOI, et de tes bonbons IGNOBLES...",
                            state: "angry",
                            button: "Suivant"
                        },
                        {
                            text: "Ma femme a développé du diabète de type 2 et vient de perdre notre bébé...",
                            state: "angry",
                            button: "Suivant"
                        },
                        {
                            text: "NOTRE BÉBÉ !",
                            state: "angry",
                            button: "Suivant"
                        },
                        {
                            text: "NOTRE VIE A ÉTÉ GÂCHÉE PAR TA FAUTE !!",
                            state: "angry",
                            button: "Suivant"
                        },
                        {
                            text: "J'ESPÈRE QUE ÇA TE HANTERA TOUTE... TA.. VIE.",
                            state: "angry",
                            button: "Suivant"
                        },
                        {
                            text: "Tu es un monstre.",
                            state: "angry",
                            button: "Suivant"
                        },
                        {
                            text: "",
                            action: "finish_character"
                        }
                    ],
                    end: [

                    ],
                    bad: [

					],
                    empty: [

					]
                },
                money: 0,
                points: 20,
                position: "start",
                is_talking: false,
                current_dialog: {},
                current_dialog_index: 0,
                current_dialog_type: "start"
            }],
            8: [
                {
                sprite:  "",
                dialogs: {
                    start: [
                        {
                            text: "...",
                            button: "Suivant"
                        },
                        {
                            text: "Tiens, il n'y a plus personne.",
                            button: "Suivant"
                        },
                        {
                            text: "Joli score, tu as réussi à amasser la modique somme de %money%$...",
                            button: "Suivant"
                        },
                        {
                            text: "...et tu as seulement ruiné la vie de 4 personnes...",
                            button: "Suivant"
                        },
                        {
                            text: "Bravo."
                        }
                    ],
                    end: [

                    ],
                    bad: [

					],
                    empty: [

					]
                },
                money: 0,
                points: 20,
                position: "start",
                is_talking: false,
                current_dialog: {},
                current_dialog_index: 0,
                current_dialog_type: "start"
            }
            ]}
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
