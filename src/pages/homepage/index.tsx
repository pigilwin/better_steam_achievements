import {ReactElement, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import { GameCard } from "components/GameCard";
import NoProfileSelected from 'pages/homepage/components/NoProfileSelected';

import {Games} from "store/types";
import {getSelectedProfileSelector} from "@store/application/applicationSlice";
import {getGamesSelector, getHasGamesBeenLoadedSelector} from "@store/game/gameSlice";
import {AppDispatch} from "@store/index";
import {initialiseGames} from "@store/game/thunk";

export const Index = (): ReactElement => {

    const dispatch = useDispatch<AppDispatch>();

    const selectedProfile = useSelector(getSelectedProfileSelector);
    const hasGamesBeenLoaded = useSelector(getHasGamesBeenLoadedSelector);

    useEffect(() => {
        if (selectedProfile !== undefined) {
            dispatch(initialiseGames(selectedProfile));
        }
    }, [hasGamesBeenLoaded, selectedProfile]);

    const games = useSelector(getGamesSelector);

    const children: ReactElement[] = [];

    if (selectedProfile === undefined) {
        children.push(<NoProfileSelected key="no-profile"/>);
    } else {
        children.push(<ProfileSelected gameCount={Object.keys(games).length} key="profile-selected"/>);
        children.push(<Grid key="achievement-grid" games={games}/>);
    }

    return (
        <section className="flex flex-col gap-2 m-4">
            {children}
        </section>
    );
};

interface ProfileSelectedProps {
    gameCount: number;
}
const ProfileSelected = ({gameCount}: ProfileSelectedProps): ReactElement => {
    return (
        <article className="flex flex-col items-center justify-center bg-white w-full p-2 rounded-md">
            <h2 className="text-xl">{gameCount} games have been loaded</h2>
            <p className="text-sm">A total of 0 achievements have been acquired.</p>
        </article>
    );
}

interface GridProps {
    games: Games;
}
const Grid = ({games}: GridProps): ReactElement => {

    const cards = [];
    for (const [key, value] of Object.entries(games)) {
        cards.push(
            <GameCard game={value} key={key}/>
        );
    }
    return (
        <article className="bg-white w-full p-2 rounded-md grid grid-cols-3 gap-4">
            {cards}
        </article>
    );
};
