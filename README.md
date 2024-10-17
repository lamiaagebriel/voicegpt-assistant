
# VoiceGPT Assistant

The `voicegpt-assistant` package integrates OpenAI's API with custom functions, enabling both voice and text-based interaction with an AI assistant. This guide will walk you through the setup and usage of the assistant within your application.

## Installation

To install the package, run the following command:

```bash
npm install voicegpt-assistant
```

## Usage

### Example

Here’s how you can implement a basic voice interaction and chat interface using the `useConversation` and `useSpeechRecognition` hooks:

```typescript
// components/siri.tsx

"use client";

import { useEffect, useState } from "react";
import { useConversation, useSpeechRecognition } from "voicegpt-assistant";

type SiriProps = {};

export function Siri({}: SiriProps) {
  // State for managing the message input and loading status
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Hooks from voicegpt-assistant for handling conversation and voice recognition
  const { messages, updateMessages, clearMessages } = useConversation("siriMessages");
  const {
    listening,
    setListening,
    transcript,
    setTranscript,
    error,
    setError,
  } = useSpeechRecognition({
    key: "Hi Siri", // Optional: Key phrase to activate voice recognition
    recognitionOptions: {
      lang: "en-US", // Custom language setting
      continuous: true, // Listen continuously
    },
  });

  // Effect to update the message input when a new voice transcript is received
  useEffect(() => {
    if (transcript) {
      setMessage((prevMessage) => prevMessage + " " + transcript);
      setTranscript(null);
    }

    // Handle errors in speech recognition
    if (error) {
      console.error("Speech recognition error:", error);
      setError(null);
    }
  }, [transcript, error]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return; // Prevent sending empty messages

    setLoading(true);
    // Call OpenAI with the message and update the conversation
    const updatedMessages = await AI.callChatGPTWithFunctions({
      userMessage: message,
      existingMessages: messages,
      args: {}, // Define any additional arguments here
    });

    if (updatedMessages) {
      updateMessages(updatedMessages);
      setMessage(""); // Clear the message input after sending
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Chat with AI</h1>

      {/* Display the conversation history */}
      <div className="container h-60 w-full overflow-y-auto border py-4">
        {messages?.length ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`my-4 flex items-center ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <p
                className={`w-fit rounded-md px-2 py-1 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {message.content}
              </p>
            </div>
          ))
        ) : (
          <div className="flex h-full flex-1 items-center justify-center">
            <p>No Messages Yet</p>
          </div>
        )}
      </div>

      {/* Message input and controls */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message AI..."
          disabled={loading || listening}
          className="min-h-20 w-full"
        />
        <div>
          <button type="button" onClick={clearMessages} disabled={loading || listening}>
            Clear History
          </button>
          <button type="button" onClick={() => setListening((prev) => !prev)} disabled={loading}>
            {listening ? "Stop Listening" : "Start Listening"}
          </button>
          <button type="submit" disabled={loading || listening}>
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
```

## Features

- **Voice Interaction**: Enables users to communicate with the AI via voice commands.
- **Custom Functions**: Easily extendable with custom API interactions.
- **Chat History**: Maintains a log of the conversation.

## Contributing

To contribute, please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For questions or feedback, feel free to reach out:

- GitHub: [lamiaagebriel](https://github.com/lamiaagebriel)
- Email: lamiaadev@gmail.com
