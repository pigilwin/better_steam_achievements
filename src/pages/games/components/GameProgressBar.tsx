import {Game} from '@store/game/game';
import {getTotalCompletionPercentageOfGame} from '@store/game/aggregates';

interface GameProgressBarProps {
	game: Game
}
export const GameProgressBar = ({game}: GameProgressBarProps) => {

	const amount = getTotalCompletionPercentageOfGame(game);
	const style = {width: `${amount}%`};

	return (
		<span className="w-full bg-gray-200 rounded-full">
			<div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-4 leading-none rounded-full"
				style={style}> {amount}%
			</div>
		</span>
	);
};