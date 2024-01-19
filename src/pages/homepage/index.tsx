import {ReactElement, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import NoProfileSelected from 'pages/homepage/components/NoProfileSelected';
import {getSelectedProfileSelector} from "@store/application/applicationSlice";
import {getGamesSelector, getLoadingSelector} from "@store/game/gameSlice";
import {AppDispatch} from "@store/index";
import {initialiseGamesThunk} from "@store/game/thunk";
import {ResizableGrid} from "@components/ResizableGrid";
import ProfileSelected from "./components/ProfileSelected";
import {Games, PotentialProfile} from "@store/types";
import Loading from "@components/Loading";

interface HomepageProps {
    profile: PotentialProfile;
}
export const Index = ({profile}: HomepageProps): ReactElement => {

    const dispatch = useDispatch<AppDispatch>();

    const games = useSelector(getGamesSelector);
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
        children.push(<Loading key="loading"/>);
    } else {
        const completedGames = filterCompletedGames(games);
        children.push(<ProfileSelected gameCount={Object.keys(completedGames).length} key="profile-selected"/>);
        children.push(<ResizableGrid key="achievement-grid" games={completedGames}/>);
    }

    return (
        <section className="flex flex-col gap-2 m-4">
            {children}
        </section>
    );
};

/**
 * Filter the games to only show completed games
 * @param {Games} games
 * @return {Games}
 */
const filterCompletedGames = (games: Games): Games => {
    const completedGames: Games = {};
    for (const [key, value] of Object.entries(games)) {
        const achievements = Object.values(value.achievements);
        const completedAchievements = achievements.filter(s => s.completed);
        if (achievements.length === completedAchievements.length) {
            completedGames[key] = value;
        }
    }
    return completedGames;
}
