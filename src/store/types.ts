export interface StoredGame {
    id: number;
    name: string;
    hidden: boolean;
    profileId: string;
}
export interface LoadedGameProperties {
    achievements: Achievement[];
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
}
export interface LoadedStoredAchievement {
    storedKey: string;
}

export interface Game extends StoredGame, LoadedGameProperties {}
export type Games = Game[];
export interface Achievement extends StoredAchievement, LoadedStoredAchievement {}

export interface Profile {
    profileId: string;
}
export type Profiles = Profile[];
export type PotentialProfile = Profile | undefined;
