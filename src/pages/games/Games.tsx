import {ChangeEvent, ReactElement, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getGames} from '@store/game/gameSlice';
import {RootState} from '@store/rootReducer';
import {GameCard} from '@components/GameCard';
import {ResizableGrid, ResizableGridToggleSwitch} from '@components/ResizableGrid';
import {PotentialProfile} from '@store/application/profile';
import {Games} from '@store/game/game';
import {TitleWithButtons} from '@components/TitleWithButtons';

interface GameProps {
    profile: PotentialProfile
}
export const Index = ({profile}: GameProps): ReactElement | null => {

	const navigate = useNavigate();

	useEffect(() => {
		if (profile === undefined) {
			navigate('/');
		}
	}, [profile, navigate]);

	const [howManyToShow, setHowManyToShow] = useState(3);
	const games = useSelector<RootState, Games>(state => getGames(state));

	const cards = [];
	for (const [key, value] of Object.entries(games)) {
		const onGameSelectedHandler = () => {
			navigate(`/games/${value.storedKey}`);
		};
		cards.push(
			<GameCard game={value} key={key} onClickHandler={onGameSelectedHandler}/>
		);
	}

	const howManyToShowHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setHowManyToShow(Number.parseInt(event.currentTarget.value));
	};

	const titles: ReactElement[] = [
		<h2 key="title" className="text-2xl">All Games</h2>,
	];
	const inputs: ReactElement[] = [
		<ResizableGridToggleSwitch key="toggle-switch" howManyToShow={howManyToShow} onChange={howManyToShowHandler}/>
	];

	return (
		<section className="flex flex-col gap-2 m-4">
			<TitleWithButtons key="title-with-buttons" titles={titles} inputs={inputs}/>
			<ResizableGrid elements={cards} howManyToShow={howManyToShow} key="resizable-grid"/>
		</section>
	);
};
