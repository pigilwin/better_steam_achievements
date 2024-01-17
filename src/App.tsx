import {ReactElement, useEffect} from "react";

import {
    BrowserRouter,
    Route,
    Routes
} from 'react-router-dom';

import {useDispatch} from "react-redux";


import {Default} from './pages';
import {NavigationBar} from 'components/NavigationBar';
import {AppDispatch} from "./store";
import {initialiseApplicationState} from "./store/application/thunk";

export const App = (): ReactElement => {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(initialiseApplicationState());
    }, [dispatch]);

    return (
        <main className="font-sans antialiased leading-normal tracking-wider bg-slate-300 min-h-screen">
            <BrowserRouter>
                <NavigationBar/>
                <Routes>
                    <Route path="/" element={<Default/>}/>
                </Routes>
            </BrowserRouter>
        </main>
    );
}