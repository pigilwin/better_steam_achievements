import {ChangeEvent, ReactElement, useState} from 'react';
import {ResizableGrid, ResizableGridToggleSwitch} from '@components/ResizableGrid';
import {useDispatch, useSelector} from 'react-redux';
import {getCompletedGamesSelector} from '@store/game/gameSlice';
import {GameCard} from '@components/GameCard';
import {useNavigate} from 'react-router-dom';
import {TitleWithButtons} from '@components/TitleWithButtons';
import {updateProfileThunk} from '@store/application/thunk';
import {Profile} from '@store/application/profile';
import {AppDispatch} from '@store/index';

interface CompletedGamesGridProfile {
	profile: Profile;
}
export const CompletedGamesGrid = ({profile}: CompletedGamesGridProfile): ReactElement => {
	const games = useSelector(getCompletedGamesSelector);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const [howManyToShow, setHowManyToShow] = useState(3);

	let gameCount = 0;
	let achievementCount = 0;
	const cards = [];

	for (const [key, value] of Object.entries(games)) {
		const onGameSelectedHandler = () => {
			navigate(`/games/${value.storedKey}`);
		};
		cards.push(
			<GameCard game={value} key={key} onClickHandler={onGameSelectedHandler}/>
		);

		gameCount += 1;
		achievementCount += Object.keys(value.achievements).length;
	}

	const howManyToShowHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const number = Number.parseInt(event.currentTarget.value);
		dispatch(updateProfileThunk(profile, number));
		setHowManyToShow(number);
	};

	const titles: ReactElement[] = [
		<h2 key="title" className="text-2xl">{gameCount} games have been fully completed.</h2>,
		<p key="sub-title" className="text-2xl">A total of {achievementCount} achievements have been acquired.</p>
	];
	const inputs: ReactElement[] = [
		<ResizableGridToggleSwitch key="toggle-switch" howManyToShow={howManyToShow} onChange={howManyToShowHandler}/>
	];

	return (
		<>
			<TitleWithButtons
				key="title-with-buttons"
				titles={titles}
				inputs={inputs}
				columnForInputs={false}
				columnForTitles={true}
			/>
			<ResizableGrid
				howManyToShow={howManyToShow}
				elements={cards}
				key="resizable-grid"
			/>
		</>
	);
};
