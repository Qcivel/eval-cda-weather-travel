<template>
    <div class="navbar bg-base-100 shadow-sm">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li><a><RouterLink to="/login">Login</RouterLink></a></li>
      <li><a><RouterLink to="/register">Créer un compte</RouterLink></a></li>
      <li v-if="isLoggedIn">
        <LogoutButton />
      </li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul class="bg-base-100 rounded-t-none p-2">
            <li><a><RouterLink to="/home">HOme</RouterLink></a></li>
            <li v-if="isLoggedIn"><a><RouterLink to="/dashboard">Dashbord</RouterLink></a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</div>
</template>

<script setup lang='ts'>
import { ref, onMounted, onUnmounted } from 'vue';
import { onAuthStateChanged, type Unsubscribe } from 'firebase/auth';
import { auth } from '../services/firebase.ts';
import LogoutButton from './LogoutButton.vue';

const isLoggedIn = ref<boolean>(false);
let unsubscribe: Unsubscribe;

onMounted(() => {
    // Écoute en temps réel si un utilisateur est connecté ou non
    unsubscribe = onAuthStateChanged(auth, (user) => {
        isLoggedIn.value = !!user;
    });
});

onUnmounted(() => {
    // Nettoyage du listener quand le composant est détruit
    if (unsubscribe) unsubscribe();
});

</script>

<style scoped lang="css">
</style>