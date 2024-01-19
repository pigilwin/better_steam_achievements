import {ReactElement} from "react";
import {GameCard} from "@components/GameCard";
import {Games} from "@store/types";

interface GridProps {
    games: Games;
}

export const ResizableGrid = ({games}: GridProps): ReactElement => {
    const cards = [];
    for (const [key, value] of Object.entries(games)) {
        cards.push(
            <GameCard game={value} key={key}/>
        );
    }
    return (
        <article className="bg-white w-full p-2 rounded-md grid grid-cols-3 gap-4">
            {cards}
        </article>
    );
};
