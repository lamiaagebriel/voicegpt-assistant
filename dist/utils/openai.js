"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAI = void 0;
var openai_1 = require("openai");
__exportStar(require("openai"), exports);
var OpenAI = function (_a) {
    var configure = _a.configure, functions = _a.functions;
    var openai = new openai_1.OpenAI(__assign({}, configure));
    // Main function to handle OpenAI requests with functions
    var callChatGPTWithFunctions = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var messages, chat, wantsToUseFunction, assistantMessage, functionCall_1, selectedFunction, response, content, error_1;
        var _c, _d, _e, _f;
        var userMessage = _b.userMessage, _g = _b.existingMessages, existingMessages = _g === void 0 ? [] : _g, _h = _b.systemRoleContent, systemRoleContent = _h === void 0 ? "Determine what the user needs to do. If the user is only questioning, answer simply. If the user wants to perform an action & its function is provided, do it. Otherwise, tell them that you as an AI can't do the specific action they want but guide them." : _h, args = _b.args;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    _j.trys.push([0, 6, , 7]);
                    messages = __spreadArray(__spreadArray([], existingMessages, true), [
                        { role: "user", content: userMessage },
                    ], false);
                    return [4 /*yield*/, openai.chat.completions.create({
                            model: "gpt-3.5-turbo",
                            messages: __spreadArray([
                                {
                                    role: "system",
                                    content: systemRoleContent,
                                }
                            ], messages, true),
                            functions: functions === null || functions === void 0 ? void 0 : functions.map(function (_a) {
                                var trigger = _a.trigger, e = __rest(_a, ["trigger"]);
                                return (__assign({}, e));
                            }),
                            function_call: "auto",
                        })];
                case 1:
                    chat = _j.sent();
                    wantsToUseFunction = chat.choices[0].finish_reason === "function_call";
                    assistantMessage = { role: "assistant", content: "" };
                    if (!wantsToUseFunction) return [3 /*break*/, 4];
                    functionCall_1 = (_c = chat.choices[0].message) === null || _c === void 0 ? void 0 : _c.function_call;
                    selectedFunction = functions === null || functions === void 0 ? void 0 : functions.find(function (func) { return func.name === (functionCall_1 === null || functionCall_1 === void 0 ? void 0 : functionCall_1.name); });
                    if (!(selectedFunction &&
                        (functionCall_1 === null || functionCall_1 === void 0 ? void 0 : functionCall_1.name) &&
                        selectedFunction.trigger)) return [3 /*break*/, 3];
                    response = JSON.parse(functionCall_1 === null || functionCall_1 === void 0 ? void 0 : functionCall_1.arguments);
                    return [4 /*yield*/, (selectedFunction === null || selectedFunction === void 0 ? void 0 : selectedFunction.trigger({
                            response: response,
                            args: args,
                        }))];
                case 2:
                    content = _j.sent();
                    assistantMessage = {
                        role: "function",
                        name: functionCall_1 === null || functionCall_1 === void 0 ? void 0 : functionCall_1.name,
                        content: content,
                    };
                    _j.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    assistantMessage = {
                        role: "assistant",
                        content: (_e = (_d = chat.choices[0].message) === null || _d === void 0 ? void 0 : _d.content) !== null && _e !== void 0 ? _e : "No response",
                    };
                    _j.label = 5;
                case 5: 
                // Step 5: Append the assistant's response to the conversation history
                return [2 /*return*/, __spreadArray(__spreadArray([], messages, true), [assistantMessage], false)];
                case 6:
                    error_1 = _j.sent();
                    console.error("Error calling ChatGPT:", error_1);
                    throw new Error((_f = error_1 === null || error_1 === void 0 ? void 0 : error_1["message"]) !== null && _f !== void 0 ? _f : "Something went wrong with the API request.");
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return { openai: openai, callChatGPTWithFunctions: callChatGPTWithFunctions };
};
exports.OpenAI = OpenAI;
