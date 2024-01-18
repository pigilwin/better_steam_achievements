import {AppDispatch, AppThunk} from "../index";
import {RootStateHook} from "../rootReducer";
import {
    readProfiles,
    createProfile,
    removeProfile
} from "./database";
import {
    selectProfile,
    setProfiles,
    addProfile,
    removeProfile as removeProfileDispatch,
    unsetProfile
} from "./applicationSlice";
import {Profile} from "@store/types";
import {initialiseGames} from "@store/game/thunk";

const localStorageKey: string = 'selectedProfile';

/**
 * Initialise the application and read the object store
 */
export const initialiseApplicationStateThunk = (
): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook,
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
            dispatch(selectProfile(profile));
        }
    }
}

export const createProfileThunk = (profileId: string): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    const profile = await createProfile({profileId: profileId});
    /**
     * Add this profile to the list
     */
    dispatch(addProfile(profile));
}

/**
 * Select a profile within the system
 * @param {Profile} profile
 */
export const selectProfileThunk = (profile: Profile): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
)=> {

    localStorage.setItem(localStorageKey, profile.profileId);

    dispatch(selectProfile(profile));

    dispatch(initialiseGames(profile));
}

export const unsetProfileThunk = (): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    localStorage.removeItem(localStorageKey);

    dispatch(unsetProfile());
}

export const removeProfileThunk = (profile: Profile): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    await removeProfile(profile);

    const selectedProfile = getState().applicationReducer.profile;
    if (selectedProfile !== undefined) {
        dispatch(unsetProfile());
    }

    dispatch(removeProfileDispatch(profile));
}
