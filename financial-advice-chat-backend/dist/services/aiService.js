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
exports.getAIResponse = void 0;
const axios_1 = __importDefault(require("axios"));
const getAIResponse = (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post("https://ollama.com/api/tim2nearfield/finance", {
            prompt: message,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data.reply;
    }
    catch (error) {
        console.error("Erro ao obter resposta da IA:", error);
        throw new Error("Falha ao conectar com o serviço de IA.");
    }
});
exports.getAIResponse = getAIResponse;
