"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatients = void 0;
const patients_json_1 = __importDefault(require("./data/patients.json"));
const patients = patients_json_1.default;
const getPatients = () => {
    return patients;
};
exports.getPatients = getPatients;
