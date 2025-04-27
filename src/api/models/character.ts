export interface Character {
    id: string;
    name: string;
    side: ForceSide;
    createdTimestamp: number;
    description: string;
}

export interface ForceSide {
    name: 'DARK' | 'LIGHT';
    power: string;
    midichlorian: number;
}