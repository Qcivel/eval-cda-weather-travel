

import { database } from "./firebase.ts";
import { ref, push, update, remove, onValue } from "firebase/database";
import type { Trip } from "../types/trip.ts";

class TripService {
   

  
    // getUserTrips(userId) {
    //     onValue(this.dbRef, userId);
    // }

   
    addTrip(userId:string, trip: Trip) {
        return push(ref(database, `users/${userId}/trips`), trip);));
    }

  
    // deleteTrip(userId, tripId) {
    //     return remove(ref(database, `users/${id}`));
    // }

    
}

// Exporter une instance unique
export default new TripService();


