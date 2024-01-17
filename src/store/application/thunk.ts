import {AppDispatch, AppThunk} from "../index";
import {RootStateHook} from "../rootReducer";
import {readProfiles} from "./database";
import {setProfile, setProfiles} from "./applicationSlice";

/**
 * Initialise the application and read the object store
 */
export const initialiseApplicationState = (
): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook,
) => {
    const localStorageKey = 'selectedProfile';
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