"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatByUserId = exports.addMessageToChat = exports.processFinanceModel = exports.processLlamaModel = void 0;
const axios_1 = __importDefault(require("axios"));
const firebase_1 = require("../config/firebase");
const chatSchema_1 = require("../models/chatSchema");
const translationService_1 = require("../services/translationService");
const userService_1 = require("./userService");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const processLlamaModel = (question) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post("https://conversafina.ddnsfree.com/ollama/api/chat", {
            model: "llama3.2:1b",
            messages: [{ role: "user", content: question }],
            stream: false,
        });
        return response.data.message.content.trim();
    }
    catch (error) {
        console.error("Erro ao chamar o LLM:", error);
        throw new Error("Falha ao conectar ao serviço de LLM.");
    }
});
exports.processLlamaModel = processLlamaModel;
const processFinanceModel = (question) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post("https://conversafina.ddnsfree.com/ollama/api/chat", {
            model: "0xroyce/Plutus-3B",
            messages: [{ role: "user", content: question }],
            stream: false,
        });
        console.log(response);
        const aiResponse = response.data.message.content.trim();
        const translatedResponse = yield (0, translationService_1.translateTextToPortuguese)(aiResponse);
        return translatedResponse;
    }
    catch (error) {
        console.error("Erro ao chamar o modelo tim2nearfield/finance:", error);
        throw new Error("Falha ao conectar ao serviço de LLM.");
    }
});
exports.processFinanceModel = processFinanceModel;
const addMessageToChat = (userId, question, answer) => __awaiter(void 0, void 0, void 0, function* () {
    const chatDoc = yield firebase_1.db.collection("chats").doc(userId).get();
    let chat;
    if (!chatDoc.exists) {
        console.log("Chat não encontrado, criando um novo chat para o usuário...");
        const user = yield (0, userService_1.getUserById)(userId);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }
        chat = {
            chatId: userId,
            userId: userId,
            profileType: user.profileType || "basic",
            messages: [],
            createdAt: firebase_admin_1.default.firestore.Timestamp.now().toDate(), // Corrigido para Timestamp
            updatedAt: firebase_admin_1.default.firestore.Timestamp.now().toDate(), // Corrigido para Timestamp
        };
        yield firebase_1.db.collection("chats").doc(userId).set(chat);
    }
    else {
        const chatData = chatDoc.data();
        if (!(chatData === null || chatData === void 0 ? void 0 : chatData.chatId) ||
            !(chatData === null || chatData === void 0 ? void 0 : chatData.userId) ||
            !(chatData === null || chatData === void 0 ? void 0 : chatData.profileType) ||
            !(chatData === null || chatData === void 0 ? void 0 : chatData.createdAt)) {
            throw new Error("Chat existente está incompleto. Verifique os campos obrigatórios.");
        }
        chat = chatSchema_1.chatSchema.parse(chatData);
    }
    const newMessage = {
        question,
        answer,
        createdAt: firebase_admin_1.default.firestore.Timestamp.now().toDate(),
    };
    chat.messages.push(newMessage);
    chat.updatedAt = firebase_admin_1.default.firestore.Timestamp.now().toDate();
    yield firebase_1.db.collection("chats").doc(userId).update(chat);
});
exports.addMessageToChat = addMessageToChat;
const getChatByUserId = (userId, limit, startAfter) => __awaiter(void 0, void 0, void 0, function* () {
    const chatDoc = yield firebase_1.db.collection("chats").doc(userId).get();
    if (!chatDoc.exists) {
        return { messages: [], nextPageToken: null };
    }
    const chatData = chatDoc.data();
    if (!(chatData === null || chatData === void 0 ? void 0 : chatData.chatId) ||
        !(chatData === null || chatData === void 0 ? void 0 : chatData.userId) ||
        !(chatData === null || chatData === void 0 ? void 0 : chatData.profileType) ||
        !(chatData === null || chatData === void 0 ? void 0 : chatData.createdAt)) {
        throw new Error("Chat existente está incompleto. Verifique os campos obrigatórios.");
    }
    const messages = chatData.messages || [];
    const messagesWithIsoDates = messages.map((msg) => {
        let createdAtDate;
        if (msg.createdAt instanceof firebase_admin_1.default.firestore.Timestamp) {
            createdAtDate = msg.createdAt.toDate();
        }
        else if (typeof msg.createdAt === "string") {
            createdAtDate = new Date(msg.createdAt);
        }
        else if (msg.createdAt
            ._seconds !== undefined &&
            msg.createdAt
                ._nanoseconds !== undefined) {
            const { _seconds, _nanoseconds } = msg.createdAt;
            createdAtDate = new Date(_seconds * 1000 + _nanoseconds / 1e6);
        }
        else {
            createdAtDate = new Date();
        }
        return Object.assign(Object.assign({}, msg), { createdAt: createdAtDate.toISOString() });
    });
    const sortedMessages = messagesWithIsoDates.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    let paginatedMessages;
    if (startAfter) {
        const startIndex = sortedMessages.findIndex((msg) => new Date(msg.createdAt).toISOString() === startAfter);
        paginatedMessages = sortedMessages.slice(startIndex + 1, startIndex + 1 + limit);
    }
    else {
        paginatedMessages = sortedMessages.slice(0, limit);
    }
    const nextPageToken = paginatedMessages.length === limit
        ? paginatedMessages[paginatedMessages.length - 1].createdAt
        : null;
    return { messages: paginatedMessages, nextPageToken };
});
exports.getChatByUserId = getChatByUserId;
