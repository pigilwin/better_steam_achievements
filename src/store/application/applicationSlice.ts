import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../rootReducer";
import {deepCopy} from "lib/deepCopy";
import {Profile, Profiles} from "../types";

interface ApplicationState {
    profile: Profile | undefined,
    profiles: Profiles
}
export const initialState: ApplicationState =  {
    profile: undefined,
    profiles: []
};

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        setProfiles(state: ApplicationState, action: PayloadAction<Profiles>) {
            const newState = deepCopy<ApplicationState>(state);
            newState.profiles = action.payload;
            return newState;
        },
        setProfile(state: ApplicationState, action: PayloadAction<Profile>) {
            const newState = deepCopy<ApplicationState>(state);
            newState.profile = action.payload;
            return newState;
        },
        addProfile(state: ApplicationState, action: PayloadAction<Profile>) {
            const newState = deepCopy<ApplicationState>(state);
            newState.profiles.push(action.payload);
            return newState;
        },
        unsetProfile(state: ApplicationState, action: PayloadAction) {
            const newState = deepCopy<ApplicationState>(state);
            newState.profile = undefined;
            return newState;
        },
        removeProfile(state: ApplicationState, action: PayloadAction<Profile>) {
            const newState = deepCopy<ApplicationState>(state);
            newState.profiles = state.profiles.filter((profile) => {
                return action.payload.profileId !== profile.profileId;
            });
            return newState;
        }
    }
});

export const reducer = applicationSlice.reducer;

export const {
    setProfile,
    setProfiles,
    addProfile,
    unsetProfile,
    removeProfile
} = applicationSlice.actions;

export const getSelectedProfileSelector = (state: RootState): Profile | undefined => state.applicationReducer.profile;
export const getProfilesSelector = (state: RootState): Profiles => state.applicationReducer.profiles;
