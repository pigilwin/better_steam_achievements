import {Profile, Profiles} from "../types";
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

export const createProfile = async (profile: Profile): Promise<Profile> => {
    const database = await openDatabase();
    const transaction = database.transaction('profiles', 'readwrite');
    const store = transaction.objectStore('profiles');
    await store.put(profile, profile.profileId);
    await transaction.done;
    return profile;
};

export const deleteProfile = async (profile: Profile): Promise<void> => {
    const database = await openDatabase();
    const transaction = database.transaction('profiles', 'readwrite');
    const store = transaction.objectStore('profiles');
    store.delete(profile.profileId);
    await transaction.done;
};
