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
exports.runScrapingForGuias = exports.runScrapingForRendaFixa = exports.runScrapingForFundosImobiliarios = exports.runScrapingForFundosDeInvestimento = exports.runScrapingForDividendos = void 0;
const infoMoneyScraperDividendos_1 = require("./scrapers/infoMoney/dividendos/infoMoneyScraperDividendos");
const infoMoneyScraperFundosAcoes_1 = require("./scrapers/infoMoney/fundosDeInvestimento/infoMoneyScraperFundosAcoes");
const infoMoneyScraperFundosDePrevidencia_1 = require("./scrapers/infoMoney/fundosDeInvestimento/infoMoneyScraperFundosDePrevidencia");
const infoMoneyScraperFundosMultimercado_1 = require("./scrapers/infoMoney/fundosDeInvestimento/infoMoneyScraperFundosMultimercado");
const infoMoneyScraperFundosRendaFixa_1 = require("./scrapers/infoMoney/fundosDeInvestimento/infoMoneyScraperFundosRendaFixa");
const infoMoneyScraperFundoImobiliario_1 = require("./scrapers/infoMoney/fundosImobiliarios/infoMoneyScraperFundoImobiliario");
const infomoneyScraperCarreira_1 = require("./scrapers/infoMoney/infomoneyScraperCarreira");
const infoMoneyScraperGuiasFinancasPessoais_1 = require("./scrapers/infoMoney/infoMoneyScraperGuiasFinancasPessoais");
const infoMoneyScraperGuiasInvestimentos_1 = require("./scrapers/infoMoney/infoMoneyScraperGuiasInvestimentos");
const infoMoneyScraperDebentures_1 = require("./scrapers/infoMoney/rendaFixa/infoMoneyScraperDebentures");
const infoMoneyScraperRendaFixaCDB_1 = require("./scrapers/infoMoney/rendaFixa/infoMoneyScraperRendaFixaCDB");
const infoMoneyScraperRendaFixaLCA_1 = require("./scrapers/infoMoney/rendaFixa/infoMoneyScraperRendaFixaLCA");
const infoMoneyScraperRendaFixaLCI_1 = require("./scrapers/infoMoney/rendaFixa/infoMoneyScraperRendaFixaLCI");
const infoMoneyScraperRendaFixaTesouroDireto_1 = require("./scrapers/infoMoney/rendaFixa/infoMoneyScraperRendaFixaTesouroDireto");
const runScrapingForDividendos = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, infoMoneyScraperDividendos_1.scrapeInfomoneyDividendos)();
    return data;
});
exports.runScrapingForDividendos = runScrapingForDividendos;
const runScrapingForFundosDeInvestimento = () => __awaiter(void 0, void 0, void 0, function* () {
    const fundosAcoesData = yield (0, infoMoneyScraperFundosAcoes_1.scrapeInfomoneyFundosAcoes)();
    const fundosPrevidenciaData = yield (0, infoMoneyScraperFundosDePrevidencia_1.scrapeInfomoneyFundosDePrevidencia)();
    const fundosMultimercadoData = yield (0, infoMoneyScraperFundosMultimercado_1.scrapeInfomoneyFundosMultimercado)();
    const fundosRendaFixaData = yield (0, infoMoneyScraperFundosRendaFixa_1.scrapeInfomoneyFundosRendaFixa)();
    return [
        ...fundosAcoesData,
        ...fundosPrevidenciaData,
        ...fundosMultimercadoData,
        ...fundosRendaFixaData,
    ];
});
exports.runScrapingForFundosDeInvestimento = runScrapingForFundosDeInvestimento;
const runScrapingForFundosImobiliarios = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, infoMoneyScraperFundoImobiliario_1.scrapeInfomoneyFundosImobiliarios)();
    return data;
});
exports.runScrapingForFundosImobiliarios = runScrapingForFundosImobiliarios;
const runScrapingForRendaFixa = () => __awaiter(void 0, void 0, void 0, function* () {
    const debenturesData = yield (0, infoMoneyScraperDebentures_1.scrapeInfomoneyDebentures)();
    const cdbData = yield (0, infoMoneyScraperRendaFixaCDB_1.scrapeInfomoneyCDB)();
    const lcaData = yield (0, infoMoneyScraperRendaFixaLCA_1.scrapeInfomoneyLCA)();
    const lciData = yield (0, infoMoneyScraperRendaFixaLCI_1.scrapeInfomoneyLCI)();
    const tesouroDiretoData = yield (0, infoMoneyScraperRendaFixaTesouroDireto_1.scrapeInfomoneyTesouroDireto)();
    return [
        ...debenturesData,
        ...cdbData,
        ...lcaData,
        ...lciData,
        ...tesouroDiretoData,
    ];
});
exports.runScrapingForRendaFixa = runScrapingForRendaFixa;
const runScrapingForGuias = () => __awaiter(void 0, void 0, void 0, function* () {
    const carreiraData = yield (0, infomoneyScraperCarreira_1.scrapeInfomoneyCarreira)();
    const guiasFinancasPessoaisData = yield (0, infoMoneyScraperGuiasFinancasPessoais_1.scrapeInfomoneyGuiaFinancasPessoais)();
    const guiasInvestimentosData = yield (0, infoMoneyScraperGuiasInvestimentos_1.scrapeInfomoneyGuiaInvestimentos)();
    return [
        ...carreiraData,
        ...guiasFinancasPessoaisData,
        ...guiasInvestimentosData,
    ];
});
exports.runScrapingForGuias = runScrapingForGuias;
