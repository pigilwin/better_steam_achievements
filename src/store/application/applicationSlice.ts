import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {produce} from 'immer';

import {RootState} from '../rootReducer';
import {PotentialProfile, Profile, Profiles} from '@store/application/profile';

interface ApplicationState {
    profile: PotentialProfile,
    profiles: Profiles
}
export const initialState: ApplicationState =  {
	profile: null,
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
		updateProfile(state: ApplicationState, action: PayloadAction<Profile>) {
			return produce<ApplicationState>(state, newState => {
				const profiles = state.profiles.filter((profile) => {
					return action.payload.profileId !== profile.profileId;
				});
				profiles.push(action.payload);
				newState.profiles = profiles;
			});
		},
		unsetProfile(state: ApplicationState) {
			return produce<ApplicationState>(state, newState => {
				newState.profile = null;
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
	updateProfile,
	unsetProfile,
	removeProfile
} = applicationSlice.actions;

export const getSelectedProfileSelector = (state: RootState): PotentialProfile => state.applicationReducer.profile;
export const getProfilesSelector = (state: RootState): Profiles => state.applicationReducer.profiles;
