export interface StoredGame {
    id: number;
    name: string;
    hidden: boolean;
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
}

export interface Game extends StoredGame {
    achievements: StoredAchievement[];
}

export interface Profile {
    profileId: string;
}
export type Profiles = Profile[];