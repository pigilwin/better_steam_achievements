import {AppDispatch, AppThunk} from '../index';
import {RootStateHook} from '../rootReducer';
import {
	readProfiles,
	createOrUpdateProfile,
	deleteProfile
} from './database';
import {
	selectProfile,
	setProfiles,
	addProfile,
	updateProfile,
	removeProfile,
	unsetProfile
} from './applicationSlice';
import {initialiseGamesThunk} from '@store/game/thunk';
import {removeGames} from '@store/game/gameSlice';
import {deleteGamesAchievementsForProfile, deleteGamesForProfile} from '@store/game/database';
import {Profile} from '@store/application/profile';

const localStorageKey: string = 'selectedProfile';

/**
 * Initialise the application and read the object store
 */
export const initialiseApplicationStateThunk = (
): AppThunk => async (
	dispatch: AppDispatch,
) => {
	const selectedProfile = localStorage.getItem(localStorageKey);
	const profiles = await readProfiles();

	/**
     * Load the profiles into the application once they have been loaded
     */
	dispatch(setProfiles(profiles));

	/**
     * If the local storage key is set then lets see if it's a valid profile
     */
	if (selectedProfile !== null) {
		const profile = profiles.find((profile) => {
			return profile.profileId === selectedProfile;
		});

		if (profile === undefined) {
			localStorage.removeItem(localStorageKey);
		} else {
			dispatch(selectProfileThunk(profile));
		}
	}
};

export const createProfileThunk = (profileId: string): AppThunk => async (
	dispatch: AppDispatch,
) => {
	const profile = await createOrUpdateProfile({profileId: profileId, howManyColumnsToShow: 3});
	/**
     * Add this profile to the list
     */
	dispatch(addProfile(profile));
};

/**
 * Select a profile within the system
 * @param {Profile} profile
 */
export const selectProfileThunk = (profile: Profile): AppThunk => async (
	dispatch: AppDispatch,
)=> {

	localStorage.setItem(localStorageKey, profile.profileId);

	dispatch(selectProfile(profile));

	dispatch(initialiseGamesThunk(profile));
};

export const updateProfileThunk = (
	profile: Profile,
	howManyColumnsToShow: number
): AppThunk => async (
	dispatch: AppDispatch
)=> {
	const newProfile: Profile = {
		profileId: profile.profileId,
		howManyColumnsToShow
	};

	await createOrUpdateProfile(newProfile);

	dispatch(updateProfile(newProfile));
};

export const unsetProfileThunk = (): AppThunk => async (
	dispatch: AppDispatch,
) => {
	localStorage.removeItem(localStorageKey);

	dispatch(unsetProfile());
};

export const removeProfileThunk = (profile: Profile): AppThunk => async (
	dispatch: AppDispatch,
	getState: RootStateHook
) => {
	await deleteProfile(profile);

	const selectedProfile = getState().applicationReducer.profile;
	if (selectedProfile !== null) {
		dispatch(unsetProfile());
	}

	dispatch(removeProfile(profile));
};

export const clearCacheForProfileThunk = (profile: Profile): AppThunk => async (
	dispatch: AppDispatch,
)=> {
	await deleteGamesForProfile(profile);
	await deleteGamesAchievementsForProfile(profile);
	dispatch(removeGames());
	dispatch(initialiseGamesThunk(profile));
};
