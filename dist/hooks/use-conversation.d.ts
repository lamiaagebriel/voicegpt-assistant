export declare const useConversation: (key: string) => {
    messages: SiriMessage[];
    updateMessages: (newMessages: SiriMessage[]) => void;
    clearMessages: () => void;
};
