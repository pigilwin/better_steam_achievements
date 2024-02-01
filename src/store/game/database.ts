import {openDatabase} from '@store/database';
import {Profile} from '@store/application/profile';
import {createGameKey, Game, Games, StoredGame, storedGameToGame} from '@store/game/game';
import {
	Achievements,
	createAchievementKey,
	StoredAchievement,
	storedAchievementToAchievement
} from '@store/game/achievement';

export const doesProfileHaveAnyGames = async (profile: Profile): Promise<boolean> => {
	const database = await openDatabase();
	try {
		const gameCount = await database.countFromIndex('games', 'profileId', profile.profileId);
		return gameCount > 0;
	} catch (e) {
		return false;
	}
};

export const loadGamesFromStorage = async (profile: Profile): Promise<Games> => {
	const games: Games = {};
	const database = await openDatabase();
	const gamesTransaction = database.transaction('games');
	const filter = IDBKeyRange.only(profile.profileId);
	let cursor = await gamesTransaction.store.index('profileId').openCursor(filter);
	while(cursor) {
		const key = createGameKey(profile.profileId, cursor.value.id);
		games[key] = storedGameToGame(cursor.value, key, {});
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
		achievements[key] = storedAchievementToAchievement(cursor.value, key);
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

export const updateGame = async (storedKey: string, game: StoredGame): Promise<string> => {
	const database = await openDatabase();
	const transaction = database.transaction('games', 'readwrite');
	const store = transaction.objectStore('games');
	await store.put(game, storedKey);
	await transaction.done;
	return storedKey;
};

export const storeAchievement = async (game: Game, achievement: StoredAchievement): Promise<string> => {
	const database = await openDatabase();
	const transaction = database.transaction('achievements', 'readwrite');
	const store = transaction.objectStore('achievements');

	const key = createAchievementKey(game.profileId, game.id, achievement.id);

	await store.put(achievement, key);

	await transaction.done;

	return key;
};

export const deleteGamesForProfile = async (profile: Profile): Promise<void> => {
	const database = await openDatabase();
	const transaction = database.transaction('games', 'readwrite');
	const filter = IDBKeyRange.only(profile.profileId);
	let cursor = await transaction.store.index('profileId').openKeyCursor(filter);
	while (cursor) {
		transaction.store.delete(cursor.primaryKey);
		cursor = await cursor.continue();
	}
	await transaction.done;
};

export const deleteGamesAchievementsForProfile = async (profile: Profile): Promise<void> => {
	const database = await openDatabase();
	const transaction = database.transaction('achievements', 'readwrite');
	const filter = IDBKeyRange.only(profile.profileId);
	let cursor = await transaction.store.index('profileId').openKeyCursor(filter);
	while (cursor) {
		transaction.store.delete(cursor.primaryKey);
		cursor = await cursor.continue();
	}
	await transaction.done;
};
