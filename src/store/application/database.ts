import {openDatabase} from '../database';
import {Profile, Profiles} from '@store/application/profile';

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

export const createOrUpdateProfile = async (profile: Profile): Promise<Profile> => {
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
