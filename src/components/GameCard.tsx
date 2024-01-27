import { Game } from "store/types";
import {ReactElement} from "react";

interface GameCardProps {
    game: Game;
}
export const GameCard = ({game}: GameCardProps): ReactElement => {
    const imageUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${game.id}/library_hero.jpg`;
    const altTitle = `Failed to load image for ${game.name}`;
    return (
        <div className="relative flex flex-col items-center cursor-pointer">
            <img src={imageUrl} className="object-cover pointer-events-none rounded-md" alt={altTitle}/>
            <h2 className="absolute top-2 text-white text-xl">{game.name}</h2>
            <p className="absolute bottom-2 text-white text-xl">This game has {Object.keys(game.achievements).length} achievements</p>
        </div>
    );
};