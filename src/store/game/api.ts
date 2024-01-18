import {Game, Profile} from "@store/types";

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

//https://cdn.akamai.steamstatic.com/steam/apps/50/library_hero.jpg - Hero Url
//https://cdn.cloudflare.steamstatic.com/steam/apps/50/logo.png - Logo Url

export const loadGamesFromApi = async (profile: Profile): Promise<GamesResponse> => {
    const url = import.meta.env.VITE_API_URL + `/steam/${profile.profileId}/games`;
    return getJsonFromApiWithRetry(url);
};


export const loadAchievementsForGame = async (profile: Profile, game: Game): Promise<AchievementsResponse> => {
    const url = import.meta.env.VITE_API_URL + `/steam/${profile.profileId}/games/${game.id}`;
    return getJsonFromApiWithRetry(url);
};

const getJsonFromApiWithRetry = async <T>(url: string): Promise<T> => {
    const wait = (seconds: number): Promise<void> => {
        return new Promise((resolve) => window.setTimeout(resolve, seconds));
    };

    return new Promise<T>(async (resolve, reject) => {
        let response = await window.fetch(url);
        while (response.status === 429) {
            const secondsToWait = Number.parseInt(response.headers.get('Retry-After') ?? '0') * 1000;
            await wait(secondsToWait);
            response = await window.fetch(url);
        }
        if (response.ok) {
            resolve(await response.json());
        }
        reject('Failed to load api');
    });
};
