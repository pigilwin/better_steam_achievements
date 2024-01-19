import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Achievement, Game, Games} from "@store/types";
import {produce} from "immer";
import {RootState} from "@store/rootReducer";

interface GameState {
    games: Games,
    gamesAreLoading: boolean
}
export const initialState: GameState =  {
    games: {},
    gamesAreLoading: true,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setLoading(state: GameState, action: PayloadAction<boolean>) {
            return produce<GameState>(state, newState => {
                newState.gamesAreLoading = action.payload;
            });
        },
        removeGames(state: GameState, action: PayloadAction<void>) {
            return produce<GameState>(state, newState => {
                newState.games = {};
            });
        },
        addGame(state: GameState, action: PayloadAction<Game>) {
            return produce<GameState>(state, newState => {
                newState.games[action.payload.storedKey] = action.payload;
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
    addAchievementToGame,
    setLoading
} = gameSlice.actions;

export const getLoadingSelector = (state: RootState): boolean => state.gameReducer.gamesAreLoading;

export const getGamesSelector = (state: RootState): Games => state.gameReducer.games;
