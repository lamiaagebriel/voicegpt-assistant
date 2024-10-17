"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSpeechRecognition = exports.createSpeechRecognition = void 0;
var react_1 = require("react");
var createSpeechRecognition = function (_a) {
    var onResult = _a.onResult, onError = _a.onError, _b = _a.options, options = _b === void 0 ? {} : _b;
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        throw new Error("Speech Recognition is not supported in this browser.");
    }
    var recognition = new SpeechRecognition();
    // Loop over provided options and apply them to the recognition object
    Object.keys(options).forEach(function (key) {
        if (key in recognition) {
            // @ts-ignore - We use `any` because types are dynamically determined
            recognition[key] = options[key];
        }
    });
    // Handle the result event
    recognition.onresult = function (event) {
        var lastResultIndex = event.results.length - 1;
        var transcript = event.results[lastResultIndex][0].transcript;
        var confidence = event.results[lastResultIndex][0].confidence;
        onResult({ transcript: transcript, confidence: confidence });
    };
    // Handle any errors
    recognition.onerror = onError;
    return recognition;
};
exports.createSpeechRecognition = createSpeechRecognition;
var useSpeechRecognition = function (_a) {
    var key = _a.key, recognitionOptions = _a.recognitionOptions;
    var _b = (0, react_1.useState)(false), listening = _b[0], setListening = _b[1];
    var _c = (0, react_1.useState)(false), open = _c[0], setOpen = _c[1];
    var _d = (0, react_1.useState)(null), transcript = _d[0], setTranscript = _d[1];
    var _e = (0, react_1.useState)(null), error = _e[0], setError = _e[1];
    var _f = (0, react_1.useState)(false), isRecording = _f[0], setIsRecording = _f[1]; // Indicates active recording state
    var recognitionRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (!open && key) {
            startPassiveListening();
        }
        if (open && listening)
            startListening(); // If no key, directly start listening
        return function () {
            var _a;
            (_a = recognitionRef.current) === null || _a === void 0 ? void 0 : _a.stop();
        };
    }, [listening, open]);
    // Passive listening to detect the key phrase
    var startPassiveListening = function () {
        var _a;
        recognitionRef.current = (0, exports.createSpeechRecognition)({
            onResult: function (_a) {
                var transcript = _a.transcript;
                if (key && transcript.toLowerCase().includes(key.toLowerCase())) {
                    setOpen(true); // Trigger opening based on key phrase
                }
                else {
                    setError("Please start your command with '".concat(key, "'. You said: ").concat(transcript));
                }
            },
            onError: function (error) {
                setError("Speech recognition error: ".concat(error.message));
                console.error("Speech recognition error:", error);
            },
            options: recognitionOptions, // Custom options passed into speech recognition
        });
        (_a = recognitionRef.current) === null || _a === void 0 ? void 0 : _a.start();
    };
    // Actively listen to capture speech input
    var startListening = function () {
        if (recognitionRef.current)
            recognitionRef.current.stop();
        recognitionRef.current = (0, exports.createSpeechRecognition)({
            onResult: function (_a) {
                var transcript = _a.transcript;
                setTranscript(transcript); // Capture the transcript
                setIsRecording(false); // Set recording state to false when done
            },
            onError: function (error) {
                setError("Speech recognition error: ".concat(error.message));
                console.error("Speech recognition error:", error);
                setIsRecording(false); // Stop recording on error
            },
            options: recognitionOptions,
        });
        recognitionRef.current.start();
        setIsRecording(true); // Indicate that recording has started
    };
    // Stop listening
    var stopListening = function () {
        if (recognitionRef.current)
            recognitionRef.current.stop();
        setListening(false);
        setIsRecording(false); // Stop recording
    };
    return {
        listening: listening, // Listening state
        setListening: setListening, // Method to manually set listening state
        open: open, // Whether the assistant has been triggered
        setOpen: setOpen,
        transcript: transcript, // The captured transcript
        setTranscript: setTranscript,
        error: error, // Any errors encountered
        setError: setError,
        isRecording: isRecording, // Whether recording is active
        startListening: startListening, // Start the active listening process
        stopListening: stopListening, // Stop listening
        startPassiveListening: startPassiveListening,
    };
};
exports.useSpeechRecognition = useSpeechRecognition;
