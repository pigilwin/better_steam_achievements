import {AppDispatch, AppThunk} from "@store/index";
import {RootStateHook} from "@store/rootReducer";

import {
    doesProfileHaveAnyGames,
    loadAchievementsFromStorage,
    loadGamesFromStorage,
    storeAchievement,
    storeGame,
    updateGame
} from "@store/game/database";
import {loadAchievementsForGame, loadGamesFromApi} from "@store/game/api";
import {setGames, setGameProcessed} from "@store/game/gameSlice";
import {wait} from "@lib/util";
import {Profile} from "@store/application/profile";
import {createStoredGame, Games, gameToStoredGame, storedGameToGame} from "@store/game/game";
import {createStoredAchievement, storedAchievementToAchievement} from "@store/game/achievement";

export const initialiseGamesThunk = (
    profile: Profile
): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook,
) => {

    const doesProfileHaveStoredGames = await doesProfileHaveAnyGames(profile);
    /**
     * This is all going to be loaded from the cache so the API doesn't have to be called
     * when loading the page loads of times
     */
    if (doesProfileHaveStoredGames) {
        const games: Games = await loadGamesFromStorage(profile);
        let i = 1;
        for (const game of Object.values(games)) {
            game.achievements = await loadAchievementsFromStorage(profile, game);
            dispatch(setGameProcessed(i));
            i++;
        }
        dispatch(setGames(games));
        return;
    }

    const games: Games = {};
    let i = 1;
    const gamesResponse = await loadGamesFromApi(profile);
    for (const gameFromApi of gamesResponse) {
        /**
         * Create a stored game instance
         */
        const storedGame = createStoredGame(
            gameFromApi.id,
            gameFromApi.name,
            false,
            profile.profileId
        );

        /**
         * Store the game and return the generated key we used to keep a cache of this
         */
        const storedKey = await storeGame(storedGame);

        /**
         * Now the game has been stored, lets merge the properties with the additional properties to
         * create the game object
         */
        const game = storedGameToGame(storedGame, storedKey, {});

        /**
         * Save the game
         */
        games[game.storedKey] = game;

        /**
         * Add a game to the state
         */
        const achievementForGameResponse = await loadAchievementsForGame(profile, game);
        for (const achievementResponse of achievementForGameResponse) {

            await wait(3);

            const storedAchievement = createStoredAchievement(
                achievementResponse.id,
                achievementResponse.name,
                achievementResponse.description,
                achievementResponse.completed,
                achievementResponse.unlockTime,
                achievementResponse.iconUrl,
                achievementResponse.grayIconUrl,
                achievementResponse.hidden,
                profile.profileId,
                game.id
            );

            const storedKey = await storeAchievement(game, storedAchievement);
            const achievement = storedAchievementToAchievement(storedAchievement, storedKey);
            /**
             * Add the achievement to the game
             */
            games[game.storedKey].achievements[achievement.storedKey] = achievement;
        }

        const gameWithAchievements = games[game.storedKey];
        if (Object.keys(gameWithAchievements.achievements).length === 0) {
            const storedGame = gameToStoredGame(game);
            storedGame.hidden = true;
            await updateGame(gameWithAchievements.storedKey, storedGame);
            gameWithAchievements.hidden = true;
        }

        dispatch(setGameProcessed(i));

        i++;
    }

    dispatch(setGames(games));
}