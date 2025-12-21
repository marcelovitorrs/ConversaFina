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
exports.testScraper = void 0;
const infoMoneyScraperDividendos_1 = require("./infoMoney/dividendos/infoMoneyScraperDividendos");
function testingScraper() {
    return __awaiter(this, void 0, void 0, function* () {
        const articles = yield (0, infoMoneyScraperDividendos_1.scrapeInfomoneyDividendos)();
        console.log(articles);
        return articles;
    });
}
const testScraper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield testingScraper();
        res.status(200).send({ articles });
    }
    catch (error) {
        res.status(500).send("Erro ao executar scraping.");
    }
});
exports.testScraper = testScraper;
