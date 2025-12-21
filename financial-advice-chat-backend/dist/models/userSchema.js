"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.userUpdateSchema = exports.userInputSchema = void 0;
const zod_1 = require("zod");
exports.userInputSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nome é obrigatório"),
    secondName: zod_1.z.string().min(1, "Sobrenome é obrigatório"),
    email: zod_1.z.string().email("Email inválido"),
    password: zod_1.z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    age: zod_1.z.number().int().min(0, "Idade deve ser um número inteiro positivo"),
    income: zod_1.z.number().nonnegative("Renda deve ser um valor positivo"),
    profileType: zod_1.z.enum(["basic", "advanced"]),
});
exports.userUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nome é obrigatório").optional(),
    secondName: zod_1.z.string().min(1, "Sobrenome é obrigatório").optional(),
    email: zod_1.z.string().email("Email inválido").optional(),
    password: zod_1.z
        .string()
        .min(6, "Senha deve ter no mínimo 6 caracteres")
        .optional(),
    age: zod_1.z
        .number()
        .int()
        .min(0, "Idade deve ser um número inteiro positivo")
        .optional(),
    income: zod_1.z.number().nonnegative("Renda deve ser um valor positivo").optional(),
    profileType: zod_1.z.enum(["basic", "advanced"]).optional(),
});
exports.userSchema = zod_1.z
    .object({
    id: zod_1.z.string().uuid("Id deve ser um UUID válido"),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date().optional(),
})
    .merge(exports.userInputSchema);
