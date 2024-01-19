import {ReactElement, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getProfilesSelector,
    getSelectedProfileSelector,
} from "@store/application/applicationSlice";
import {BlueButton, GreenButton, RedButton} from "@components/Buttons";
import CreateProfile from "./components/CreateProfile";
import {AppDispatch} from "@store/index";
import {Profile} from "@store/types";

import {
    removeProfileThunk,
    selectProfileThunk,
    unsetProfileThunk
} from "@store/application/thunk";
import {useNavigate} from "react-router-dom";

export const Index = (): ReactElement => {
    const profiles = useSelector(getProfilesSelector);
    const selectedProfile = useSelector(getSelectedProfileSelector);
    const [showProfileCreation, setShowProfileCreation] = useState<boolean>(false);

    const createProfile = () => {
        if (showProfileCreation) {
            setShowProfileCreation(false);
        } else {
            setShowProfileCreation(true);
        }
    };

    const onCreateHandler = () => {
        setShowProfileCreation(false);
    };

    const children: ReactElement[] = [];

    if (showProfileCreation) {
        children.push(<CreateProfile key="create-profile" onCreate={onCreateHandler} profiles={profiles}/>);
    } else {
        for (const profile of profiles) {
            const selected = selectedProfile !== undefined && selectedProfile.profileId === profile.profileId;
            children.push(<ProfileRow key={profile.profileId} profile={profile} selected={selected}/>);
        }
    }

    const buttonText = showProfileCreation ? "Cancel" : "Create Profile";

    return (
        <section className="flex flex-col gap-2 m-4">
            <article className="flex flex-row justify-between items-center bg-white w-full p-4 rounded-md">
                <h2 className="text-xl">Select a profile from the list below or create a new one</h2>
                <BlueButton buttonText={buttonText} onClick={createProfile}/>
            </article>
            {children}
        </section>
    );
};

interface ProfileRowProps {
    profile: Profile;
    selected: boolean;
}
const ProfileRow = ({profile, selected}: ProfileRowProps): ReactElement => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const selectProfileHandler = () => {
        dispatch(selectProfileThunk(profile));
        navigate('/');
    };

    let button: ReactElement = <BlueButton buttonText="Select Profile" onClick={selectProfileHandler}/>
    if (selected) {
        const unSelectProfileHandler = () => {
            dispatch(unsetProfileThunk());
        };
        button = <GreenButton buttonText="Profile Selected" onClick={unSelectProfileHandler}/>
    }

    const deleteProfileHandler = () => {
        dispatch(removeProfileThunk(profile));
    };

    const steamProfileUrl = `https://steamcommunity.com/profiles/${profile.profileId}/`;

    return (
        <span className="w-full flex flex-row justify-between items-center p-4 bg-white rounded-md">
            <span className="w-full">Profile Id: {profile.profileId}</span>
            <span className="w-full">
                <a className="text-blue-300" href={steamProfileUrl}>{steamProfileUrl}</a>
            </span>
            <span className="w-full flex flex-row justify-end gap-2">
                {button}
                <RedButton buttonText="Delete" onClick={deleteProfileHandler}/>
            </span>
        </span>
    );
}
