

export class WeatherService {

    async searchCity(query:string){
        try{
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=fr`);
            const data = await response.json();
            
            return data.results
        }catch(error){
            console.error("Erreur lors de la récupération de l'API geocoding:",error)
        }
    }

    async getWeather(lat:number,lng:number){
        try{
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
            const data = await response.json();
            localStorage.setItem(`Méteo${lat}${lng}`,JSON.stringify(data));
            return data;
        }catch(error){
            console.error("Erreur lors de la récupération de l'API meteo")
        }
    }

    async getCachedWeather(lat:number,lng:number){
       const save =  localStorage.getItem(`Méteo${lat}${lng}`);
        
       if (save=== null) {
            return null;
       }else{
            return JSON.parse(save);
       }

    }
}