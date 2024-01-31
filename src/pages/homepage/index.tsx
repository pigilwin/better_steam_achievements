import {ReactElement, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import NoProfileSelected from 'pages/homepage/components/NoProfileSelected';
import {getLoadingSelector} from "@store/game/gameSlice";
import {AppDispatch} from "@store/index";
import {initialiseGamesThunk} from "@store/game/thunk";
import LoadingGames from "./components/LoadingGames";
import CompletedGamesGrid from "./components/CompletedGamesGrid";
import {GameLoadingState} from "@store/game/types";
import {PotentialProfile} from "@store/application/profile";

interface HomepageProps {
    profile: PotentialProfile;
}
export const Index = ({profile}: HomepageProps): ReactElement => {

    const dispatch = useDispatch<AppDispatch>();

    const loadingState = useSelector(getLoadingSelector);

    useEffect(() => {
        if (profile !== undefined && loadingState === GameLoadingState.notLoaded) {
            dispatch(initialiseGamesThunk(profile));
        }
    }, [profile, loadingState]);

    const children: ReactElement[] = [];
    if (profile === undefined) {
        children.push(<NoProfileSelected key="no-profile"/>);
    } else if (loadingState === GameLoadingState.loading) {
        children.push(<LoadingGames key="loading-games" profile={profile}/>);
    } else {
        children.push(<CompletedGamesGrid key="completed-grid"/>);
    }

    return (
        <section className="flex flex-col gap-2 m-4">
            {children}
        </section>
    );
};