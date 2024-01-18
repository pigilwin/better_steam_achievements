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

import {doesProfileHaveAnyGames, storeGame, storeAchievement} from "@store/game/database";
import {loadGamesFromApi, loadAchievementsForGame} from "@store/game/api";
import {setGames} from "@store/game/gameSlice";

export const initialiseGames = (
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
        const games: Games = await loadGamesFromStorage();
        dispatch(setGames(games));
    }

    const gamesFromApi = await loadGamesFromApi(profile);
    const games: Games = [];


    for (const gameResponse of gamesFromApi) {
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
            achievements: [],
            storedKey: storedKey
        });

        for (const achievementResponse of await loadAchievementsForGame(profile, game)) {
            const storedAchievement: StoredAchievement = {
                id: achievementResponse.id,
                name: achievementResponse.name,
                description: achievementResponse.description,
                completed: achievementResponse.completed,
                unlockTime: achievementResponse.unlockTime,
                iconUrl: achievementResponse.iconUrl,
                grayIconUrl: achievementResponse.grayIconUrl,
                hidden: achievementResponse.hidden,
                profileId: profile.profileId
            };

            const storedKey = await storeAchievement(game, storedAchievement);

            const achievement: Achievement = Object.assign<StoredAchievement, LoadedStoredAchievement>(storedAchievement, {
                storedKey: storedKey
            });

            game.achievements.push(achievement);
        }
    }

    dispatch(setGames(games));
}