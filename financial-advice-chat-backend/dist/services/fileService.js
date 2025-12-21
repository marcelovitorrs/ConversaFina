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
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveDatasetToFile = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const saveDatasetToFile = (data, filename) => {
    try {
        const dataDir = path.join(process.cwd(), "src", "datasets");
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        const filePath = path.join(dataDir, filename);
        let existingData = [];
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, "utf-8");
            existingData = JSON.parse(fileContent);
        }
        const filteredData = data.filter((newArticle) => {
            const isDuplicate = existingData.some((existingArticle) => existingArticle.title === newArticle.title);
            if (isDuplicate) {
                console.log(`Artigo com o título "${newArticle.title}" já existe no arquivo. Ignorando...`);
            }
            return !isDuplicate;
        });
        if (filteredData.length > 0) {
            const updatedData = [...existingData, ...filteredData];
            fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), "utf-8");
            console.log(`Dataset ${filename} atualizado com sucesso.`);
        }
        else {
            console.log(`Nenhum novo artigo para adicionar ao dataset ${filename}.`);
        }
    }
    catch (error) {
        console.error(`Erro ao salvar dataset ${filename}: ${error.message}`);
    }
};
exports.saveDatasetToFile = saveDatasetToFile;
