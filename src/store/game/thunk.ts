import {AppDispatch, AppThunk} from "@store/index";
import {RootStateHook} from "@store/rootReducer";
import {
    Achievement,
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
    loadAchievementsFromStorage,
    loadGamesFromStorage,
    storeAchievement,
    storeGame
} from "@store/game/database";
import {loadAchievementsForGame, loadGamesFromApi} from "@store/game/api";
import {setGames, removeGames, setGameProcessed} from "@store/game/gameSlice";
import {wait} from "@lib/util";

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
        const storedGame: StoredGame = {
            id: gameFromApi.id,
            name: gameFromApi.name,
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

        games[game.storedKey] = game;

        /**
         * Add a game to the state
         */
        const achievementForGameResponse = await loadAchievementsForGame(profile, game);
        for (const achievementResponse of achievementForGameResponse) {

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
            games[game.storedKey].achievements[achievement.storedKey] = achievement;
        }

        dispatch(setGameProcessed(i));

        i++;
    }

    dispatch(setGames(games));
}