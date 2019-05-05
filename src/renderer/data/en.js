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
import SpriteCharacter5 from "../assets/img/character-5-idle.png"

export default {
    1: [{
    sprite:  SpriteCharacter1,
    dialogs: {
        start: [
            {
                text: "Hey, are you selling candies?",
                button: "Next",
                action: "load_music",
                action_data: "background"
            },
            {
                text: "Gimme %candies% to taste?",
                action: "show_bag",
                sprite: SpriteCharacter1
            }
        ],
        end: [
            {
                text: "It's damn good! Do you have more?",
                button: "Next",
                sprite: SpriteCharacter1_drug
            },
            {
                text: "Keep up, you're gonna be rich dude!",
                button: "Next"
            },
            {
                text: "",
                action: "finish_character"
            }
        ],
        bad: [
            {
                text: "Je voulais pas ça !",
                button: "Next",
                sprite: SpriteCharacter1_angry
            },
            {
                text: "",
                action: "reload_bag"
            }
        ],
        waiting: [
            {
                text: "C'mon pleeaase!",
                button: "Next"
            },
            {
                text: "",
                action: "reload_bag"
            }
        ],
        empty: [
            {
                text: "C'mon pleeaase!",
                button: "Next"
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
                text: "Oh, what a charming stall! What do you sell sweetie?",
                button: "Next"
            },
            {
                text: "Sweets ! Are they homemade?",
                button: "Next"
            },
            {
                text: "That is great! I think I could let myself be tempted!",
                button: "Next"
            },
            {
                text: "I will have %candies% please.",
                action: "show_bag"
            }
        ],
        end: [
            {
                text: "Thank you very much kid, it brightened my day !",
                button: "Next",
                sprite: SpriteCharacter2_drug
            },
            {
                text: "",
                action: "finish_character"
            }
        ],
        bad: [
            {
                text: "Oh, but that is not what I asked!",
                button: "Next"
            },
            {
                text: "",
                action: "finish_character"
            }
        ],
        empty: [
            {
                text: "Are you out of stock? No problem, I will come back another time!",
                button: "Next"
            },
            {
                text: "",
                action: "finish_character"
            }
        ],
        wait: [
            {
                text: "Well?",
                button: "Next"
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
    sprite:  SpriteCharacter5,
    dialogs: {
        start: [
            {
                text: "Hello sweet boy! So, are you selling candies?",
                button: "Next"
            },
            {
                text: "Do your friends like them? I would love to taste them.",
                button: "Next"
            },
            {
                text: "Give me %candies%, it looks delicious...",
                action: "show_bag"
            }
        ],
        end: [
            {
                text: "You are a good boy, I hope we will meet again.",
                button: "Next"
            },
            {
                text: "",
                action: "finish_character"
            }
        ],
        bad: [
            {
                text: "Oh it's okay, I'll find another way!",
                button: "Next"
            },
            {
                text: "",
                action: "finish_character"
            }
        ],
        empty: [
            {
                text: "Oh you don't have candies anymore, too bad...",
                button: "Next"
            },
            {
                text: "It's nothing, I'll come back another time!",
                button: "Next"
            },
            {
                text: "",
                action: "finish_character"
            }
        ],
        wait: [
            {
                text: "Yeah... Take your time...",
                button: "Next"
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
                text: "Hello my little boy, how are you?",
                button: "Next"
            },
            {
                text: "I can't get your candies out of my mind! I will have some more!",
                button: "Next"
            },
            {
                text: "%candies% should be enough.",
                action: "show_bag"
            }
        ],
        end: [
            {
                text: "Mmh finally! See you soon!",
                button: "Next",
                sprite: SpriteCharacter2_drug
            },
            {
                text: "",
                action: "finish_character"
            }
        ],
        bad: [
            {
                text: "This is not what I ordered!",
                button: "Next"
            },
            {
                text: "",
                action: "reload_bag"
            }
        ],
        wait: [
            {
                text: "What's happening?",
                button: "Next"
            },
            {
                text: "",
                action: "reload_bag"
            }
        ],
        empty: [
            {
                text: "You don't have any more ? Are you sure ? ",
                button: "Next"
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
                text: "Hey, wassup ? Looks like you're making a lot of money!",
                button: "Next"
            },
            {
                text: "But having only one candy type it kind of sucks. ",
                button: "Next"
            },
            {
                text: "You should invest in the making of new candies...",
                action: "finish_tuto",
                button: "Next"
            },
            {
                text: "...now that you have enough money to do so!",
                button: "Next"
            },
            {
                text: "Can you give me %candies% that I could eat on the road?",
                action: "show_bag"
            }
        ],
        end: [
            {
                text: "Thanks, see you later!",
                button: "Next",
                sprite: SpriteCharacter1_drug
            },
            {
                text: "",
                action: "finish_character"
            }
        ],
        bad: [
            {
                text: "Thanksfully I deliver advices better than you deliver candies! ",
                button: "Next"
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
                text: "Oh you are so cute, I love kids so much!",
                button: "Next"
            },
            {
                text: "Maybe I could buy %candies% to encourage you?",
                action: "show_bag"
            }
        ],
        end: [
            {
                text: "Thank you sweetheart, I would love if my future kids could be as nice as you are!",
                button: "Next",
                sprite: SpriteCharacter3_drug
            },
            {
                text: "",
                action: "finish_character"
            }
        ],
        bad: [
            {
                text: "I didn't order that but it's okay, you are too cute!",
                button: "Next"
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
                text: "Hello my boy ! I'm happy you're still there!",
                button: "Next"
            },
            {
                text: "We tasted your sweets with my husband last night, we fell in love with it.",
                button: "Next"
            },
            {
                text: "If you could give me %candies%, you would be a love.",
                action: "show_bag"
            }
        ],
        end: [
            {
                text: "My husband will be very happy!",
                button: "Next",
                sprite: SpriteCharacter3_drug
            },
            {
                text: "",
                action: "finish_character"
            }
        ],
        bad: [
            {
                text: "We will eat them anyway!",
                button: "Next"
            },
            {
                text: "",
                action: "finish_character"
            }
        ],
        wait: [
            {
                text: "Is everything alright?",
                button: "Next"
            },
            {
                text: "",
                action: "reload_bag"
            }
        ],
        empty: [
            {
                text: "Ow, too bad.",
                button: "Next"
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
                text: "Hey kiddo, I don't know what you put into your candies...",
                button: "Next",
                sprite: SpriteCharacter2_drug
            },
            {
                text: "...but it's more effective than my bloody medicines!",
                button: "Next"
            },
            {
                text: "You will be nice and give me %candies%, I feel weak.",
                action: "show_bag",
                sprite: SpriteCharacter2_drug
            }
        ],
        end: [
            {
                text: "Thankkk yyou, and remember not to tell anything to my doctor...",
                button: "Next"
            },
            {
                text: "I trust you!",
                button: "Next"
            },
            {
                text: "",
                action: "finish_character"
            }
        ],
        bad: [
            {
                text: "Don't play with my health.",
                button: "Next",
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
                text: "This is absurd! You are a small monster!",
                button: "Next",
                sprite: SpriteCharacter2_angry,
                state: "angry"
            },
            {
                text: "From now on, I will get my candies somewhere else!",
                button: "Next",
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
                text: "I'm happy to see you...",
                button: "Next"
            },
            {
                text: "I feel very tired lately...",
                button: "Next"
            },
            {
                text: "No don't worry, it is not because of you wonderful candies.",
                button: "Next"
            },
            {
                text: "But mainly because I going to have a baby.",
                button: "Next"
            },
            {
                text: "It's like a fairytail...",
                button: "Next"
            },
            {
                text: "To celebrate it I would love %candies%.",
                action: "show_bag",
                sprite: SpriteCharacter3
            }
        ],
        end: [
            {
                text: "Mmmh I could become a candy-holic...",
                button: "Next",
                sprite: SpriteCharacter3_drug
            },
            {
                text: "",
                action: "finish_character"
            }
        ],
        bad: [
            {
                text: "If it's a prank, it's not funny...",
                button: "Next",
                sprite: SpriteCharacter3_angry
            },
            {
                text: "",
                action: "reload_bag"
            }
        ],
        empty: [
            {
                text: "If it's a prank, it's not funny...",
                button: "Next",
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
                text: "Hum hi. People say that...",
                button: "Next"
            },
            {
                text: "...you sell, you know some small...",
                button: "Next"
            },
            {
                text: "...\"candies\", well, you know what I'm talking about.",
                button: "Next"
            },
            {
                text: "I need %candies%, but hurry up.",
                action: "show_bag"
            }
        ],
        end: [
            {
                text: "Thanks, but be careful, there are some crazy peope around here...",
                sprite: SpriteCharacter4_drug,
                button: "Next"
            },
            {
                text: "",
                action: "finish_character"
            }
        ],
        bad: [
            {
                text: "Are you serious!? You don't want to live anymore?",
                sprite: SpriteCharacter4_angry,
                state: "angry",
                button: "Next"
            },
            {
                text: "You are lucky I can't stay here.",
                state: "angry",
                button: "Next"
            },
            {
                text: "",
                action: "finish_character"
            }
        ],
        wait: [
            {
                text: "Shit, they are coming!",
                sprite: SpriteCharacter4_angry,
                state: "angry",
                button: "Next"
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
    sprite:  SpriteCharacter5,
    dialogs: {
        start: [
            {
                text: "Ah-ah I knew we would meet again!",
                button: "Next"
            },
            {
                text: "I heard a lot about your candies...",
                button: "Next"
            },
            {
                text: "...since the last time.",
                button: "Next"
            },
            {
                text: "I got told that %candies% was perfect for kids, I want them.",
                action: "show_bag"
            }
        ],
        end: [
            {
                text: "I'm sure they will love them...",
                button: "Next"
            },
            {
                text: "",
                action: "finish_character"
            }
        ],
        bad: [
            {
                text: "You are sweet but that's not what I asked.",
                button: "Next"
            },
            {
                text: "",
                action: "reload_bag"
            }
        ],
        empty: [
            {
                text: "I think I just saw one over there!",
                button: "Next"
            },
            {
                text: "",
                action: "reload_bag"
            }
        ],
        wait: [
            {
                text: "Yeah, take your time...",
                button: "Next"
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
                text: "Psst, I decided to start a sugar reselling business, are you in?",
                button: "Next",
                sprite: SpriteCharacter1_drug
            },
            {
                text: "You don't want to be my partner?",
                button: "Next"
            },
            {
                text: "You should think about it!",
                button: "Next"
            },
            {
                text: "I provide, you cut it and sell it, it would be amazing.",
                button: "Next"
            },
            {
                text: "Hugo, in 7th grade think we could make...",
                button: "Next"
            },
            {
                text: "...a lot of pocket money!",
                button: "Next"
            },
            {
                text: "Okay, nevermind, I'll do it by myself!",
                button: "Next"
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
                text: "Dude, I'm in a bad situation...",
                button: "Next",
                action: "load_music",
                action_data: "background-sad",
                sprite: SpriteCharacter1_fear,
                state: "fear"
            },
            {
                text: "I think I partnered with the wrong persons...",
                button: "Next",
                state: "fear"
            },
            {
                text: "They took me everything!!",
                button: "Next",
                state: "fear"
            },
            {
                text: "I need your help, can you give me some candies to put me back on tracks?",
                button: "Next",
                state: "fear"
            },
            {
                text: "Just %candies% should be enough!",
                action: "show_bag",
                state: "fear"
            }
        ],
        bad: [
            {
                text: "Well, I will try to survive with this...",
                button: "Next"
            },
            {
                text: "",
                action: "finish_character"
            }
        ],
        end: [
            {
                text: "Thanks, you are a real friend!",
                button: "Next",
                sprite: SpriteCharacter1
            },
            {
                text: "I will show them who's the boss!",
                button: "Next"
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
                text: "Hey... Hi.. I wanted to say...",
                button: "Next"
            },
            {
                text: "sorry for yesterday, I was on edge you know.",
                button: "Next"
            },
            {
                text: "It gets really crazy over here...",
                button: "Next"
            },
            {
                text: "...this morning a kid got killed...",
                button: "Next"
            },
            {
                text: "... because he was reselling sugar on the street, FUCKIN' SUGAR!!!",
                button: "Next"
            },
            {
                text: "He was probably your age... It's so sad.",
                button: "Next"
            },
            {
                text: "Yo I'm leaving, I don't want to be around. Bye.",
                button: "Next"
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
                text: "Listen kid, I know you saw me a long time ago...",
                button: "Next",
                sprite: SpriteCharacter2_sad
            },
            {
                text: "I wanted to try to buy my candies in another shop but...",
                button: "Next"
            },
            {
                text: "...I found none as good as yours.",
                button: "Next"
            },
            {
                text: "And today I need a pick-me-up because...",
                button: "Next"
            },
            {
                text: "...my husband died three days ago, the funerals are today.",
                button: "Next"
            },
            {
                text: "I should be there at this moment, but I can't do that alone.",
                button: "Next"
            },
            {
                text: "Quick give me %candies% or I will miss it!",
                action: "show_bag"
            }
        ],
        end: [
            {
                text: "Thanks...",
                button: "Next",
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
                button: "Next"
            },
            {
                text: "",
                action: "finish_character"
            }
        ],
        empty: [
            {
                text: "I WON'T LEAVE WITHOUT THESE CANDIES!!!!!",
                button: "Next",
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
                button: "Next",
                sprite: SpriteCharacter2_sad
            },
            {
                text: "I want more...",
                button: "Next"
            },
            {
                text: "Give me %candies%.",
                action: "show_bag"
            }
        ],
        end: [
            {
                text: "Thanks...",
                button: "Next",
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
                button: "Next"
            },
            {
                text: "",
                action: "finish_character"
            }
        ],
        empty: [
            {
                text: "I WON'T LEAVE WITHOUT THESE CANDIES!!!!!",
                button: "Next",
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
                text: "Tell me, I many candies would kill me?",
                button: "Oui",
                sprite: SpriteCharacter2_sad
            },
            {
                text: "Really? %candies%, then give me that so I can end my poor life.",
                action: "show_bag"
            }
        ],
        end: [
            {
                text: "Adieu...",
                button: "Next",
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
                button: "Next",
                sprite: SpriteCharacter2_sad
            },
            {
                text: "",
                action: "finish_character"
            }
        ],
        empty: [
            {
                text: "I WON'T LEAVE WITHOUT THESE CANDIES!!!!!",
                button: "Next",
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
                text: "Kid. I will ask you one question. And ONLY ONE.",
                sprite: SpriteCharacter4_angry,
                state: "angry",
                button: "Next"
            },
            {
                text: "Were YOU selling all that SHIT to my wife?",
                state: "angry",
                button: "Next"
            },
            {
                text: "Do not act like you DON'T KNOW HER!",
                state: "angry",
                button: "Next"
            },
            {
                text: "She has VERY LONG DARK hair, and she love KIDS...",
                state: "angry",
                button: "Next"
            },
            {
                text: "YOUR SILENCE SPEAKS VOLUMES!",
                sprite: SpriteCharacter4_very_angry,
                state: "angry",
                button: "Next"
            },
            {
                text: "You should know that because of YOU, and your DESPICABLE candies...",
                state: "angry",
                button: "Next"
            },
            {
                text: "My wife has developed type 2 diabetes and she lost our baby...",
                state: "angry",
                button: "Next"
            },
            {
                text: "OUR BABY!",
                state: "angry",
                button: "Next"
            },
            {
                text: "OUR LIFE HAVE BEEN RUINED BY YOUR FAULT!!",
                state: "angry",
                button: "Next"
            },
            {
                text: "I HOPE THIS WILL HAUNT ALL... YOUR... LIFE.",
                state: "angry",
                button: "Next"
            },
            {
                text: "You are a monster.",
                state: "angry",
                button: "Next"
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
                button: "Next"
            },
            {
                text: "Mmh, there is no one anymore.",
                button: "Next"
            },
            {
                text: "Nice score, You succeeded to win %money%$...",
                button: "Next"
            },
            {
                text: "...and you only ruined the lifes of 4 persons...",
                button: "Next"
            },
            {
                text: "Congrats."
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
]};