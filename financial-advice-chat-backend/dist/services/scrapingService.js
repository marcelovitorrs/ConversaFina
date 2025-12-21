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
exports.getScrapedData = exports.saveScrapedData = void 0;
const firebase_1 = require("../config/firebase");
const saveScrapedData = (articles, collectionName) => __awaiter(void 0, void 0, void 0, function* () {
    const collectionRef = firebase_1.db.collection(collectionName);
    const batch = firebase_1.db.batch();
    for (const article of articles) {
        // Verifica se o artigo com o mesmo título já existe no banco
        const existingArticleSnapshot = yield collectionRef
            .where("title", "==", article.title)
            .get();
        if (!existingArticleSnapshot.empty) {
            console.log(`Artigo com o título "${article.title}" já existe. Ignorando...`);
            continue; // Ignora se o título já existir
        }
        const docRef = firebase_1.db.collection(collectionName).doc();
        batch.set(docRef, {
            title: article.title,
            link: article.link,
            content: article.content || "",
            scrapedAt: new Date(),
        });
    }
    yield batch.commit();
    console.log(`Dados de scraping salvos na coleção ${collectionName} com sucesso.`);
});
exports.saveScrapedData = saveScrapedData;
const getScrapedData = (collectionName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionRef = firebase_1.db.collection(collectionName);
        const snapshot = yield collectionRef.get();
        if (snapshot.empty) {
            console.log(`Nenhum dado encontrado na coleção: ${collectionName}`);
            return [];
        }
        const scrapedData = snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        return scrapedData;
    }
    catch (error) {
        console.error(`Erro ao obter dados da coleção ${collectionName}:`, error);
        throw new Error(`Erro ao obter dados da coleção ${collectionName}`);
    }
});
exports.getScrapedData = getScrapedData;
