<template>
    <h1>Dashboard</h1>
    <form action="">
        <h2>Planifier un voyage</h2>
        <label for="ville">Ville:</label>
        <input type="text" placeholder="Toulouse" v-model="myCity">
        <label for="">Date:</label>
        <input type="date">
        <label for="">Notes:</label>
        <input type="textarea">
    </form>

    <p></p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const myCity = ref("");

import TripService from '../../services/tripService'


</script>