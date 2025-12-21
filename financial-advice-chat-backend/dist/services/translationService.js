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
exports.translateTextToPortuguese = void 0;
const axios_1 = __importDefault(require("axios"));
const envConfig_1 = require("../config/envConfig");
const splitText = (text, maxLength) => {
    const regex = new RegExp(`(.|[\r\n]){1,${maxLength}}`, "g");
    return text.match(regex) || [];
};
const translateWithDeepL = (text) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const response = yield axios_1.default.post("https://api-free.deepl.com/v2/translate", new URLSearchParams({
            auth_key: envConfig_1.config.deeplApiKey,
            text: text,
            target_lang: "PT",
        }), {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        return response.data.translations[0].text;
    }
    catch (error) {
        console.error("Erro ao traduzir com DeepL:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        throw new Error("Falha ao traduzir com DeepL.");
    }
});
const translateWithLibreTranslate = (text) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const textBlocks = splitText(text, 2000);
    const translatedBlocks = [];
    try {
        for (const block of textBlocks) {
            const response = yield axios_1.default.post("https://libretranslate.de/translate", {
                q: block,
                source: "en",
                target: "pt",
                format: "text",
            }, {
                headers: { "Content-Type": "application/json" },
            });
            translatedBlocks.push(response.data.translatedText);
        }
        return translatedBlocks.join(" ");
    }
    catch (error) {
        console.error("Erro ao traduzir com LibreTranslate:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        throw new Error("Falha ao traduzir com LibreTranslate.");
    }
});
const translateTextToPortuguese = (text) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield translateWithDeepL(text);
    }
    catch (deeplError) {
        console.warn("Tentando tradução com API alternativa...");
        try {
            return yield translateWithLibreTranslate(text);
        }
        catch (libreError) {
            console.error("Erro ao traduzir com ambas as APIs. Retornando o texto original.");
            return text;
        }
    }
});
exports.translateTextToPortuguese = translateTextToPortuguese;
