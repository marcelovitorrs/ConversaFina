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
exports.updateUserProfileType = exports.getUserByEmail = exports.deleteUserByEmail = exports.getAllUsers = exports.updateUserById = exports.createUser = exports.getUserById = void 0;
const firebase_1 = require("../config/firebase");
const userSchema_1 = require("../models/userSchema");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUserById = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    const userDoc = yield firebase_1.db.collection("users").doc(uid).get();
    return userDoc.exists ? userDoc.data() : null;
});
exports.getUserById = getUserById;
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    userData.id = (0, uuid_1.v4)();
    userData.createdAt = new Date();
    const user = userSchema_1.userSchema.parse(userData);
    const existingUser = yield firebase_1.db
        .collection("users")
        .where("email", "==", user.email)
        .get();
    if (!existingUser.empty) {
        throw new Error("Já existe um usuário com este email.");
    }
    const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
    const userToSave = Object.assign(Object.assign({}, user), { password: hashedPassword });
    yield firebase_1.db.collection("users").doc(userData.id).set(userToSave);
});
exports.createUser = createUser;
const updateUserById = (uid, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = userSchema_1.userUpdateSchema.parse(userData);
    if (user.password) {
        const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
        user.password = hashedPassword;
    }
    const userToUpdate = Object.assign(Object.assign({}, user), { updatedAt: new Date() });
    yield firebase_1.db.collection("users").doc(uid).update(userToUpdate);
});
exports.updateUserById = updateUserById;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const usersSnapshot = yield firebase_1.db.collection("users").get();
    return usersSnapshot.docs.map((doc) => doc.data());
});
exports.getAllUsers = getAllUsers;
const deleteUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userSnapshot = yield firebase_1.db
        .collection("users")
        .where("email", "==", email)
        .get();
    if (!userSnapshot.empty) {
        const batch = firebase_1.db.batch();
        userSnapshot.docs.forEach((doc) => batch.delete(doc.ref));
        yield batch.commit();
    }
    else {
        throw new Error("Usuário com este email não encontrado.");
    }
});
exports.deleteUserByEmail = deleteUserByEmail;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userSnapshot = yield firebase_1.db
        .collection("users")
        .where("email", "==", email)
        .get();
    if (userSnapshot.empty) {
        return null;
    }
    const userDoc = userSnapshot.docs[0];
    return userDoc.exists ? userDoc.data() : null;
});
exports.getUserByEmail = getUserByEmail;
const updateUserProfileType = (uid, profileType) => __awaiter(void 0, void 0, void 0, function* () {
    const updateData = { profileType };
    const userToUpdate = userSchema_1.userUpdateSchema.parse(updateData);
    yield firebase_1.db
        .collection("users")
        .doc(uid)
        .update(Object.assign(Object.assign({}, userToUpdate), { updatedAt: new Date() }));
});
exports.updateUserProfileType = updateUserProfileType;
