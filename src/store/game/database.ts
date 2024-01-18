import {
    Achievements,
    Game,
    Games,
    LoadedGameProperties, LoadedStoredAchievement,
    Profile,
    StoredAchievement,
    StoredGame
} from "@store/types";
import {openDatabase} from "@store/database";

export const doesProfileHaveAnyGames = async (profile: Profile): Promise<boolean> => {
    const database = await openDatabase();
    const transaction = database.transaction('games');
    const store = transaction.objectStore('games');
    const storedGames = await store.getAll();
    const storedGamesForProfile = storedGames.filter((game) => {
        return game.profileId === profile.profileId;
    });
    const hasGames = storedGamesForProfile.length > 0;
    await transaction.done;
    return hasGames;
}

export const loadGamesFromStorage = async (profile: Profile): Promise<Games> => {
    const games: Games = [];
    const database = await openDatabase();
    const gamesTransaction = database.transaction('games');
    for await (const cursor of gamesTransaction.store) {
        if (cursor.value.profileId !== profile.profileId) {
            continue;
        }
        const game: Game = Object.assign<StoredGame, LoadedGameProperties>(cursor.value, {
            storedKey: cursor.key,
            achievements: []
        });
        games.push(game);
    }
    await gamesTransaction.done;

    for (const game of games) {
        game.achievements = await loadAchievementsFromStorage(profile, game);
    }

    return games;
};

export const loadAchievementsFromStorage = async (profile: Profile, game: Game): Promise<Achievements> => {
    const achievements: Achievements = [];
    const database = await openDatabase();
    const achievementTransaction = database.transaction('achievements');
    for await (const cursor of achievementTransaction.store) {
        if (cursor.value.gameId !== game.id || cursor.value.profileId !== profile.profileId) {
            continue;
        }
        const achievement = Object.assign<StoredAchievement, LoadedStoredAchievement>(cursor.value, {
            storedKey: cursor.key
        });
        achievements.push(achievement);
    }
    await achievementTransaction.done;
    return achievements;
};


export const storeGame = async (game: StoredGame): Promise<string> => {
    const database = await openDatabase();
    const transaction = database.transaction('games', 'readwrite');
    const store = transaction.objectStore('games');
    const key = game.profileId + '-' + game.id;
    await store.put(game);
    await transaction.done;
    return key;
};

export const storeAchievement = async (game: Game, achievement: StoredAchievement): Promise<string> => {
    const database = await openDatabase();
    const transaction = database.transaction('achievements', 'readwrite');
    const store = transaction.objectStore('achievements');

    const key = game.profileId + '-' + game.id + '-' + achievement.id;

    await store.put(achievement);

    await transaction.done;

    return key;
}
