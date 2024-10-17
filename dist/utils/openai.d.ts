import { ClientOptions, OpenAI as OpenAIConfigure } from "openai";
import { ChatCompletionCreateParams } from "openai/resources/index";
export declare const OpenAI: ({ configure, functions, }: {
    configure?: ClientOptions;
    functions?: (ChatCompletionCreateParams.Function & {
        trigger: (data: {
            args?: any;
            response?: any;
        } | void) => any;
    })[];
}) => {
    openai: OpenAIConfigure;
    callChatGPTWithFunctions: ({ userMessage, existingMessages, systemRoleContent, args, }: {
        userMessage: string;
        existingMessages?: SiriMessage[];
        systemRoleContent?: string;
        args?: any;
    }) => Promise<SiriMessage[]>;
};
