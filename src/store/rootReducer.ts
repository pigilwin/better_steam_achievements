import { combineReducers } from '@reduxjs/toolkit';

import { reducer as applicationReducer } from '@store/application/applicationSlice';
import { reducer as gameReducer } from '@store/game/gameSlice';

export const rootReducer = combineReducers({
	applicationReducer,
	gameReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export type RootStateHook = () => RootState;
