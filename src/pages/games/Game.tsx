import {ReactElement} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getGameSelector} from "@store/game/gameSlice";
import {RootState} from "@store/rootReducer";
import {GameCard} from "@components/GameCard";
import {PotentialProfile} from "@store/application/profile";
import {Game} from "@store/game/game";

interface GameProps {
    profile: PotentialProfile
}
export const Index = ({profile}: GameProps): ReactElement | null => {

    const {gameId} = useParams();
    const navigate = useNavigate();

    if (gameId === undefined || profile === undefined) {
        navigate('/');
        return null;
    }

    const game = useSelector<RootState, Game>(state => getGameSelector(state, gameId));

    return (
        <section className="flex flex-col gap-2 m-4">
            <GameCard game={game} onClickHandler={() =>{}}/>
        </section>
    );
};
