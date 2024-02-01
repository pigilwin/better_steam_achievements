import {ReactElement, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getGames} from "@store/game/gameSlice";
import {RootState} from "@store/rootReducer";
import {GameCard} from "@components/GameCard";
import {ResizableGrid} from "@components/ResizableGrid";
import {PotentialProfile} from "@store/application/profile";
import {Games} from "@store/game/game";

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

    return (
        <section className="flex flex-col gap-2 m-4">
            <article className="bg-white w-full p-2 rounded-md flex justify-center h-full gap-1">
                <p>All games</p>
            </article>
            <ResizableGrid elements={cards} rangeLabel="How many columns to show?" key="resizable-grid"/>
        </section>
);
};
