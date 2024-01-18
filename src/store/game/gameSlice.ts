import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Games} from "@store/types";
import {produce} from "immer";

interface GameState {
    games: Games,
}
export const initialState: GameState =  {
    games: []
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setGames(state: GameState, action: PayloadAction<Games>) {
            return produce<GameState>(state, newState => {
                newState.games = action.payload;
            });
        }
    }
});

export const reducer = gameSlice.reducer;

export const {
    setGames,
} = gameSlice.actions;