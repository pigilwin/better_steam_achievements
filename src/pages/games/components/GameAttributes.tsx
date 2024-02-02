import {ChangeEvent, ReactElement} from 'react';
import {Game} from '@store/game/game';
import {ToggleSwitch} from '@components/Inputs';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@store/index';
import {updateGameHiddenThunk} from '@store/game/thunk';

interface GameAttributesProps {
    game: Game
}
export const GameAttributes = ({game}: GameAttributesProps): ReactElement => {

	const dispatch = useDispatch<AppDispatch>();

	const changeHiddenHandler = (event: ChangeEvent<HTMLInputElement>): void => {
		dispatch(updateGameHiddenThunk(game.storedKey, event.currentTarget.checked));
	};
    
	return (
		<article className="w-full flex flex-row gap-2 p-2 bg-white rounded-md">
			<ToggleSwitch
				value={game.hidden}
				title="Is Hidden?"
				onChange={changeHiddenHandler}
				column={false}
			/>
		</article>
	);
};
