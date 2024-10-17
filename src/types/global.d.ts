declare global {
  type SiriMessage =
    | {
        role: "system" | "user" | "assistant";
        content: string;
      }
    | {
        role: "function";
        name: string;
        content: string;
      };
}

export {SiriMessage};