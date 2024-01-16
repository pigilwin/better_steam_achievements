import { GameCard } from "components/GameCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Game } from "store/types";

export const Default = (): JSX.Element => {

    useEffect(() => {
        callback().then((res) => {
            console.log(res);
        });
    });

    const callback = () => {
        const url = import.meta.env.VITE_API_URL;
        return window.fetch(url);
    };

    return (
        <section className="flex flex-col gap-2 m-4">
            <NoProfileSelectedInformationBar/>
            <ProfileSelected/>
            <Grid/>
        </section>
    );
};

const NoProfileSelectedInformationBar = (): JSX.Element => {
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

const ProfileSelected = (): JSX.Element => {
    return (
        <article className="flex flex-col items-center justify-center bg-white w-full p-2 rounded-md">
            <h2 className="text-xl">10 games have been fully completed</h2>
            <p className="text-sm">A total of 50 achievements have been acquired.</p>
        </article>
    );
}

const Grid = (): JSX.Element => {
    const game: Game = {
        achievements: [],
        steamId: 632360,
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