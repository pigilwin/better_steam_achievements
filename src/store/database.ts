import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { Profile, StoredAchievement, StoredGame } from './types';

export const openDatabase = async (): Promise<IDBPDatabase<BetterSteamAchievements>> => {
    return await openDB<BetterSteamAchievements>('better-steam-achievements', 1, {
        upgrade: (db: IDBPDatabase<BetterSteamAchievements>) => {
            db.createObjectStore('games');
            db.createObjectStore('achievements');
            db.createObjectStore('profiles');
        }
    });
}

interface BetterSteamAchievements extends DBSchema {
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