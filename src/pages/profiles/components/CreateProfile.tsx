import {ChangeEvent, ChangeEventHandler, ReactElement, useState} from "react";
import {BlueButton} from "@components/Buttons";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@store/index";
import {createProfile as createProfileThunk} from "@store/application/thunk";
import {Profiles} from "@store/types";

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

interface InputProps {
    label: string;
    onChange: ChangeEventHandler<HTMLInputElement>,
    id: string,
    errorMessage: string | null,
    value: string
}
const Input = ({label, onChange, id, errorMessage, value}: InputProps): ReactElement => {

    let error: ReactElement | null = null;
    if (errorMessage !== null) {
        error = <span className="p-2 border border-red-500">{errorMessage}</span>
    }

    return (
        <span className="flex flex-col gap-2">
            <label className="p-2" htmlFor={id}>{label}</label>
            <input
                id={id}
                className="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none p-2"
                onChange={onChange}
                value={value}
            />
            {error}
        </span>
    );
}