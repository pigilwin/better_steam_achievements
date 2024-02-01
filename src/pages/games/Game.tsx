import {ReactElement, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getGameSelector} from '@store/game/gameSlice';
import {RootState} from '@store/rootReducer';
import {GameCard} from '@components/GameCard';
import {PotentialProfile} from '@store/application/profile';
import {Game} from '@store/game/game';
import {GameProgressBar} from './components/GameProgressBar';
import {GameAchievements} from './components/GameAchievements';

interface GameProps {
    profile: PotentialProfile
}
export const Index = ({profile}: GameProps): ReactElement | null => {

	const {gameId} = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (gameId === undefined || profile === undefined) {
			navigate('/');
		}
	}, [gameId, profile, navigate]);

	/**
     * If game id is undefined then lets return null
     */
	if (gameId === undefined) {
		return null;
	}

	const game = useSelector<RootState, Game>(state => getGameSelector(state, gameId));

	return (
		<section className="flex flex-col gap-2 m-4">
			<GameCard key="game-card" game={game} onClickHandler={() =>{}}/>
			<GameProgressBar key="game-progress-bar" achievements={game.achievements}/>
			<GameAchievements key="game-achievements" achievements={game.achievements}/>
		</section>
	);
};
