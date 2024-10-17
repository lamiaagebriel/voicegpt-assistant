# VoiceGPT Assistant

## Installation

To install the package, run:

```bash
npm install voicegpt-assistant
```

## Usage

### Importing Hooks

You can import the necessary hooks from the `voicegpt-assistant` package like this:

```typescript
import { useConversation, useListening } from 'voicegpt-assistant';
```

### Example of Voice Interaction

Here’s an example of how to implement a voice interaction feature using the `useConversation` and `useListening` hooks:

```typescript
import { useConversation, useSpeechRecognition } from 'voicegpt-assistant'; 

const App = () => {
  const { messages, updateMessages, clearMessages } = useConversation("your-key");
  
  const {
    listening,
    setListening,
    transcript,
    setTranscript,
    error,
    setError,
  } = useSpeechRecognition({
    key: "Hi Siri", // Optional: Trigger phrase for voice recognition
    recognitionOptions: {
      lang: "en-US", // Language for recognition
      continuous: true, // Keep listening continuously
    },
  });

  // Update the message when a new transcript is received
  useEffect(() => {
    if (transcript) {
      updateMessages((prev) => [...prev, { content: transcript, role: 'user' }]);
      setTranscript(null);
    }
    if (error) {
      console.error(error);
      setError(null);
    }
  }, [transcript, error]);

  return (
    <div>
      <button onClick={() => setListening((prev) => !prev)}>
        {listening ? "Stop Listening" : "Start Listening"}
      </button>
      <button onClick={clearMessages}>Clear History</button>
      <div>
        {messages.map((msg, index) => (
          <p key={index} className={msg.role === 'user' ? 'user-message' : 'ai-message'}>
            {msg.content}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
```

## Features

- **Voice Interaction**: Users can communicate with the assistant using their voice.
- **Custom Functions**: Easily extend the functionality with custom API interactions.
- **Chat History**: Keep track of the conversation messages.

## Contributing

If you'd like to contribute, please fork the repository and create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please reach out:

- GitHub: [lamiaagebriel](https://github.com/lamiaagebriel)
- Email: lamiaadev@gmail.com
