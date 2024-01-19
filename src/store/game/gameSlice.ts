import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Achievement, Game, Games} from "@store/types";
import {produce} from "immer";
import {RootState} from "@store/rootReducer";

interface GameState {
    games: Games,
    gamesHaveBeenLoaded: boolean,
}
export const initialState: GameState =  {
    games: {},
    gamesHaveBeenLoaded: false,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        removeGames(state: GameState, action: PayloadAction<void>) {
            return produce<GameState>(state, newState => {
                newState.games = {};
                newState.gamesHaveBeenLoaded = false;
            });
        },
        addGame(state: GameState, action: PayloadAction<Game>) {
            return produce<GameState>(state, newState => {
                newState.games[action.payload.storedKey] = action.payload;
                newState.gamesHaveBeenLoaded = true;
            });
        },
        addAchievementToGame(state: GameState, action: PayloadAction<{game: Game, achievement: Achievement}>) {
            return produce<GameState>(state, newState => {
                newState.games[action.payload.game.storedKey].achievements[action.payload.achievement.storedKey] = action.payload.achievement;
            });
        }
    }
});

export const reducer = gameSlice.reducer;

export const {
    addGame,
    removeGames,
    addAchievementToGame
} = gameSlice.actions;

export const getGamesSelector = (state: RootState): Games => state.gameReducer.games;
export const getHasGamesBeenLoadedSelector = (state: RootState): boolean => state.gameReducer.gamesHaveBeenLoaded;
