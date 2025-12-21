"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatSchema = exports.chatMessageSchema = void 0;
const zod_1 = require("zod");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firestoreTimestampToDate = zod_1.z.preprocess((arg) => {
    if (arg instanceof firebase_admin_1.default.firestore.Timestamp) {
        return arg.toDate();
    }
    return arg;
}, zod_1.z.date());
exports.chatMessageSchema = zod_1.z.object({
    question: zod_1.z.string().min(1, "Pergunta não pode ser vazia"),
    answer: zod_1.z.string().min(1, "Resposta não pode ser vazia"),
    createdAt: firestoreTimestampToDate,
});
exports.chatSchema = zod_1.z.object({
    chatId: zod_1.z.string().uuid(),
    userId: zod_1.z.string().uuid(),
    profileType: zod_1.z.enum(["basic", "advanced"]),
    messages: zod_1.z.array(exports.chatMessageSchema),
    createdAt: firestoreTimestampToDate,
    updatedAt: firestoreTimestampToDate.optional(),
});
