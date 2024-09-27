import { Keypair as kp } from "@solana/web3.js";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
import IpfsMini from 'ipfs-mini';
const ipfs = new IpfsMini({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
export async function uploadFiles(provider, files, delegateWallet, tries = 5) {
    if (files.length === 0) {
        return [];
    }
    const uploadFile = async (file) => {
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
    };
    const res = await withRetries(async () => {
        const uploaded = await Promise.all(files.map(uploadFile));
        if (uploaded.length !== files.length) {
            throw new Error('Upload failed');
        }
        return uploaded;
    }, tries);
    return res;
}
export function randomizeFileName(file) {
    const ext = file.name.split(".").pop();
    const name = randomIdentifier() + (ext ? `.${ext}` : "");
    Object.defineProperty(file, "name", {
        writable: true,
        value: name,
    });
}
function randomIdentifier() {
    return Math.random().toString(32).slice(2);
}
// docusaurus SSR has issues with Keypair.fromSecretKey running, not sure why.
const getDevnetWallet = () => {
    try {
        return kp.fromSecretKey(new Uint8Array([
            17, 83, 103, 136, 230, 98, 37, 214, 218, 31, 168, 218, 184, 30, 163, 18,
            164, 101, 117, 232, 151, 205, 200,
        ]));
    }
    catch (e) {
        //ignore
    }
};
async function withRetries(arg0, tries = 3) {
    try {
        return await arg0();
    }
    catch (e) {
        if (tries > 0) {
            console.warn(`Failed tx, retrying up to ${tries} more times.`, e);
            await sleep(1000);
            return withRetries(arg0, tries - 1);
        }
        throw e;
    }
}
//# sourceMappingURL=shdw.js.map