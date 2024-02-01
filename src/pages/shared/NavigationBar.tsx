import {ReactElement} from 'react';
import { useNavigate } from 'react-router-dom';

import {BlueButton, GreenButton} from '@components/Buttons';
import {ApiConnectionChecker} from './ApiConnectionChecker';
import {PotentialProfile} from '@store/application/profile';


interface NavigationBarProps {
    profile: PotentialProfile;
}
export const NavigationBar = ({profile}: NavigationBarProps): ReactElement => {

	const navigate = useNavigate();

	const openHomepageHandler = () => {
		navigate('/');
	};
	const openProfilesHandler = () => {
		navigate('/profiles');
	};
	const openSettingsHandler = () => {
		navigate('/settings');
	};

	const openGamesHandler = () => {
		navigate('/games');
	};

	let profilesButton = <BlueButton buttonText="Profiles" onClick={openProfilesHandler}/>;
	if (profile !== undefined) {
		profilesButton = <GreenButton buttonText={'Selected Profile: ' + profile.profileId} onClick={openProfilesHandler}/>;
	}

	return (
		<nav className="flex justify-between items-center p-4 mx-4 bg-white rounded-md sticky top-2 z-30">
			<span className="w-full">
				<span className="text-4xl">Better Steam Achievements</span>
			</span>
			<ApiConnectionChecker/>
			<span className="w-full flex flex-row items-center justify-end h-full gap-3">
				<BlueButton buttonText="Homepage" onClick={openHomepageHandler}/>
				<BlueButton buttonText="Games" onClick={openGamesHandler}/>
				{profilesButton}
				<BlueButton buttonText="Settings" onClick={openSettingsHandler}/>
			</span>
		</nav>
	);
};