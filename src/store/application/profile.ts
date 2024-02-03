export interface Profile {
    profileId: string;
    howManyColumnsToShow: number;
}
export type Profiles = Profile[];
export type PotentialProfile = Profile | null;
