import {ReactElement} from "react";
import {Games} from "@store/game/game";

interface ProfileSelectedProps {
    games: Games;
}
export default ({games}: ProfileSelectedProps): ReactElement => {
    let gameCount = 0;
    let achievementCount = 0;
    for (const game of Object.values(games)) {
        gameCount += 1;
        achievementCount += Object.keys(game.achievements).length;
    }

    return (
        <article className="flex flex-row items-center justify-between bg-white w-full p-2 rounded-md">
            <h2 className="text-2xl">{gameCount} games have been fully completed.</h2>
            <p className="text-2xl">A total of {achievementCount} achievements have been acquired.</p>
        </article>
    );
};
