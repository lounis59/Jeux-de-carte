<template>
  <div class="home">
    <div
      class="btn"
      @click="showForm"
      v-if="!show"
    >
    Jouer
    </div>
    <form v-if="show" @submit.prevent="goPlay">
      <label for="nom">Entrer un pseudo :</label>
      <input type="text" id="nom" v-model="playerName">
      <button type="submit">valider</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { Joueur } from '@/class/Joueur';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()
const show = ref(false)
const playerName = ref()






const showForm = () => {
  show.value = !show.value
}
const goPlay = () => {
  const player = new Joueur(playerName.value)
  console.log(player);
  localStorage.setItem('player',JSON.stringify(player))

  router.push('/play')
  // JSON.stringify(localStorage.setItem('player',new Joueur(playerName.value)))
  // console.log(JSON.parse(localStorage.getItem('player')));
  
}

</script>

<style scoped>
.home{
width: 100vw;
height: auto;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}
.btn{
  width: 150px;
  height: 80px;
  background: rgb(41, 100, 189);
  border-radius: 5px;
  padding: 30px;
  margin-top: 200px;
  color:aliceblue;
  text-transform: uppercase;
}
form{
  display: flex;
  flex-direction: column;
  width: 50%;
  height: auto;
  padding: 30px;
  background: rgb(206, 206, 206);
  border-radius: 5px;
}
input,button,label{
  margin: 20px;
}

</style>
