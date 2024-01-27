import {ReactElement} from "react";
import {ResizableGrid} from "@components/ResizableGrid";
import {useSelector} from "react-redux";
import {getCompletedGamesSelector} from "@store/game/gameSlice";
import ProfileSelected from "./ProfileSelected";
import {GameCard} from "@components/GameCard";

export default (): ReactElement => {
    const games = useSelector(getCompletedGamesSelector);
    const cards = [];
    for (const [key, value] of Object.entries(games)) {
        cards.push(
            <GameCard game={value} key={key}/>
        );
    }

    return (
        <>
            <ProfileSelected games={games} key="profile-selected"/>
            <ResizableGrid elements={cards} rangeLabel="How many columns to show?" key="resizable-grid"/>
        </>
    );
}