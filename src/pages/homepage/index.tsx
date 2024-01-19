import {ReactElement, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import NoProfileSelected from 'pages/homepage/components/NoProfileSelected';
import {getCompletedGamesSelector, getLoadingSelector} from "@store/game/gameSlice";
import {AppDispatch} from "@store/index";
import {initialiseGamesThunk} from "@store/game/thunk";
import {ResizableGrid} from "@components/ResizableGrid";
import ProfileSelected from "./components/ProfileSelected";
import {PotentialProfile} from "@store/types";
import Loading from "@components/Loading";
import LoadingGames from "./components/LoadingGames";
import CompletedGamesGrid from "./components/CompletedGamesGrid";

interface HomepageProps {
    profile: PotentialProfile;
}
export const Index = ({profile}: HomepageProps): ReactElement => {

    const dispatch = useDispatch<AppDispatch>();

    const gamesAreLoading = useSelector(getLoadingSelector);

    useEffect(() => {
        if (profile !== undefined) {
            dispatch(initialiseGamesThunk(profile));
        }
    }, [profile === undefined]);

    const children: ReactElement[] = [];
    if (profile === undefined) {
        children.push(<NoProfileSelected key="no-profile"/>);
    } else if (gamesAreLoading) {
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