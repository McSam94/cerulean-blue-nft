import WalletConnect from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { Web3Auth } from '@web3auth/web3auth';

export const providerOptions = {
  walletconnect: {
    package: WalletConnect,
    options: {
      infuraId: process.env.INFURA_KEY,
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: 'Web3Modal Example App',
      infuraId: process.env.INFURA_KEY,
    },
  },
  web3auth: {
    package: Web3Auth,
    options: {
      infuraId: process.env.INFURA_KEY,
    },
  },
};
