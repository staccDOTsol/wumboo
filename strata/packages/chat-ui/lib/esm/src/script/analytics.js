import { ChatSdk } from "@strata-foundation/chat";
import * as anchor from "@project-serum/anchor";
// @ts-ignore
import LitJsSdk from "lit-js-sdk";
import { Program } from "@project-serum/anchor";
import { NAMESPACES_IDL, NAMESPACES_PROGRAM_ID, } from "@cardinal/namespaces";
import { SplTokenBonding } from "@strata-foundation/spl-token-bonding";
import { SplTokenMetadata } from "@strata-foundation/spl-utils";
async function countSigs(connection, before) {
    const sigs = await connection.getSignaturesForAddress(ChatSdk.ID, {
        before,
        limit: 1000,
    }, "confirmed");
    const count = sigs.length;
    if (count === 1000) {
        return (count + (await countSigs(connection, sigs[sigs.length - 1].signature)));
    }
    return count;
}
async function getAllMessages(connection, before) {
    const sigs = await connection.getSignaturesForAddress(ChatSdk.ID, {
        before,
        limit: 1000,
    }, "confirmed");
    const count = sigs.length;
    if (count === 1000) {
        return (count + (await countSigs(connection, sigs[sigs.length - 1].signature)));
    }
    return count;
}
const args = process.argv;
async function run() {
    console.log(process.env.ANCHOR_PROVIDER_URL);
    anchor.setProvider(anchor.AnchorProvider.env());
    const provider = anchor.getProvider();
    const ChatIDLJson = await Program.fetchIdl(ChatSdk.ID, provider);
    const chat = new Program(ChatIDLJson, ChatSdk.ID, provider);
    const client = new LitJsSdk.LitNodeClient();
    const namespacesProgram = new Program(NAMESPACES_IDL, NAMESPACES_PROGRAM_ID, provider);
    const tokenBondingProgram = await SplTokenBonding.init(provider, SplTokenBonding.ID);
    const tokenMetadataProgram = await SplTokenMetadata.init(provider);
    const chatSdk = new ChatSdk({
        provider,
        program: chat,
        litClient: client,
        namespacesProgram,
        tokenBondingProgram,
        tokenMetadataProgram,
    });
    await chatSdk.initializeNamespaces();
    const profiles = await chatSdk.account.profileV0.all();
    const chats = await chatSdk.account.chatV0.all();
    const txns = await countSigs(chatSdk.provider.connection);
    const delegates = await chatSdk.account.delegateWalletV0.all();
    console.log(`${profiles.length} profiles`);
    console.log(`${chats.length} chats`);
    console.log(`${delegates.length} delegate wallets`);
    console.log(`${txns} txns`);
    console.log(`Roughly ${txns - chats.length - profiles.length - delegates.length} messages`);
}
run().catch((e) => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=analytics.js.map