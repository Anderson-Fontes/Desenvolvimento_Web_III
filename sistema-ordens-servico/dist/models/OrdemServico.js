"use strict";
// src/models/OrdemServico.ts
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const OrdemServicoSchema = new mongoose_1.Schema({
    titulo: { type: String, required: true, trim: true },
    descricao: { type: String, required: true },
    dataAbertura: { type: Date, default: Date.now }, // Gerada automaticamente
    status: {
        type: String,
        required: true,
        enum: ['aberta', 'em andamento', 'concluída'], // Valores permitidos
        default: 'aberta'
    },
    prioridade: {
        type: String,
        required: true,
        enum: ['baixa', 'média', 'alta'], // Valores permitidos
        default: 'média'
    },
    responsavel: { type: String, required: false }, // Opcional
    setorSolicitante: { type: String, required: true, trim: true },
    prazoEstimado: { type: Date, required: false }, // Opcional
    valorServico: { type: Number, required: true } // Representa o Decimal
});
// Exporta o modelo para ser usado no Controller
exports.default = mongoose_1.default.model('OrdemServico', OrdemServicoSchema);
//# sourceMappingURL=OrdemServico.js.map