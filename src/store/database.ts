import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { Profile, StoredAchievement, StoredGame } from './types';

export const openDatabase = async (): Promise<IDBPDatabase<BetterSteamAchievementsSchema>> => {
    return await openDB<BetterSteamAchievementsSchema>('better-steam-achievements', 1, {
        upgrade: (db: IDBPDatabase<BetterSteamAchievementsSchema>) => {
            db.createObjectStore('games',{autoIncrement: true});
            db.createObjectStore('achievements',{autoIncrement: true});
            db.createObjectStore('profiles',{autoIncrement: true});
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