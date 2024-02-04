import {Game} from '@store/game/game';
import {percentage} from '@lib/util';

export const getTotalCompletionPercentageOfGame = (game: Game): number => {
	const values = Object.values(game.achievements);
	const completed = values.filter(ach => ach.completed);
	return percentage(completed.length, values.length);
};