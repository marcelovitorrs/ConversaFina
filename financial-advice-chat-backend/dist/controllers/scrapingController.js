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
exports.listScrapedData = exports.runAndSaveGuias = exports.runAndSaveRendaFixa = exports.runAndSaveFundosImobiliarios = exports.runAndSaveFundosDeInvestimento = exports.runAndSaveDividendos = void 0;
const scraping_1 = require("../scraping");
const scrapingService_1 = require("../services/scrapingService");
const fileService_1 = require("../services/fileService");
const zod_1 = require("zod");
const collectionSchema = zod_1.z.enum([
    "dividendos",
    "fundos_de_investimento",
    "fundos_imobiliarios",
    "renda_fixa",
    "guias",
]);
const runAndSaveDividendos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dividendos = yield (0, scraping_1.runScrapingForDividendos)();
        if (!Array.isArray(dividendos)) {
            return res.status(500).send("Erro: dados de scraping inválidos.");
        }
        yield (0, scrapingService_1.saveScrapedData)(dividendos, "dividendos");
        (0, fileService_1.saveDatasetToFile)(dividendos, "dividendos_dataset.json");
        res
            .status(200)
            .send("Scraping de dividendos executado e dados salvos com sucesso.");
    }
    catch (error) {
        console.error("Erro ao executar scraping de dividendos:", error);
        res.status(500).send("Erro ao executar scraping de dividendos.");
    }
});
exports.runAndSaveDividendos = runAndSaveDividendos;
const runAndSaveFundosDeInvestimento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fundosInvestimento = yield (0, scraping_1.runScrapingForFundosDeInvestimento)();
        if (!Array.isArray(fundosInvestimento)) {
            return res.status(500).send("Erro: dados de scraping inválidos.");
        }
        yield (0, scrapingService_1.saveScrapedData)(fundosInvestimento, "fundos_de_investimento");
        (0, fileService_1.saveDatasetToFile)(fundosInvestimento, "fundos_de_investimento_dataset.json");
        res
            .status(200)
            .send("Scraping de fundos de investimento executado e dados salvos com sucesso.");
    }
    catch (error) {
        console.error("Erro ao executar scraping de fundos de investimento:", error);
        res
            .status(500)
            .send("Erro ao executar scraping de fundos de investimento.");
    }
});
exports.runAndSaveFundosDeInvestimento = runAndSaveFundosDeInvestimento;
const runAndSaveFundosImobiliarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fundosImobiliarios = yield (0, scraping_1.runScrapingForFundosImobiliarios)();
        if (!Array.isArray(fundosImobiliarios)) {
            return res.status(500).send("Erro: dados de scraping inválidos.");
        }
        yield (0, scrapingService_1.saveScrapedData)(fundosImobiliarios, "fundos_imobiliarios");
        (0, fileService_1.saveDatasetToFile)(fundosImobiliarios, "fundos_imobiliarios_dataset.json");
        res
            .status(200)
            .send("Scraping de fundos imobiliários executado e dados salvos com sucesso.");
    }
    catch (error) {
        console.error("Erro ao executar scraping de fundos imobiliários:", error);
        res.status(500).send("Erro ao executar scraping de fundos imobiliários.");
    }
});
exports.runAndSaveFundosImobiliarios = runAndSaveFundosImobiliarios;
const runAndSaveRendaFixa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rendaFixa = yield (0, scraping_1.runScrapingForRendaFixa)();
        if (!Array.isArray(rendaFixa)) {
            return res.status(500).send("Erro: dados de scraping inválidos.");
        }
        yield (0, scrapingService_1.saveScrapedData)(rendaFixa, "renda_fixa");
        (0, fileService_1.saveDatasetToFile)(rendaFixa, "renda_fixa_dataset.json");
        res
            .status(200)
            .send("Scraping de renda fixa executado e dados salvos com sucesso.");
    }
    catch (error) {
        console.error("Erro ao executar scraping de renda fixa:", error);
        res.status(500).send("Erro ao executar scraping de renda fixa.");
    }
});
exports.runAndSaveRendaFixa = runAndSaveRendaFixa;
const runAndSaveGuias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const guias = yield (0, scraping_1.runScrapingForGuias)();
        if (!Array.isArray(guias)) {
            return res.status(500).send("Erro: dados de scraping inválidos.");
        }
        yield (0, scrapingService_1.saveScrapedData)(guias, "guias");
        (0, fileService_1.saveDatasetToFile)(guias, "guias_dataset.json");
        res
            .status(200)
            .send("Scraping de guias executado e dados salvos com sucesso.");
    }
    catch (error) {
        console.error("Erro ao executar scraping de guias:", error);
        res.status(500).send("Erro ao executar scraping de guias.");
    }
});
exports.runAndSaveGuias = runAndSaveGuias;
const listScrapedData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collectionName = req.params.collection;
        const validationResult = collectionSchema.safeParse(collectionName);
        if (!validationResult.success) {
            return res.status(400).send("Erro: nome da coleção inválido.");
        }
        const scrapedData = yield (0, scrapingService_1.getScrapedData)(collectionName);
        if (!scrapedData || scrapedData.length === 0) {
            return res
                .status(404)
                .send(`Nenhum dado encontrado na coleção: ${collectionName}.`);
        }
        res.status(200).json(scrapedData);
    }
    catch (error) {
        console.error(`Erro ao listar dados de ${req.params.collection}:`, error);
        res.status(500).send(`Erro ao listar dados de ${req.params.collection}.`);
    }
});
exports.listScrapedData = listScrapedData;
