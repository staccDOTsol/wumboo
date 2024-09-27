import { TransactionInstruction } from "@solana/web3.js";
import { idlAddress } from "@project-serum/anchor/dist/cjs/idl";
export async function createIdlUpgradeInstruction(programId, bufferAddress, upgradeAuthority) {
    const prefix = Buffer.from("0a69e9a778bcf440", "hex");
    const ixn = Buffer.from("03", "hex");
    const data = Buffer.concat([prefix.reverse(), ixn]);
    const idlAddr = await idlAddress(programId);
    const keys = [
        {
            pubkey: bufferAddress,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: idlAddr,
            isWritable: true,
            isSigner: false,
        },
        {
            pubkey: upgradeAuthority,
            isWritable: true,
            isSigner: true,
        },
    ];
    return new TransactionInstruction({
        keys,
        programId,
        data,
    });
}
//# sourceMappingURL=createIdlUpgradeInstruction.js.map