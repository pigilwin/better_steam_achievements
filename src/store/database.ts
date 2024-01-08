import { DBSchema, IDBPDatabase, openDB } from 'idb';

export const openDatabase = async (): Promise<IDBPDatabase<BetterSteamAchievements>> => {
    return await openDB<BetterSteamAchievements>('solitaire', 1, {
        upgrade: (db: IDBPDatabase<BetterSteamAchievements>) => {
            db.createObjectStore('games');
        }
    });
}

interface BetterSteamAchievements extends DBSchema {
    'games': {
        key: string;
        value: CompletedGame;
    }
}