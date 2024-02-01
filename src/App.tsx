import {ReactElement, useEffect} from 'react';

import {
	BrowserRouter,
	Route,
	Routes
} from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from './store';

import {Index as Homepage} from './pages/homepage';
import {Index as Profiles} from './pages/profiles';
import {Index as Games} from './pages/games/Games';
import {Index as Game} from './pages/games/Game';

import {NavigationBar} from './pages/shared/NavigationBar';
import {initialiseApplicationStateThunk} from '@store/application/thunk';
import {getSelectedProfileSelector} from '@store/application/applicationSlice';

export const App = (): ReactElement => {

	const dispatch = useDispatch<AppDispatch>();
	const selectedProfile = useSelector(getSelectedProfileSelector);

	useEffect(() => {
		dispatch(initialiseApplicationStateThunk());
	}, [selectedProfile !== undefined]);

	return (
		<main className="font-serif antialiased leading-normal tracking-wider bg-slate-300 min-h-screen">
			<BrowserRouter>
				<NavigationBar profile={selectedProfile}/>
				<Routes>
					<Route path="/" element={<Homepage profile={selectedProfile}/>}/>
					<Route path="/games" element={<Games profile={selectedProfile}/>}/>
					<Route path="/games/:gameId" element={<Game profile={selectedProfile}/>}/>
					<Route path="/profiles" element={<Profiles/>}/>
				</Routes>
			</BrowserRouter>
		</main>
	);
};