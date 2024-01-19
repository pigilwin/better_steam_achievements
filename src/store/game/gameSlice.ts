import {createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Games} from "@store/types";
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
        removeGames(state: GameState, action: PayloadAction<void>) {
            return produce<GameState>(state, newState => {
                newState.games = {};
            });
        },
        setGames(state: GameState, action: PayloadAction<Games>) {
            return produce<GameState>(state, newState => {
                newState.games = action.payload;
                newState.gamesAreLoading = false;
            });
        },
    }
});

export const reducer = gameSlice.reducer;

export const {
    setGames,
    removeGames
} = gameSlice.actions;

export const getLoadingSelector = (state: RootState): boolean => state.gameReducer.gamesAreLoading;

export const getGames = (state: RootState): Games => state.gameReducer.games;

export const getCompletedGamesSelector= createSelector(getGames, (games) => {
    const completedGames: Games = {};
    for (const [key, value] of Object.entries(games)) {
        const achievements = Object.values(value.achievements);
        const completedAchievements = achievements.filter(s => s.completed);
        if (achievements.length === completedAchievements.length) {
            completedGames[key] = value;
        }
    }
    return completedGames;
});
