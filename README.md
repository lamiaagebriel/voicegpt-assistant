# My Speech Recognition Package

A simple speech recognition utility that supports both JavaScript and TypeScript.

## Installation

```npm
npm install voicegpt-assistant
``` 

## Usage

### JavaScript

```javascript
const { createSpeechRecognition } = require('voicegpt-assistant');

const recognition = createSpeechRecognition({
  onResult: (result) => console.log(result),
  onError: (error) => console.error(error),
  options: { lang: 'en-US' }
});

recognition.start();
```


### TypeScript

```typescript
import { createSpeechRecognition } from 'voicegpt-assistant';

const recognition = createSpeechRecognition({
  onResult: (result) => console.log(result),
  onError: (error) => console.error(error),
  options: { lang: 'en-US' }
});

recognition.start();

```
 
