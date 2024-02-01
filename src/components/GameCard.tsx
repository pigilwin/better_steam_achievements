import {ReactElement} from 'react';
import {Game} from '@store/game/game';

interface GameCardProps {
    game: Game;
    onClickHandler: () => void;
}
export const GameCard = ({game, onClickHandler}: GameCardProps): ReactElement => {
	const imageUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${game.id}/library_hero.jpg`;
	const altTitle = `Failed to load image for ${game.name}`;
	return (
		<div className="relative flex flex-col items-center cursor-pointer" onClick={onClickHandler}>
			<img src={imageUrl} className="object-cover pointer-events-none rounded-md" alt={altTitle}/>
			<h2 className="absolute top-2 text-white text-xl">{game.name}</h2>
			<p className="absolute bottom-2 text-white text-xl">This game has {Object.keys(game.achievements).length} achievements</p>
		</div>
	);
};