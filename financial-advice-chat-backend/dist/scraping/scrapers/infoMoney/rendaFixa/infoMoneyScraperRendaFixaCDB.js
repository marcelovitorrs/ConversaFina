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
exports.scrapeInfomoneyCDB = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const cheerio = __importStar(require("cheerio"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const scrapeInfomoneyCDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://www.infomoney.com.br/tudo-sobre/cdb/";
    try {
        const browser = yield puppeteer_1.default.launch({ headless: true });
        const page = yield browser.newPage();
        yield page.goto(url, { waitUntil: "networkidle2" });
        const content = yield page.content();
        const $ = cheerio.load(content);
        const articles = [];
        $("article.article-card").each((i, element) => {
            const title = $(element).find("h3.article-card__headline").text().trim();
            let link = $(element).find("a.article-card__headline-link").attr("href");
            const time = $(element).find("time").text().trim();
            if (link && !link.startsWith("http")) {
                link = `https://www.infomoney.com.br${link}`;
            }
            if (title && link) {
                articles.push({ title, link, time });
            }
        });
        const articleContents = [];
        for (let article of articles) {
            yield page.goto(article.link, { waitUntil: "networkidle2" });
            const articlePageContent = yield page.content();
            const article$ = cheerio.load(articlePageContent);
            let articleText = article$("article.im-article").text().trim();
            articleText = articleText
                .replace(/^Publicidade\s*/, "")
                .replace(/\s{2,}/g, " ")
                .replace(/Guia gratuito da Rico.*pouco/, "");
            articleContents.push(Object.assign(Object.assign({}, article), { content: articleText }));
        }
        yield browser.close();
        const dataDir = path.join(process.cwd(), "src", "data");
        const filePath = path.join(dataDir, "infomoney_cdb.json");
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        fs.writeFileSync(filePath, JSON.stringify(articleContents, null, 2), "utf-8");
        console.log(`Dados salvos em ${filePath}`);
        return articleContents;
    }
    catch (error) {
        console.error(`Erro ao fazer scraping:`, error);
        return [];
    }
});
exports.scrapeInfomoneyCDB = scrapeInfomoneyCDB;
