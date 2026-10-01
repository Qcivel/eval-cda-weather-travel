<template>
    <div>
        <!--<h1>Home</h1>
        <h2> API City : </h2>
        <p>{{ city }}</p>
        <h2>Api Méteo :</h2>
        <p>{{ weather }}</p>
        -->
        <form action="" @submit.prevent="searchTest" >

            <label for="">Rechercher la méteo d'une ville :</label>
            <input v-model="searchUser" type="text" class="input input-primary" placeholder="Paris,Toulouse...">
            <button class="btn" type="submit" > Valider </button>
        </form>
        <div v-if="city.length > 0">
            <p >{{ searchUser }}</p>
            <p>City : {{city[0].name}} - {{ city[0].country }}</p>
            <p> Longitude : {{ city[0].longitude }}</p>
            <p> Latitude: {{ city[0].latitude }}</p>
            <p>Température : {{ weather.current_weather.temperature }}°C</p>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import type { GeoCity } from '../types/geoCity';
import type { WeatherData } from '../types/weatherData';

import { WeatherService } from '../services/weatherService';

const searchUser = ref("");
const WeatherServiceApi = new WeatherService();
const WeatherDataApi = new WeatherService();

const city = ref<GeoCity[]>([]);
// const Lat = ref(city[1].latitude);
const weather = ref<WeatherData[]>([]);

console.log(city.value);

async function searchTest(){
    city.value =  await WeatherServiceApi.searchCity(searchUser.value);
    if(city.value.length > 0){
        weather.value = await WeatherDataApi.getWeather(city.value[0].longitude,city.value[0].latitude);
    }

}

</script>

<style scoped lang="css">
</style>