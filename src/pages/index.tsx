import {ReactElement} from "react";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";

import { GameCard } from "components/GameCard";

import { Game } from "store/types";
import {getSelectedProfileSelector} from "../store/application/applicationSlice";

export const Default = (): ReactElement => {

    const selectedProfile = useSelector(getSelectedProfileSelector);

    const children: ReactElement[] = [];

    if (selectedProfile === undefined) {
        children.push(<NoProfileSelectedInformationBar key="no-profile"/>);
    } else {
        children.push(<ProfileSelected key="profile-selected"/>);
        children.push(<Grid key="achievement-grid"/>);
    }

    return (
        <section className="flex flex-col gap-2 m-4">
            {children}
        </section>
    );
};

const NoProfileSelectedInformationBar = (): ReactElement => {
    const navigate = useNavigate();
    const handler = () => {
        navigate('/profiles');
    };

    const link = <a onClick={handler} className="text-blue-300 cursor-pointer">please select a profile</a>;
    
    return (
        <article className="flex flex-row justify-center bg-white w-full p-2 rounded-md">
            <h2 className="text-xl">No profile has been selected, {link}</h2>
        </article>
    );
};

const ProfileSelected = (): ReactElement => {
    return (
        <article className="flex flex-col items-center justify-center bg-white w-full p-2 rounded-md">
            <h2 className="text-xl">10 games have been fully completed</h2>
            <p className="text-sm">A total of 50 achievements have been acquired.</p>
        </article>
    );
}

const Grid = (): ReactElement => {
    const game: Game = {
        achievements: [],
        id: 632360,
        name: "Risk Of Rain 2",
        hidden: false
    }; 

    return (
        <article className="bg-white w-full p-2 rounded-md grid grid-cols-3 gap-4">
            <GameCard game={game}></GameCard>
            <GameCard game={game}></GameCard>
            <GameCard game={game}></GameCard>
            <GameCard game={game}></GameCard>
            <GameCard game={game}></GameCard>
            <GameCard game={game}></GameCard>
            <GameCard game={game}></GameCard>
            <GameCard game={game}></GameCard>
            <GameCard game={game}></GameCard>
            <GameCard game={game}></GameCard>
            <GameCard game={game}></GameCard>
        </article>
    );
};