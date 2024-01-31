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

export interface Achievement extends StoredAchievement, LoadedStoredAchievement {}
export type Achievements = Record<string, Achievement>;

export const createAchievementKey = (profileId: string, id: number, achievementId: string): string => {
    const achievementIdFiltered = achievementId.toLowerCase().split(' ').join('-');
    return profileId + '-' + id + '-' + achievementIdFiltered;
};

export const createStoredAchievement = (
    id: string,
    name: string,
    description: string,
    completed: boolean,
    unlockTime: number,
    iconUrl: string,
    grayIconUrl: string,
    hidden: boolean,
    profileId: string,
    gameId: number
): StoredAchievement => {
    return {
        id,
        name,
        description,
        completed,
        unlockTime,
        iconUrl,
        grayIconUrl,
        hidden,
        profileId,
        gameId
    };
};

export const storedAchievementToAchievement = (stored: StoredAchievement, key: string): Achievement => {
    return Object.assign<StoredAchievement, LoadedStoredAchievement>(stored, {storedKey: key});
}
