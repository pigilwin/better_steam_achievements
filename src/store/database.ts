import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { Profile, StoredAchievement, StoredGame } from './types';

export const openDatabase = async (): Promise<IDBPDatabase<BetterSteamAchievementsSchema>> => {
    return await openDB<BetterSteamAchievementsSchema>('better-steam-achievements', 1, {
        upgrade: (db: IDBPDatabase<BetterSteamAchievementsSchema>) => {
            db.createObjectStore('games');
            db.createObjectStore('achievements');
            db.createObjectStore('profiles');
        }
    });
}

export interface BetterSteamAchievementsSchema extends DBSchema {
    'games': {
        key: string;
        value: StoredGame;
    },
    'achievements': {
        key: string;
        value: StoredAchievement;
    },
    'profiles': {
        key: string;
        value: Profile;
    }
}