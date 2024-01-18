import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {produce} from 'immer';

import {RootState} from "../rootReducer";
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
            return produce<ApplicationState>(state, newState => {
                newState.profiles = action.payload;
            });
        },
        selectProfile(state: ApplicationState, action: PayloadAction<Profile>) {
            return produce<ApplicationState>(state, newState => {
                newState.profile = action.payload;
            });
        },
        addProfile(state: ApplicationState, action: PayloadAction<Profile>) {
            return produce<ApplicationState>(state, newState => {
                newState.profiles.push(action.payload);
            });
        },
        unsetProfile(state: ApplicationState, action: PayloadAction) {
            return produce<ApplicationState>(state, newState => {
                newState.profile = undefined;
            });
        },
        removeProfile(state: ApplicationState, action: PayloadAction<Profile>) {
            return produce<ApplicationState>(state, newState => {
                newState.profiles = state.profiles.filter((profile) => {
                    return action.payload.profileId !== profile.profileId;
                });
            });
        }
    }
});

export const reducer = applicationSlice.reducer;

export const {
    selectProfile,
    setProfiles,
    addProfile,
    unsetProfile,
    removeProfile
} = applicationSlice.actions;

export const getSelectedProfileSelector = (state: RootState): Profile | undefined => state.applicationReducer.profile;
export const getProfilesSelector = (state: RootState): Profiles => state.applicationReducer.profiles;
