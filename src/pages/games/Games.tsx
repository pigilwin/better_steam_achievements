import {ChangeEvent, ReactElement, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getGames} from '@store/game/gameSlice';
import {RootState} from '@store/rootReducer';
import {GameCard} from '@components/GameCard';
import {ResizableGrid, ResizableGridToggleSwitch} from '@components/ResizableGrid';
import {PotentialProfile, Profile} from '@store/application/profile';
import {Games} from '@store/game/game';
import {TitleWithButtons} from '@components/TitleWithButtons';
import {ToggleSwitch} from '@components/Inputs';
import {updateProfileThunk} from '@store/application/thunk';
import {AppDispatch} from '@store/index';

interface GameProps {
    profile: PotentialProfile
}
export const Index = ({profile}: GameProps): ReactElement | null => {

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [hidden, setHidden] = useState<boolean>(false);

	useEffect(() => {
		if (profile === null) {
			navigate('/');
		}
	}, [profile, navigate]);

	const [howManyToShow, setHowManyToShow] = useState(
		(profile as Profile).howManyColumnsToShow
	);
	const games = useSelector<RootState, Games>(state => getGames(state));

	const cards = [];
	for (const [key, value] of Object.entries(games)) {

		if (!hidden && value.hidden) {
			continue;
		}

		const onGameSelectedHandler = () => {
			navigate(`/games/${value.storedKey}`);
		};
		cards.push(
			<GameCard game={value} key={key} onClickHandler={onGameSelectedHandler}/>
		);
	}

	const howManyToShowHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const number = Number.parseInt(event.currentTarget.value);
		dispatch(updateProfileThunk(profile as Profile, number));
		setHowManyToShow(number);
	};
	const hiddenGamesHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setHidden(event.currentTarget.checked);
	};

	const titles: ReactElement[] = [
		<h2 key="title" className="text-2xl">All Games</h2>,
	];
	const inputs: ReactElement[] = [
		<ResizableGridToggleSwitch
			key="resizable-grid-toggle-switch"
			howManyToShow={howManyToShow}
			onChange={howManyToShowHandler}
		/>,
		<ToggleSwitch
			key="hidden-toggle-switch"
			value={hidden}
			title="Show hidden games?"
			onChange={hiddenGamesHandler}
			column={false}
		/>
	];

	return (
		<section className="flex flex-col gap-2 m-4">
			<TitleWithButtons
				key="title-with-buttons"
				titles={titles}
				inputs={inputs}
				columnForTitles={true}
				columnForInputs={false}
			/>
			<ResizableGrid
				elements={cards}
				howManyToShow={howManyToShow}
				key="resizable-grid"
			/>
		</section>
	);
};
