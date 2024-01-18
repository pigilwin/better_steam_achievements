import {ReactElement, useEffect} from "react";

import {
    BrowserRouter,
    Route,
    Routes
} from 'react-router-dom';

import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "./store";

import {Index as Homepage} from './pages/homepage';
import {Index as Profiles} from './pages/profiles';

import {NavigationBar} from 'components/NavigationBar';
import {initialiseApplicationStateThunk} from "@store/application/thunk";
import {getSelectedProfileSelector} from "@store/application/applicationSlice";
import {initialiseGames} from "@store/game/thunk";

export const App = (): ReactElement => {

    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector(getSelectedProfileSelector);

    useEffect(() => {
        dispatch(initialiseApplicationStateThunk());
    }, [dispatch]);

    useEffect(() => {
        if (profile !== undefined) {
            dispatch(initialiseGames(profile));
        }
    }, [profile]);

    return (
        <main className="font-serif antialiased leading-normal tracking-wider bg-slate-300 min-h-screen">
            <BrowserRouter>
                <NavigationBar/>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/profiles" element={<Profiles/>}/>
                </Routes>
            </BrowserRouter>
        </main>
    );
}