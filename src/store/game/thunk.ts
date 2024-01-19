import {AppDispatch, AppThunk} from "@store/index";
import {RootStateHook} from "@store/rootReducer";
import {
    Achievement,
    Achievements,
    Game,
    Games,
    LoadedGameProperties,
    LoadedStoredAchievement,
    Profile,
    StoredAchievement,
    StoredGame
} from "@store/types";

import {
    doesProfileHaveAnyGames,
    loadGamesFromStorage,
    storeGame,
    storeAchievement,
    loadAchievementsFromStorage
} from "@store/game/database";
import {loadGamesFromApi, loadAchievementsForGame} from "@store/game/api";
import {addAchievementToGame, addGame, removeGames, setLoading} from "@store/game/gameSlice";
import {wait} from "@lib/util";

export const initialiseGamesThunk = (
    profile: Profile
): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook,
) => {

    /**
     * Remove all the games
     */
    dispatch(removeGames());

    const doesProfileHaveStoredGames = await doesProfileHaveAnyGames(profile);
    /**
     * This is all going to be loaded from the cache so the API doesn't have to be called
     * when loading the page loads of times
     */
    if (doesProfileHaveStoredGames) {
        const games: Games = await loadGamesFromStorage(profile);
        for (const game of Object.values(games)) {
            dispatch(addGame(game));
            const achievements: Achievements = await loadAchievementsFromStorage(profile, game);
            for (const achievement of Object.values(achievements)) {
                dispatch(addAchievementToGame({game, achievement}));
            }
        }
        dispatch(setLoading(false));
        return;
    }

    for (const gameResponse of await loadGamesFromApi(profile)) {
        /**
         * Create a stored game instance
         */
        const storedGame: StoredGame = {
            id: gameResponse.id,
            name: gameResponse.name,
            profileId: profile.profileId,
            hidden: false
        };

        /**
         * Store the game and return the generated key we used to keep a cache of this
         */
        const storedKey = await storeGame(storedGame);

        /**
         * Now the game has been stored, lets merge the properties with the additional properties to
         * create the game object
         */
        const game: Game = Object.assign<StoredGame, LoadedGameProperties>(storedGame, {
            achievements: {},
            storedKey: storedKey
        });

        /**
         * Add a game to the state
         */
        dispatch(addGame(game));

        for (const achievementResponse of await loadAchievementsForGame(profile, game)) {

            await wait(3);

            const storedAchievement: StoredAchievement = {
                id: achievementResponse.id,
                name: achievementResponse.name,
                description: achievementResponse.description,
                completed: achievementResponse.completed,
                unlockTime: achievementResponse.unlockTime,
                iconUrl: achievementResponse.iconUrl,
                grayIconUrl: achievementResponse.grayIconUrl,
                hidden: achievementResponse.hidden,
                profileId: profile.profileId,
                gameId: game.id
            };

            const storedKey = await storeAchievement(game, storedAchievement);

            const achievement: Achievement = Object.assign<StoredAchievement, LoadedStoredAchievement>(storedAchievement, {
                storedKey: storedKey
            });

            /**
             * Add the achievement to the game
             */
            dispatch(addAchievementToGame({game, achievement}));
        }
    }

    dispatch(setLoading(false));
}