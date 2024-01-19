import {
    Achievements,
    Game,
    Games,
    LoadedGameProperties,
    LoadedStoredAchievement,
    Profile,
    StoredAchievement,
    StoredGame
} from "@store/types";
import {openDatabase} from "@store/database";

export const doesProfileHaveAnyGames = async (profile: Profile): Promise<boolean> => {
    const database = await openDatabase();
    try {
        const gameCount = await database.countFromIndex('games', 'profileId', profile.profileId);
        return gameCount > 0;
    } catch (e) {
        return false;
    }
}

export const loadGamesFromStorage = async (profile: Profile): Promise<Games> => {
    const games: Games = {};
    const database = await openDatabase();
    const gamesTransaction = database.transaction('games');
    const filter = IDBKeyRange.only(profile.profileId);
    let cursor = await gamesTransaction.store.index('profileId').openCursor(filter);
    while(cursor) {
        const key = createGameKey(profile.profileId, cursor.value.id);
        games[key] = Object.assign<StoredGame, LoadedGameProperties>(cursor.value, {
            storedKey: key,
            achievements: {}
        });
        cursor = await cursor.continue();
    }
    await gamesTransaction.done;
    return games;
};

export const loadAchievementsFromStorage = async (profile: Profile, game: Game): Promise<Achievements> => {
    const achievements: Achievements = {};
    const database = await openDatabase();
    const achievementTransaction = database.transaction('achievements');
    const filter = IDBKeyRange.only(game.id);
    let cursor = await achievementTransaction.store.index('gameId').openCursor(filter);
    while (cursor) {
        const achievement = cursor.value;
        if (achievement.profileId !== profile.profileId) {
            continue;
        }
        const key = createAchievementKey(achievement.profileId, achievement.gameId, achievement.id);
        achievements[key] = Object.assign<StoredAchievement, LoadedStoredAchievement>(cursor.value, {
            storedKey: key
        });
        cursor = await cursor.continue();
    }
    await achievementTransaction.done;
    return achievements;
};


export const storeGame = async (game: StoredGame): Promise<string> => {
    const database = await openDatabase();
    const transaction = database.transaction('games', 'readwrite');
    const store = transaction.objectStore('games');
    const key = createGameKey(game.profileId, game.id);
    await store.put(game, key);
    await transaction.done;
    return key;
};

export const storeAchievement = async (game: Game, achievement: StoredAchievement): Promise<string> => {
    const database = await openDatabase();
    const transaction = database.transaction('achievements', 'readwrite');
    const store = transaction.objectStore('achievements');

    const key = createAchievementKey(game.profileId, game.id, achievement.id);

    await store.put(achievement, key);

    await transaction.done;

    return key;
}

const createGameKey = (profileId: string, id: number): string => {
    return profileId + '-' + id;
};

const createAchievementKey = (profileId: string, id: number, achievementId: string): string => {
    const achievementIdFiltered = achievementId.toLowerCase().split(' ').join('-');
    return profileId + '-' + id + '-' + achievementIdFiltered;
};