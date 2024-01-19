import {ReactElement, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import NoProfileSelected from 'pages/homepage/components/NoProfileSelected';
import {getSelectedProfileSelector} from "@store/application/applicationSlice";
import {getGamesSelector, getHasGamesBeenLoadedSelector} from "@store/game/gameSlice";
import {AppDispatch} from "@store/index";
import {initialiseGames} from "@store/game/thunk";
import {ResizableGrid} from "@components/ResizableGrid";
import ProfileSelected from "./components/ProfileSelected";

export const Index = (): ReactElement => {

    const dispatch = useDispatch<AppDispatch>();

    const selectedProfile = useSelector(getSelectedProfileSelector);
    const hasGamesBeenLoaded = useSelector(getHasGamesBeenLoadedSelector);

    useEffect(() => {
        if (selectedProfile !== undefined) {
            dispatch(initialiseGames(selectedProfile));
        }
    }, [hasGamesBeenLoaded, selectedProfile]);

    const games = useSelector(getGamesSelector);

    const children: ReactElement[] = [];

    if (selectedProfile === undefined) {
        children.push(<NoProfileSelected key="no-profile"/>);
    } else {
        children.push(<ProfileSelected gameCount={Object.keys(games).length} key="profile-selected"/>);
        children.push(<ResizableGrid key="achievement-grid" games={games}/>);
    }

    return (
        <section className="flex flex-col gap-2 m-4">
            {children}
        </section>
    );
};
