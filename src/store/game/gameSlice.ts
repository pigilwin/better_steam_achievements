import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {produce} from 'immer';
import {RootState} from '@store/rootReducer';
import {GameLoadingState} from '@store/game/types';
import {Game, Games} from '@store/game/game';

interface GameState {
    games: Games,
    loadingState: GameLoadingState,
    gameCount: number
}

interface GameHiddenInterface {
	storedKey: string;
	hidden: boolean;
}

export const initialState: GameState =  {
	games: {},
	gameCount: 0,
	loadingState: GameLoadingState.notLoaded,
};

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		removeGames(state: GameState) {
			return produce<GameState>(state, newState => {
				newState.games = {};
				newState.loadingState = GameLoadingState.notLoaded;
				newState.gameCount = 0;
			});
		},
		setGameProcessed(state: GameState, action: PayloadAction<number>) {
			return produce<GameState>(state, newState => {
				newState.gameCount = action.payload;
				newState.loadingState = GameLoadingState.loading;
			});
		},
		setGames(state: GameState, action: PayloadAction<Games>) {
			return produce<GameState>(state, newState => {
				newState.games = action.payload;
				newState.loadingState = GameLoadingState.loaded;
			});
		},
		setHiddenForGame(state: GameState, action: PayloadAction<GameHiddenInterface>) {
			return produce<GameState>(state, newState => {
				newState.games[action.payload.storedKey].hidden = action.payload.hidden;
			});
		}
	}
});

export const reducer = gameSlice.reducer;

export const {
	setGames,
	removeGames,
	setGameProcessed,
	setHiddenForGame
} = gameSlice.actions;

export const getLoadingSelector = (state: RootState): GameLoadingState => state.gameReducer.loadingState;
export const getProcessedGames = (state: RootState): number => state.gameReducer.gameCount;

export const getGames = (state: RootState): Games => state.gameReducer.games;

export const getCompletedGamesSelector= createSelector(getGames, (games) => {
	const completedGames: Games = {};
	for (const [key, value] of Object.entries(games)) {
		const achievements = Object.values(value.achievements);
		const completedAchievements = achievements.filter(s => s.completed);

		/**
         * Games without achievements should not be shown
         */
		if (achievements.length === 0) {
			continue;
		}


		/**
         * This game still has achievements are still to go
         */
		if (achievements.length !== completedAchievements.length) {
			continue;
		}

		completedGames[key] = value;
	}
	return completedGames;
});

export const getGameSelector = (state: RootState, storedKey: string): Game => state.gameReducer.games[storedKey];
