"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const scrapingRoutes_1 = __importDefault(require("./routes/scrapingRoutes"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/users", userRoutes_1.default);
app.use("/chat", chatRoutes_1.default);
app.use("/scraping", scrapingRoutes_1.default);
const PORT = process.env.PORT || 5000;
const server = http_1.default.createServer(app);
server.setTimeout(300000);
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
