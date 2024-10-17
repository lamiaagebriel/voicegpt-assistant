declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }

  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
  }
 
  interface SpeechRecognitionErrorEvent extends Event {
    results: any;
    error: string;
  }
}

export {Window, SpeechRecognitionEvent,SpeechRecognitionErrorEvent };
