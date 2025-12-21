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
exports.evaluateFinancialLevel = exports.deleteUserProfile = exports.findUserByEmail = exports.getAllUserProfiles = exports.createUserProfile = exports.updateUserProfile = exports.getUserProfile = void 0;
const userService_1 = require("../services/userService");
const userSchema_1 = require("../models/userSchema");
const zod_1 = require("zod");
const chatService_1 = require("../services/chatService");
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.user.uid;
    try {
        const user = yield (0, userService_1.getUserById)(uid);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).send("Usuário não encontrado.");
        }
    }
    catch (error) {
        res.status(500).send("Erro ao buscar o perfil do usuário.");
    }
});
exports.getUserProfile = getUserProfile;
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.user.uid;
    try {
        const userData = Object.assign(Object.assign({}, req.body), { id: uid });
        userSchema_1.userUpdateSchema.parse(userData);
        yield (0, userService_1.updateUserById)(uid, userData);
        res.send("Perfil atualizado com sucesso.");
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).send(error.errors);
        }
        res.status(500).send("Erro ao atualizar o perfil.");
    }
});
exports.updateUserProfile = updateUserProfile;
const createUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Criando usuário...");
    try {
        const userData = userSchema_1.userInputSchema.parse(req.body);
        yield (0, userService_1.createUser)(userData);
        res.status(201).send("Usuário criado com sucesso.");
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).send(error.errors);
        }
        if (error instanceof Error &&
            error.message === "Já existe um usuário com este email.") {
            return res.status(409).send(error.message);
        }
        res.status(500).send("Erro ao criar o usuário.");
    }
});
exports.createUserProfile = createUserProfile;
const getAllUserProfiles = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userService_1.getAllUsers)();
        if (users.length > 0) {
            res.json(users);
        }
        else {
            res.status(404).send("Nenhum usuário encontrado.");
        }
    }
    catch (error) {
        res.status(500).send("Erro ao buscar todos os perfis de usuário.");
    }
});
exports.getAllUserProfiles = getAllUserProfiles;
const findUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(400).send("Email é obrigatório.");
        }
        const user = yield (0, userService_1.getUserByEmail)(email);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).send("Usuário não encontrado.");
        }
    }
    catch (error) {
        res.status(500).send("Erro ao buscar o perfil do usuário.");
    }
});
exports.findUserByEmail = findUserByEmail;
const deleteUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(400).send("Email é obrigatório.");
        }
        yield (0, userService_1.deleteUserByEmail)(email);
        res.send(`Usuário com email ${email} deletado com sucesso.`);
    }
    catch (error) {
        res.status(500).send("Erro ao deletar o usuário.");
    }
});
exports.deleteUserProfile = deleteUserProfile;
const evaluateFinancialLevel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.uid;
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).send("O prompt é obrigatório.");
        }
        const aiResponse = yield (0, chatService_1.processLlamaModel)(prompt);
        const profileType = aiResponse.toLowerCase().includes("avançado")
            ? "advanced"
            : "basic";
        yield (0, userService_1.updateUserProfileType)(userId, profileType);
        res.json({ profileType, aiResponse });
    }
    catch (error) {
        res.status(500).send(`Erro ao avaliar o nível financeiro: ${error}`);
    }
});
exports.evaluateFinancialLevel = evaluateFinancialLevel;
