"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConversation = void 0;
var react_1 = require("react");
var useConversation = function (key) {
    var _a = (0, react_1.useState)([]), messages = _a[0], setMessages = _a[1];
    // Load messages from localStorage when the component mounts
    (0, react_1.useEffect)(function () {
        var loadMessages = function () {
            var storedMessages = localStorage.getItem(key);
            return storedMessages ? JSON.parse(storedMessages) : [];
        };
        setMessages(loadMessages());
    }, [key]);
    // Save messages to localStorage
    var updateMessages = function (newMessages) {
        setMessages(newMessages);
        localStorage.setItem(key, JSON.stringify(newMessages));
    };
    // Clear messages from localStorage
    var clearMessages = function () {
        setMessages([]);
        localStorage.removeItem(key);
    };
    return {
        messages: messages,
        updateMessages: updateMessages,
        clearMessages: clearMessages,
    };
};
exports.useConversation = useConversation;
