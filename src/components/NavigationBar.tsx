import {ReactElement} from "react";
import { useNavigate } from "react-router-dom";

import {BlueButton, GreenButton} from "./Buttons";
import {PotentialProfile} from "@store/types";


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

    let profilesButton = <BlueButton buttonText="Profiles" onClick={openProfilesHandler}/>;
    if (profile !== undefined) {
        profilesButton = <GreenButton buttonText={"Selected Profile: " + profile.profileId} onClick={openProfilesHandler}/>;
    }

    return (
        <nav className="flex justify-between items-center p-4 mx-4 bg-white rounded-md sticky top-2 z-30">
            <div className="w-full">
                <span className="text-4xl">Better Steam Achievements</span>
            </div>
            <div className="w-full flex flex-row items-center justify-end h-full gap-3">
                <BlueButton buttonText="Homepage" onClick={openHomepageHandler}/>
                {profilesButton}
                <BlueButton buttonText="Settings" onClick={openSettingsHandler}/>
            </div>
        </nav>
    );
};