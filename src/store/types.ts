export interface StoredGame {
    steamId: number;
    name: string;
    hidden: boolean;
}

export interface StoredAchievement {
    steamId: number;
    name: string;
    description: string;
    completed: boolean;
    unlockTime: number;
    iconUrl: string;
    grayIconUrl: string;
    hidden: boolean;
}

export interface Game extends StoredGame {
    achievements: StoredAchievement[];
}

export interface Profile {
    profileId: string;
}