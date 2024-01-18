import {Game, Profile, StoredAchievement, StoredGame} from "@store/types";
import {openDatabase} from "@store/database";
import {a} from "@react-spring/web";

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

export const storeGame = async (game: StoredGame): Promise<string> => {
    const database = await openDatabase();
    const transaction = database.transaction('games', 'readwrite');
    const store = transaction.objectStore('games');

    const storedKey = game.profileId + '-' + game.id;

    await store.put(game, storedKey);
    await transaction.done;

    return storedKey;
};

export const storeAchievement = async (game: Game, achievement: StoredAchievement): Promise<string> => {
    const database = await openDatabase();
    const transaction = database.transaction('achievements', 'readwrite');
    const store = transaction.objectStore('achievements');

    const storedKey = game.profileId + '-' + game.id + '-' + achievement.id;

    await store.put(achievement, storedKey);
    await transaction.done;

    return storedKey;
}
