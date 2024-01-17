import {Profiles} from "../types";
import {openDatabase} from "../database";

/**
 * Get all the profiles stored within the application
 */
export const readProfiles = async () : Promise<Profiles> => {
    const database = await openDatabase();
    const transaction = database.transaction('profiles');
    const store = transaction.objectStore('profiles');
    const profiles = await store.getAll();
    await transaction.done;
    return profiles;
};
