import {Achievements} from '@store/game/achievement';


export interface StoredGame {
    id: number;
    name: string;
    hidden: boolean;
    profileId: string;
}

export interface LoadedGameProperties {
    achievements: Achievements;
    storedKey: string;
}

export interface Game extends StoredGame, LoadedGameProperties {}
export type Games = Record<string, Game>;

export const createGameKey = (profileId: string, id: number): string => {
	return profileId + '-' + id;
};

export const createStoredGame = (id: number, name: string, hidden: boolean, profileId: string): StoredGame => {
	return {
		id,
		name,
		hidden,
		profileId
	};
};

export const storedGameToGame = (storedGame: StoredGame, storedKey: string, achievements: Achievements): Game => {
	const loaded: LoadedGameProperties = {
		storedKey,
		achievements
	};
	return Object.assign<StoredGame, LoadedGameProperties>(storedGame, loaded);
};

export const gameToStoredGame = (game: Game): StoredGame => {
	return {
		id: game.id,
		name: game.name,
		hidden: game.hidden,
		profileId: game.profileId
	};
};
