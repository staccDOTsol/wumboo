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
exports.randomizeFileName = exports.uploadFiles = void 0;
const web3_js_1 = require("@solana/web3.js");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const ipfs_mini_1 = __importDefault(require("ipfs-mini"));
const ipfs = new ipfs_mini_1.default({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
function uploadFiles(provider, files, delegateWallet, tries = 5) {
    return __awaiter(this, void 0, void 0, function* () {
        if (files.length === 0) {
            return [];
        }
        const uploadFile = (file) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const reader = new window.FileReader();
                reader.onloadend = () => {
                    const buffer = Buffer.from(reader.result);
                    ipfs.addJSON(buffer, (err, hash) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        const url = `https://ipfs.infura.io/ipfs/${hash}`;
                        resolve(url);
                    });
                };
                reader.readAsArrayBuffer(new Blob([file.buffer]));
            });
        });
        const res = yield withRetries(() => __awaiter(this, void 0, void 0, function* () {
            const uploaded = yield Promise.all(files.map(uploadFile));
            if (uploaded.length !== files.length) {
                throw new Error('Upload failed');
            }
            return uploaded;
        }), tries);
        return res;
    });
}
exports.uploadFiles = uploadFiles;
function randomizeFileName(file) {
    const ext = file.name.split(".").pop();
    const name = randomIdentifier() + (ext ? `.${ext}` : "");
    Object.defineProperty(file, "name", {
        writable: true,
        value: name,
    });
}
exports.randomizeFileName = randomizeFileName;
function randomIdentifier() {
    return Math.random().toString(32).slice(2);
}
// docusaurus SSR has issues with Keypair.fromSecretKey running, not sure why.
const getDevnetWallet = () => {
    try {
        return web3_js_1.Keypair.fromSecretKey(new Uint8Array([
            17, 83, 103, 136, 230, 98, 37, 214, 218, 31, 168, 218, 184, 30, 163, 18,
            164, 101, 117, 232, 151, 205, 200,
        ]));
    }
    catch (e) {
        //ignore
    }
};
function withRetries(arg0, tries = 3) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield arg0();
        }
        catch (e) {
            if (tries > 0) {
                console.warn(`Failed tx, retrying up to ${tries} more times.`, e);
                yield sleep(1000);
                return withRetries(arg0, tries - 1);
            }
            throw e;
        }
    });
}
//# sourceMappingURL=shdw.js.map