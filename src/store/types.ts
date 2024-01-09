export interface StoredGame {
    steamId: string;
    name: string;
    hidden: boolean;
}

export interface StoredAchievement {
    steamId: string;
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