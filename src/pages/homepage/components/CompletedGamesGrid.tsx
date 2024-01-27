import {ReactElement} from "react";
import {ResizableGrid} from "@components/ResizableGrid";
import {useSelector} from "react-redux";
import {getCompletedGamesSelector} from "@store/game/gameSlice";
import ProfileSelected from "./ProfileSelected";

export default (): ReactElement => {
    const games = useSelector(getCompletedGamesSelector);
    return (
        <>
            <ProfileSelected games={games} key="profile-selected"/>
            <ResizableGrid games={games} key="resizable-grid"/>
        </>
    );
}