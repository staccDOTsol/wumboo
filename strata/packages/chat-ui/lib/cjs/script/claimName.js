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
const chat_1 = require("@strata-foundation/chat");
const anchor = __importStar(require("@project-serum/anchor"));
// @ts-ignore
const lit_js_sdk_1 = __importDefault(require("lit-js-sdk"));
const anchor_1 = require("@project-serum/anchor");
const namespaces_1 = require("@cardinal/namespaces");
const spl_token_bonding_1 = require("@strata-foundation/spl-token-bonding");
const spl_utils_1 = require("@strata-foundation/spl-utils");
const args = process.argv;
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(process.env.ANCHOR_PROVIDER_URL);
        anchor.setProvider(anchor.AnchorProvider.env());
        const provider = anchor.getProvider();
        const ChatIDLJson = yield anchor_1.Program.fetchIdl(chat_1.ChatSdk.ID, provider);
        const chat = new anchor_1.Program(ChatIDLJson, chat_1.ChatSdk.ID, provider);
        const client = new lit_js_sdk_1.default.LitNodeClient();
        const namespacesProgram = new anchor_1.Program(namespaces_1.NAMESPACES_IDL, namespaces_1.NAMESPACES_PROGRAM_ID, provider);
        const tokenBondingProgram = yield spl_token_bonding_1.SplTokenBonding.init(provider, spl_token_bonding_1.SplTokenBonding.ID);
        const tokenMetadataProgram = yield spl_utils_1.SplTokenMetadata.init(provider);
        const chatSdk = new chat_1.ChatSdk({
            provider,
            program: chat,
            litClient: client,
            namespacesProgram,
            tokenBondingProgram,
            tokenMetadataProgram,
        });
        yield chatSdk.initializeNamespaces();
        console.log("Claiming identifier...");
        const { certificateMint: identifierCertificateMint } = yield chatSdk.claimIdentifier({
            type: chat_1.IdentifierType.User,
            identifier: args[2],
        });
        console.log(identifierCertificateMint.toBase58());
    });
}
run().catch((e) => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=claimName.js.map