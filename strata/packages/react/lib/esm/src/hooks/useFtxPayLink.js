import { useWallet } from "@solana/wallet-adapter-react";
export function useFtxPayLink() {
    const { publicKey } = useWallet();
    return `https://ftx.com/pay/request?coin=SOL&address=${publicKey?.toBase58()}&tag=&wallet=sol&memoIsRequired=false&memo=&fixedWidth=true`;
}
//# sourceMappingURL=useFtxPayLink.js.map