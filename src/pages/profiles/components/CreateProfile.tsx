import {ChangeEvent, ReactElement, useState} from "react";
import {BlueButton} from "@components/Buttons";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@store/index";
import {createProfileThunk as createProfileThunk} from "@store/application/thunk";
import {Profiles} from "@store/types";
import {Input} from "@components/Inputs";

interface CreateProfileProps {
    onCreate: () => void;
    profiles: Profiles
}
export default ({onCreate, profiles}: CreateProfileProps): ReactElement => {
    const [possibleSteamId, setSteamId] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const dispatch = useDispatch<AppDispatch>();

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setSteamId(event.currentTarget.value);

    const createProfile = () => {
        setErrorMessage(null);
        const numberRegex = /^[0-9]*$/g;
        let steamId = '';
        /**
         * First lets check for digits only
         */
        if ([...possibleSteamId.matchAll(numberRegex)].length === 0) {
            const profileRegex = /https:\/\/steamcommunity\.com\/profiles\/(.+)\//g;
            const matches = [...possibleSteamId.matchAll(profileRegex)];
            for (const match of matches) {
                steamId = match.at(1) ?? '';
            }
        } else {
            steamId = possibleSteamId;
        }

        if (steamId.length === 0) {
            setErrorMessage('Cant detect profileId or profile link');
            return;
        }

        const profileIds = profiles.map((profile) => profile.profileId);

        if (profileIds.includes(steamId)) {
            setErrorMessage('Profile already in use');
            return;
        }

        dispatch(createProfileThunk(steamId));

        onCreate();
    };

    return (
        <article className="flex flex-col w-full p-4 gap-3 rounded-md bg-white">
            <Input
                id="steam-id"
                label="Profile ID or Steam Profile Link"
                onChange={onChangeHandler}
                errorMessage={errorMessage}
                value={possibleSteamId}
            />
            <BlueButton buttonText="Create Profile" onClick={createProfile}/>
        </article>
    );
};
