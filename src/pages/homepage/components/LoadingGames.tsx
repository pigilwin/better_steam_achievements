import {ReactElement} from "react";
import {useSelector} from "react-redux";
import {getProcessedGames} from "@store/game/gameSlice";
import Loading from "@components/Loading";
import {Profile} from "@store/application/profile";

interface LoadingGamesProps {
    profile: Profile
}
export default ({profile}: LoadingGamesProps): ReactElement => {
    const howManyGamesHaveBeenLoaded = useSelector(getProcessedGames);
    return (
        <>
            <article className="flex flex-col items-center justify-center bg-white w-full p-2 rounded-md">
                <h2 className="text-xl">Profile {profile.profileId}: {howManyGamesHaveBeenLoaded} games have currently been processed</h2>
            </article>
            <Loading/>
        </>
    );
}