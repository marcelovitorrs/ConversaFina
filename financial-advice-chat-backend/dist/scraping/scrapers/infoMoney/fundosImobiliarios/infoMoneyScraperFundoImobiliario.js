"use strict";
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeInfomoneyFundosImobiliarios = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const cheerio = __importStar(require("cheerio"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const scrapeInfomoneyFundosImobiliarios = () => __awaiter(void 0, void 0, void 0, function* () {
    const links = [
        "https://www.infomoney.com.br/guias/fundos-imobiliarios-tijolo-papel-hibrido/",
        "https://www.infomoney.com.br/guias/o-que-e-ifix/",
        "https://www.infomoney.com.br/guias/vacancia-em-fundos-imobiliarios/",
        "https://www.infomoney.com.br/guias/cap-rate/",
    ];
    try {
        const browser = yield puppeteer_1.default.launch({ headless: true });
        const page = yield browser.newPage();
        const articles = [];
        for (let link of links) {
            yield page.goto(link, { waitUntil: "networkidle2" });
            const content = yield page.content();
            const $ = cheerio.load(content);
            const title = $("main h1").text().trim();
            let articleContent = "";
            $("main article p").each((i, element) => {
                articleContent += $(element).text().trim() + "\n";
            });
            articleContent = articleContent
                .replace(/Publicidade/g, "")
                .replace(/\s{2,}/g, " ");
            articles.push({
                title,
                link,
                content: articleContent.trim(),
            });
        }
        yield browser.close();
        const dataDir = path.join(process.cwd(), "src", "data");
        const filePath = path.join(dataDir, "infomoney_fundos_imobiliarios.json");
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        fs.writeFileSync(filePath, JSON.stringify(articles, null, 2), "utf-8");
        console.log(`Dados salvos em ${filePath}`);
        return articles;
    }
    catch (error) {
        console.error(`Erro ao fazer scraping:`, error);
        return [];
    }
});
exports.scrapeInfomoneyFundosImobiliarios = scrapeInfomoneyFundosImobiliarios;
