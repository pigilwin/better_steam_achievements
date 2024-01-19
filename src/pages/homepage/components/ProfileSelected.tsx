import {ReactElement} from "react";
import {Games} from "@store/types";

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
        <article className="flex flex-col items-center justify-center bg-white w-full p-2 rounded-md">
            <h2 className="text-xl">{gameCount} games have been loaded</h2>
            <p className="text-sm">A total of {achievementCount} achievements have been acquired.</p>
        </article>
    );
};
