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
exports.getCurrentUser = exports.logoutUser = exports.loginUser = void 0;
const userService_1 = require("../services/userService");
const authService_1 = require("../services/authService");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log("Fazendo login...");
    try {
        const user = yield (0, userService_1.getUserByEmail)(email);
        if (!user) {
            return res.status(404).send("Usuário não encontrado.");
        }
        const isPasswordValid = yield (0, authService_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send("Senha incorreta.");
        }
        const customToken = yield firebase_admin_1.default.auth().createCustomToken(user.id);
        console.log("Custom Token Gerado para Logar no Front SDK:", customToken);
        res.status(200).json({ token: customToken, user });
    }
    catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).send("Erro ao fazer login.");
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => {
    try {
        res.status(200).send("Usuário deslogado com sucesso.");
    }
    catch (error) {
        res.status(500).send("Erro ao deslogar o usuário.");
    }
};
exports.logoutUser = logoutUser;
const getCurrentUser = (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(404).send("Usuário não autenticado.");
    }
    res.status(200).json(user);
};
exports.getCurrentUser = getCurrentUser;
