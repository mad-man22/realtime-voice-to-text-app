
export interface Transcript {
    id: string;
    text: string;
    isFinal: boolean;
    timestamp: number;
}

export interface DeepgramConnectionStatus {
    connected: boolean;
    error: string | null;
}
