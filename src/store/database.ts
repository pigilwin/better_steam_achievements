import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { Profile, StoredAchievement, StoredGame } from './types';

export const openDatabase = async (): Promise<IDBPDatabase<BetterSteamAchievementsSchema>> => {
    return await openDB<BetterSteamAchievementsSchema>('better-steam-achievements', 1, {
        upgrade: (db: IDBPDatabase<BetterSteamAchievementsSchema>) => {
            const gameStore = db.createObjectStore('games');
            gameStore.createIndex('profileId','profileId');

            const achievementStore = db.createObjectStore('achievements');
            achievementStore.createIndex('gameId','gameId');
            achievementStore.createIndex('profileId','profileId');

            db.createObjectStore('profiles');
        }
    });
}

export interface BetterSteamAchievementsSchema extends DBSchema {
    'games': {
        key: string;
        value: StoredGame;
        indexes: {
            profileId: string
        }
    },
    'achievements': {
        key: string;
        value: StoredAchievement;
        indexes: {
            profileId: string,
            gameId: number
        }
    },
    'profiles': {
        key: string;
        value: Profile;
    }
}