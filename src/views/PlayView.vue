<template>
    <div class="main"> 
        <div
        v-for="(joueur, jIndex) in jeux.joueurs"
        class="joueurCarte"
        :key="jIndex"
        >
            <p class="nom">{{ joueur.nom }}</p>
            <div class="mainJoueur">
                <div
                    v-for="carte,index in joueur.main"
                    :key="index"
                    @click="selectCard(carte.valeur,index, jIndex)"
                    :class="getCardClass(index, jIndex)" 
                >
                    <div class="cardComplete">
                        <div class="carte front" >
                            <p>{{ carte.valeur }}</p>
                            <img :src="`./img/${carte.couleur}.png`" alt="">
                        </div>
                        <div class="carte back"></div>
    
                    </div>
                </div>
            </div>
        
        </div>
        <div class="btn" @click="distrib">Distribuer</div>
        <div class="message" v-if="showTexte">
            <p  >{{ texte }}</p>
        </div>
    </div>
</template>

<script setup>
    import { nextTick, onMounted, reactive, ref } from 'vue';
    import { Jeux } from '@/class/Jeux';
    import { Joueur } from '@/class/Joueur';
    import { JeuxDeCarte } from '@/class/JeuxDeCarte';
    import gsap from 'gsap';
    import CSSPlugin from 'gsap/CSSPlugin';

    gsap.registerPlugin(CSSPlugin)
    const jeuxDeCarte = new JeuxDeCarte
    const jeux = reactive(new Jeux(jeuxDeCarte.cartes))
    const selected = ref(false)
    const texte = ref('')
    const showTexte = ref(false)
    const currentIndex = ref(null)
    let isClickable = false;
    const distrib = () => {
        isClickable = true;
        const allCards = document.querySelectorAll('.cardComplete')
        allCards.forEach((c) => {
            c.classList.remove('cardVisible');
        })
        selected.value = true
        showTexte.value = false
        jeux.joueurs.forEach(e => {
            e.main = [];
        });
        jeux.distibuerCarte(5)
        
        // console.log(jeux.joueurs[0].main);
    }
    const selectCard = (card,index, jIndex) => {
        if (jIndex != 0) return;
        if (!isClickable) return;
        isClickable = false;
        console.log(isClickable)
        selected.value = true;
        currentIndex.value = index;
        getCardClass(currentIndex.value , jIndex)
        const randomIndex = Math.floor(Math.random() * 5)
        const cardPlayer2 = jeux.joueurs[1].main[randomIndex]
        const allCards = document.querySelectorAll('.cardComplete')
        allCards[randomIndex + 5].classList.add('cardVisible');
        const result = jeux.comparerCarte(card, cardPlayer2.valeur)
        console.log('result', result)
        
        if (result > 0) {
            showTexte.value = true
            texte.value = 'Vous avez gagner ! BRAVO !!'
            nextTick()
            gsap.fromTo('.message', {
                opacity: 0,
                x: -1000 
            },{
                x: 0,
                opacity:1,
                duration: 3
            })
        } else if (result == 0) {
            showTexte.value = true
            texte.value = 'Egaliter ! Ressayer !!'
            nextTick()

            gsap.fromTo('.message', {
                x: -1000 ,
                opacity: 0
            },{
                x: 0,
                opacity: 1,
                duration: 3
            })
        }
        else if (result < 0){
            showTexte.value = true
            texte.value = 'Perdu ! DOMMAGE !!'
            
            gsap.fromTo('.message', {
                x: -1000 ,
                opacity: 0
            },{
                x: 0,
                opacity:1,
                duration: 3
            })
        }
        
    }
    const getCardClass = (index, jindex) => {
        //:class=" selected && currentIndex == index && jIndex == 0? 'select' : '' "
    
        if (jindex == 0) {
            
            return 'cardContaineur';
        } else if (jindex == 1) {
            return 'cardContaineur2'
        }
        

    }
    onMounted(() => {
        jeux.joueurs.push(JSON.parse(localStorage.getItem('player')))
        jeux.joueurs.push(JSON.parse(JSON.stringify(new Joueur('francis'))))
    })
</script>

<style lang="scss" scoped>
.main{
    width: 100vw;
    height: auto;
    display: flex;
    justify-content: space-around;
}
.joueurCarte{
    margin-top: 50px;
    padding: 30px;
    min-height: 100px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background: rgb(194, 194, 194);
    border-radius: 5px;
}
.cardContaineur{
    width: 100px;
    height: 150px;
    perspective: 600px;
    margin: 2px;
    border-radius: 5px;
}
.cardContaineur2{
    width: 100px;
    height: 150px;
    perspective: 600px;
    margin: 2px;
    border-radius: 5px;

    .cardComplete{
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
        transition: .6s;
        border-radius: 5px;
        transform: rotateY(180deg);
    }
}

.cardVisible{
    transform: rotateY(0deg) !important;
    background-color: green;
}
.btn{
    width: 150px;
    height: 80px;
    background: rgb(41, 100, 189);
    border-radius: 5px;
    padding: 30px;
    margin-top: 50px;
    color:aliceblue;
    text-transform: uppercase;
    align-self: center;
}
.carte{
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 5px;

}
.front {
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    
}
.back{
    background: url(../../public/img/dos-carte.jpg) center/cover ;
    transform: rotateY(180deg);
}

.carte img{
    width: 50px;
    height: 50px;
}
.nom{
    text-transform: uppercase;
    color:aliceblue;
    background: rgb(46, 129, 255);
    padding: 20px;
    border-radius: 5px;
    margin: 20px;
}
.mainJoueur{
    width: 100%;
    display: flex;
}
.select{
    border: 1px solid blue;
}
.message{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px ;
    background: rgb(194, 194, 194);
    color: aliceblue;
    font-size: 2.5rem;
    padding: 75px;
    border-radius: 5px;
}

</style>