import {AppDispatch, AppThunk} from "../index";
import {RootStateHook} from "../rootReducer";
import {
    readProfiles,
    createProfile as createProfileDatabase,
    removeProfile as removeProfileDatabase
} from "./database";
import {
    setProfile,
    setProfiles,
    addProfile,
    removeProfile as removeProfileDispatch,
    unsetProfile
} from "./applicationSlice";
import {Profile} from "@store/types";

const localStorageKey: string = 'selectedProfile';

/**
 * Initialise the application and read the object store
 */
export const initialiseApplicationState = (
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
            dispatch(setProfile(profile));
        }
    }
}

export const createProfile = (profileId: string): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    const profile = await createProfileDatabase({profileId: profileId});
    /**
     * Add this profile to the list
     */
    dispatch(addProfile(profile));
}

export const removeProfile = (profile: Profile): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    await removeProfileDatabase(profile);

    const selectedProfile = getState().applicationReducer.profile;
    if (selectedProfile !== undefined) {
        dispatch(unsetProfile());
    }

    dispatch(removeProfileDispatch(profile));
}
