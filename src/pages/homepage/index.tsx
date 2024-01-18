import {ReactElement} from "react";
import {useSelector} from "react-redux";

import { GameCard } from "components/GameCard";
import NoProfileSelected from 'pages/homepage/components/NoProfileSelected';

import {Game, Games} from "store/types";
import {getSelectedProfileSelector} from "@store/application/applicationSlice";
import {getGamesSelector, getIsLoadingSelector} from "@store/game/gameSlice";

export const Index = (): ReactElement => {

    const selectedProfile = useSelector(getSelectedProfileSelector);
    const isLoading = useSelector(getIsLoadingSelector);
    const games = useSelector(getGamesSelector);

    const children: ReactElement[] = [];

    if (selectedProfile === undefined) {
        children.push(<NoProfileSelected key="no-profile"/>);
    } else if (isLoading) {
        children.push(<p key="loading">Loading...</p>);
    } else {
        children.push(<ProfileSelected gameCount={games.length} key="profile-selected"/>);
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
            <h2 className="text-xl">{gameCount} games have been fully completed</h2>
            <p className="text-sm">A total of 50 achievements have been acquired.</p>
        </article>
    );
}

interface GridProps {
    games: Games;
}
const Grid = ({games}: GridProps): ReactElement => {

    const cards = games.map((game) => <GameCard game={game}/>);

    return (
        <article className="bg-white w-full p-2 rounded-md grid grid-cols-3 gap-4">
            {cards}
        </article>
    );
};
