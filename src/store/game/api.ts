import {getJsonFromApiWithRetry} from "@lib/util";
import {Game} from "@store/game/game";
import {Profile} from "@store/application/profile";

interface GameResponse {
    id: number;
    name: string;
}
type GamesResponse = GameResponse[];

interface AchievementResponse {
    id: string,
    name: string;
    description: string;
    completed: boolean;
    grayIconUrl: string;
    iconUrl: string;
    hidden: boolean;
    unlockTime: number;
}
type AchievementsResponse = AchievementResponse[];

export const loadGamesFromApi = async (profile: Profile): Promise<GamesResponse> => {
    const url = import.meta.env.VITE_API_URL + `/steam/${profile.profileId}/games`;
    return getJsonFromApiWithRetry<GamesResponse>(url);
};

export const loadAchievementsForGame = async (profile: Profile, game: Game): Promise<AchievementsResponse> => {
    const url = import.meta.env.VITE_API_URL + `/steam/${profile.profileId}/games/${game.id}`;
    return getJsonFromApiWithRetry<AchievementsResponse>(url);
};
