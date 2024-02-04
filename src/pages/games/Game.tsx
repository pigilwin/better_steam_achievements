import {ReactElement} from 'react';
import {useParams, Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getGameSelector} from '@store/game/gameSlice';
import {RootState} from '@store/rootReducer';
import {GameCard} from '@components/GameCard';
import {PotentialProfile} from '@store/application/profile';
import {Game} from '@store/game/game';
import {GameProgressBar} from './components/GameProgressBar';
import {GameAchievements} from './components/GameAchievements';
import {GameAttributes} from './components/GameAttributes';

interface GameProps {
    profile: PotentialProfile
}
export const Index = ({profile}: GameProps): ReactElement => {

	const {gameId} = useParams();

	if (gameId === undefined || profile === null) {
		return <Navigate to="/" replace/>;
	}

	const game = useSelector<RootState, Game>(state => getGameSelector(state, gameId));
	const children: ReactElement[] = [
		<GameCard key="game-card" game={game} onClickHandler={() =>{}}/>,
		<GameAttributes key="game-attributes" game={game}/>
	];
	if (Object.keys(game.achievements).length > 0) {
		children.push(<GameProgressBar key="game-progress-bar" achievements={game.achievements}/>);
		children.push(<GameAchievements key="game-achievements" achievements={game.achievements}/>);
	}

	return (
		<section className="flex flex-col gap-2 m-4">
			{children}
		</section>
	);
};
