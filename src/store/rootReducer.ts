import { combineReducers } from '@reduxjs/toolkit';

import { reducer as applicationReducer } from './application/applicationSlice';

export const rootReducer = combineReducers({
    applicationReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export type RootStateHook = () => RootState;
