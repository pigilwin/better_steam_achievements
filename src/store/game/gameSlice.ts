import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Games} from "@store/types";
import {produce} from "immer";
import {RootState} from "@store/rootReducer";

interface GameState {
    games: Games,
    loading: boolean
}
export const initialState: GameState =  {
    games: [],
    loading: false,
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        loadingGames(state: GameState, action: PayloadAction<void>) {
            return produce<GameState>(state, newState => {
                newState.loading = true;
            });
        },
        setGames(state: GameState, action: PayloadAction<Games>) {
            return produce<GameState>(state, newState => {
                newState.games = action.payload;
                newState.loading = false;
            });
        }
    }
});

export const reducer = gameSlice.reducer;

export const {
    setGames,
    loadingGames,
} = gameSlice.actions;

export const getIsLoadingSelector = (state: RootState): boolean => state.gameReducer.loading;
export const getGamesSelector = (state: RootState): Games => state.gameReducer.games;
