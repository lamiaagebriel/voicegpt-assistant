export interface SpeechRecognitionResult {
    transcript: string;
    confidence: number;
}
export interface SpeechRecognitionOptions {
    continuous?: boolean;
    lang?: string;
    interimResults?: boolean;
    maxAlternatives?: number;
}
export declare const createSpeechRecognition: ({ onResult, onError, options, }: {
    onResult: (result: SpeechRecognitionResult) => void;
    onError: (error: any) => void;
    options?: SpeechRecognitionOptions;
}) => any;
