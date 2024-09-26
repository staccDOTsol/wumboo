import {
  WalletName,
  EventEmitter,
  SignerWalletAdapter,
  WalletAdapterEvents,
  WalletConnectionError,
  WalletDisconnectionError,
  WalletError,
  WalletNotConnectedError,
  WalletNotReadyError,
  WalletSignTransactionError, // Updated import
  WalletWindowClosedError,
  SendTransactionOptions,
  WalletReadyState,
} from "@solana/wallet-adapter-base";
import { Connection, PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";
import { MessageType, Message } from "./types";
import { deserializeError } from "serialize-error";

type TransactionOrVersionedTransaction<T extends number | undefined = number | undefined> =
  T extends number ? VersionedTransaction : Transaction;

export interface IInjectedWalletAdapterConfig {
  name: WalletName;
  url: string | null;
  icon: string | null;
}

export class InjectedWalletAdapter
  extends EventEmitter<WalletAdapterEvents>
  implements SignerWalletAdapter
{
  private _name: WalletName;
  private _url: string | null;
  private _icon: string | null;
  private _publicKey: PublicKey | null;
  private _connecting: boolean;
  private _connected: boolean;
  private _autoApprove: boolean;

  async autoConnect(): Promise<void> {
    if (this._publicKey) {
      this._connected = true;
      this.emit("connect", this._publicKey);
    } else {
      try {
        await this.connect();
      } catch (error) {
        console.error("Auto-connect failed:", error);
      }
    }
  }
  constructor(config: IInjectedWalletAdapterConfig) {
    super();
    this._name = config.name;
    this._url = config.url;
    this._icon = config.icon;
    this._publicKey = null;
    this._connecting = false;
    this._connected = false;
    this._autoApprove = false;

    window.addEventListener("message", this._handleMessage.bind(this));
  }

  readyState: WalletReadyState = WalletReadyState.Installed;

  /**
   * Implements the SignerWalletAdapter's sendTransaction method.
   * Sends a transaction to the wallet for signing and submission.
   *
   * @param transaction - The transaction to send.
   * @param connection - The connection to the Solana cluster.
   * @param options - Optional parameters for sending the transaction.
   * @returns A promise that resolves to the transaction signature.
   */
  async sendTransaction(
    transaction: Transaction,
    connection: Connection,
    options?: SendTransactionOptions
  ): Promise<string> {
    if (!this._publicKey) throw new WalletNotConnectedError();

    try {
      const serializedTransaction: Buffer = Buffer.isBuffer(transaction.serialize({
        requireAllSignatures: false,
        verifySignatures: true,
      })) 
        ? transaction.serialize({
            requireAllSignatures: false,
            verifySignatures: true,
          }) 
        : Buffer.from(transaction.serialize({
            requireAllSignatures: false,
            verifySignatures: true,
          }));

          const { signedTransaction } = await this.sendMessage({
            type: MessageType.SIGN_TRANSACTION,
            transaction: serializedTransaction,
          });

      return signedTransaction;
    } catch (error: any) {
      console.error("sendTransaction error:", error);
      if (error instanceof WalletError) throw error;
      throw new WalletSignTransactionError(error?.message, error);
    }
  }

  get publicKey(): PublicKey | null {
    return this._publicKey;
  }

  get url(): string {
    return this._url || "";
  }

  get name(): WalletName {
    return this._name;
  }

  readyStateAsync(): Promise<WalletReadyState | "ProxyNotReady"> {
    return (async () => {
      try {
        const { readyState } = await this.sendMessage(
          {
            type: MessageType.WALLET_READY_STATE,
            name: this._name,
          },
          500
        );
        return readyState;
      } catch (error: any) {
        console.error("readyStateAsync error:", error);
        return "ProxyNotReady";
      }
    })();
  }

  get connecting(): boolean {
    return this._connecting;
  }

  get connected(): boolean {
    return this._connected;
  }

  get autoApprove(): boolean {
    return this._autoApprove;
  }

  get icon(): string {
    return this._icon || "";
  }

  /**
   * Sends a message to the wallet and awaits a response.
   *
   * @param m - The message to send.
   * @param timeoutMs - Optional timeout in milliseconds.
   * @returns A promise that resolves with the response data.
   */
  async sendMessage(m: Message, timeoutMs: number = -1): Promise<any> {
    return new Promise((resolve, reject) => {
      const messageChannel = new MessageChannel();

      let timeout: any;
      if (timeoutMs > 0) {
        timeout = setTimeout(() => {
          reject(new WalletNotReadyError("Not ready"));
        }, timeoutMs);
      }

      const listener = (e: MessageEvent) => {
        const { error, ...rest } = e.data;
        if (timeout) clearTimeout(timeout);

        if (error) {
          // Reconstruct and reject with appropriate error
          const errorConstructor: { [key: string]: any } = {
            WalletNotReadyError: WalletNotReadyError,
            WalletWindowClosedError: WalletWindowClosedError,
            WalletConnectionError: WalletConnectionError,
            WalletSignTransactionError: WalletSignTransactionError, // Updated
            WalletDisconnectError: WalletDisconnectionError,
            WalletError: WalletError,
          };

          if (!(error.name in errorConstructor)) {
            reject(deserializeError(error));
          } else {
            reject(
              new errorConstructor[error.name](
                error.message,
                deserializeError(error)
              )
            );
          }
          return;
        }
        resolve(rest);
      };

      messageChannel.port1.onmessage = listener;

      try {
        window.postMessage(m, "*", [messageChannel.port2]);
      } catch (postError) {
        if (timeout) clearTimeout(timeout);
        reject(new WalletError("Failed to post message to wallet."));
      }
    });
  }

  /**
   * Handles incoming messages from the wallet.
   *
   * @param e - The message event.
   */
  private _handleMessage(e: MessageEvent<Message>) {
    const { type, ...data } = e.data;
    switch (type) {
      case MessageType.WALLET_RESET:
        this.emit("disconnect");
        this._connected = false;
        this._publicKey = null;
        break;
      // Handle other message types if necessary
      default:
        break;
    }
  }

  async connect(): Promise<void> {
    if (this._connected || this._connecting) return;

    this._connecting = true;

    try {
      const readyState = await this.readyStateAsync();

      if (
        !(
          readyState === WalletReadyState.Loadable ||
          readyState === WalletReadyState.Installed
        )
      ) {
        throw new WalletNotReadyError();
      }

      const { publicKey: responsePK } = await this.sendMessage({
        type: MessageType.WALLET_CONNECT,
        name: this._name,
      });

      if (!responsePK) {
        throw new WalletConnectionError("No public key received from wallet.");
      }

      const publicKey = new PublicKey(responsePK);
      this._publicKey = publicKey;
      this._connected = true;
      this.emit("connect", publicKey);
    } catch (error: any) {
      console.error("connect error:", error);
      if (error instanceof WalletError) throw error;
      throw new WalletConnectionError(error?.message, error);
    } finally {
      this._connecting = false;
    }
  }

  async disconnect(): Promise<void> {
    if (!this._connected) return;

    try {
      await this.sendMessage({ type: MessageType.WALLET_DISCONNECT });
      this.emit("disconnect");
      this._connected = false;
      this._publicKey = null;
    } catch (error: any) {
      console.error("disconnect error:", error);
      throw new WalletDisconnectionError(error?.message, error);
    }
  }
  async signTransaction<T extends TransactionOrVersionedTransaction<number | undefined>>(
    transaction: T
  ): Promise<T> {
    if (!this._publicKey) throw new WalletNotConnectedError();

    try {
      const serializedTransaction: Buffer | Uint8Array = Buffer.isBuffer(transaction.serialize({
        requireAllSignatures: false,
        verifySignatures: true,
      }))
        ? transaction.serialize({
            requireAllSignatures: false,
            verifySignatures: true,
          }) 
        : Buffer.from(transaction.serialize({
            requireAllSignatures: false,
            verifySignatures: true,
          }));
      const { signedTransaction } = await this.sendMessage({
        type: MessageType.SIGN_TRANSACTION,
        transaction: Buffer.isBuffer(serializedTransaction) ? serializedTransaction : Buffer.from(serializedTransaction),
      });

      if (!signedTransaction) {
        throw new WalletSignTransactionError("No signed transaction received.");
      }

      const signed = this.isVersionedTransaction(signedTransaction)
        ? VersionedTransaction.deserialize(signedTransaction)
        : Transaction.from(signedTransaction) as T;

      transaction.signatures = signed.signatures;
      return signed as T;
    } catch (error: any) {
      console.error("signTransaction error:", error);
      if (error instanceof WalletError) throw error;
      throw new WalletSignTransactionError(error?.message, error);
    }
  }

  /**
   * Signs multiple transactions.
   *
   * @param transactions - An array of transactions to sign.
   * @returns A promise that resolves to an array of signed transactions.
   */
  async signAllTransactions<
    T extends TransactionOrVersionedTransaction<number | undefined>
  >(transactions: T[]): Promise<T[]> {
    if (!this._publicKey) throw new WalletNotConnectedError();

    try {
      const serializedTransactions = transactions.map((t) =>
        Buffer.isBuffer(t.serialize({
          requireAllSignatures: false,
          verifySignatures: true,
        }))
        ? t.serialize({
            requireAllSignatures: false,
            verifySignatures: true,
          }) 
        : Buffer.from(t.serialize({
            requireAllSignatures: false,
            verifySignatures: true,
          }))
      );

      const { signedTransactions } = await this.sendMessage({
        type: MessageType.SIGN_TRANSACTIONS,
        transactions: serializedTransactions.map((tx) => Buffer.isBuffer(tx) ? tx : Buffer.from(tx)),
      });

      if (!signedTransactions || signedTransactions.length !== transactions.length) {
        throw new WalletSignTransactionError("Mismatch in signed transactions received.");
      }

      return signedTransactions.map((tx: any) =>
        this.isVersionedTransaction(tx) ? 
          VersionedTransaction.deserialize(tx) as T :
          Transaction.from(tx) as T
      );
    } catch (error: any) {
      console.error("signAllTransactions error:", error);
      if (error instanceof WalletError) throw error;
      throw new WalletSignTransactionError(error?.message, error);
    }
  }

  /**
   * Utility method to determine if a transaction is versioned.
   *
   * @param tx - The serialized transaction buffer.
   * @returns A boolean indicating if the transaction is versioned.
   */
  private isVersionedTransaction(tx: Buffer): boolean {
    // Implement logic based on your application's transaction structure
    // For example, check if the first byte corresponds to a version identifier
    // Here, we'll assume VersionedTransaction starts with a specific byte
    const VERSIONED_TRANSACTION_INDICATOR = 0; // Replace with actual indicator
    return tx[0] === VERSIONED_TRANSACTION_INDICATOR;
  }

  /**
   * Cleans up event listeners to prevent memory leaks.
   */
  public dispose() {
    window.removeEventListener("message", this._handleMessage.bind(this));
  }
}