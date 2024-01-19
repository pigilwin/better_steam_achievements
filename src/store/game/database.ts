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
    for await (const cursor of gamesTransaction.store) {
        if (cursor.value.profileId !== profile.profileId) {
            continue;
        }
        games[cursor.key] = Object.assign<StoredGame, LoadedGameProperties>(cursor.value, {
            storedKey: cursor.key,
            achievements: {}
        });
    }
    await gamesTransaction.done;
    return games;
};

export const loadAchievementsFromStorage = async (profile: Profile, game: Game): Promise<Achievements> => {
    const achievements: Achievements = {};
    const database = await openDatabase();
    const achievementTransaction = database.transaction('achievements');
    for await (const cursor of achievementTransaction.store) {
        if (cursor.value.gameId !== game.id || cursor.value.profileId !== profile.profileId) {
            continue;
        }
        achievements[cursor.key] = Object.assign<StoredAchievement, LoadedStoredAchievement>(cursor.value, {
            storedKey: cursor.key
        });
    }
    await achievementTransaction.done;
    return achievements;
};


export const storeGame = async (game: StoredGame): Promise<string> => {
    const database = await openDatabase();
    const transaction = database.transaction('games', 'readwrite');
    const store = transaction.objectStore('games');
    const key = createGameKey(game);
    await store.put(game, key);
    await transaction.done;
    return key;
};

export const storeAchievement = async (game: Game, achievement: StoredAchievement): Promise<string> => {
    const database = await openDatabase();
    const transaction = database.transaction('achievements', 'readwrite');
    const store = transaction.objectStore('achievements');

    const key = createAchievementKey(game, achievement);

    await store.put(achievement, key);

    await transaction.done;

    return key;
}

const createGameKey = (game: StoredGame): string => {
    return game.profileId + '-' + game.id;
};

const createAchievementKey = (game: Game, achievement: StoredAchievement): string => {
    const achievementId = achievement.id.toLowerCase().split(' ').join('-');
    return game.profileId + '-' + game.id + '-' + achievementId;
};