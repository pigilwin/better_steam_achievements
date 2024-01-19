export interface StoredGame {
    id: number;
    name: string;
    hidden: boolean;
    profileId: string;
}
export interface LoadedGameProperties {
    achievements: Achievements;
    storedKey: string;
}

export interface StoredAchievement {
    id: string;
    name: string;
    description: string;
    completed: boolean;
    unlockTime: number;
    iconUrl: string;
    grayIconUrl: string;
    hidden: boolean;
    profileId: string;
    gameId: number;
}
export interface LoadedStoredAchievement {
    storedKey: string;
}

export interface Game extends StoredGame, LoadedGameProperties {}
export type Games = Record<string, Game>;
export interface Achievement extends StoredAchievement, LoadedStoredAchievement {}
export type Achievements = Record<string, Achievement>;

export interface Profile {
    profileId: string;
}
export type Profiles = Profile[];
export type PotentialProfile = Profile | undefined;
