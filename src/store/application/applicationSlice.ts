import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";
import { deepCopy } from "lib/deepCopy";

export type ApplicationState = {value: boolean};

export const initialState: ApplicationState =  {
    value: false
};

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        apply(state: ApplicationState, action: PayloadAction<boolean>) {
            const newState = deepCopy<ApplicationState>(state);
            newState.value = action.payload;
            return newState;
        },
    }
});

export const reducer = applicationSlice.reducer;
export const {
    apply
} = applicationSlice.actions;

export const getApply = (state: RootState): boolean => state.applicationReducer.value;
