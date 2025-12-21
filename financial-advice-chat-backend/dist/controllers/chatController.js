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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatHistory = exports.addChatMessageFinance = exports.getFinancialLevelQuestions = void 0;
const chatService_1 = require("../services/chatService");
const userService_1 = require("../services/userService");
const getFinancialLevelQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prompt = `Elabore 6 perguntas enumeradas para avaliar se o nível de conhecimento financeiro de uma pessoa no Brasil é básico ou avançado. As perguntas devem ser de "Sim" ou "Não" e apresentadas no seguinte formato:
1. Pergunta?
Resposta: Sim ou Não

Não inclua explicações adicionais ou comentários.`;
        const aiResponse = yield (0, chatService_1.processLlamaModel)(prompt);
        res.json({ questions: aiResponse });
    }
    catch (error) {
        res.status(500).send(`Erro ao gerar perguntas: ${error}`);
    }
});
exports.getFinancialLevelQuestions = getFinancialLevelQuestions;
const addChatMessageFinance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.uid;
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).send("Pergunta não pode ser vazia.");
        }
        const user = yield (0, userService_1.getUserById)(userId);
        if (!user) {
            return res.status(404).send("Usuário não encontrado.");
        }
        const { profileType, income } = user;
        const limit = 5;
        const chatHistory = yield (0, chatService_1.getChatByUserId)(userId, limit, null);
        let context = `Estas são as últimas 5 perguntas feitas por mim, que tenho um perfil financeiro "${profileType}" e ganhos mensais de R$${income}:\n`;
        if (chatHistory && chatHistory.messages.length > 0) {
            const lastFiveQuestions = chatHistory.messages
                .map((message) => `Pergunta: ${message.question}`)
                .join("\n");
            context += lastFiveQuestions;
        }
        else {
            context += "Nenhum histórico disponível.\n";
        }
        context += `\nE esta é a pergunta feita agora por mim: ${question}. Responda de forma clara e objetiva apenas a ultima pergunta feita, levando em conta o que já foi perguntado, elabore a resposta de acordo com o nível informado do usuário.`;
        console.log(context);
        const aiResponse = yield (0, chatService_1.processFinanceModel)(context);
        console.log("Realizou a chamada para a IA");
        yield (0, chatService_1.addMessageToChat)(userId, question, aiResponse);
        res.json({ answer: aiResponse });
    }
    catch (error) {
        res.status(500).send(`Erro ao adicionar mensagem ao chat: ${error}`);
    }
});
exports.addChatMessageFinance = addChatMessageFinance;
const getChatHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.uid;
    const { limit = 10, startAfter } = req.query;
    console.log("Realizou get de History");
    try {
        const chat = yield (0, chatService_1.getChatByUserId)(userId, Number(limit), startAfter ? String(startAfter) : null);
        if (chat) {
            res.json(chat);
        }
        else {
            res.status(404).send("Histórico de chat não encontrado.");
        }
    }
    catch (error) {
        res.status(500).send("Erro ao recuperar histórico de chat.");
    }
});
exports.getChatHistory = getChatHistory;
