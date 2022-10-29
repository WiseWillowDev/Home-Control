export interface Model {
    model_id: string;
    path: string;
}

export interface Score {
    model_id: string;
    score: number;
    start_mili: number;
    end_mili: number;
}