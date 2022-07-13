import * as React from 'react';
import Web3Modal from 'web3modal';
import WalletConnect from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { ethers } from 'ethers';

interface WalletProvider {
  connect: () => void;
  disconnect: () => void;
  isConnected: boolean;
  wallet: Web3Modal | undefined;
  account: string | undefined;
  truncateAccount: string | undefined;
  provider: ethers.providers.Web3Provider | undefined;
  network: ethers.providers.Network | undefined;
  error: any;
}

const useWallet = (): WalletProvider => {
  const [wallet, setWallet] = React.useState<Web3Modal>();
  const [provider, setProvider] = React.useState<ethers.providers.Web3Provider>();
  const [accounts, setAccounts] = React.useState<Array<string>>();
  const [network, setNetwork] = React.useState<ethers.providers.Network>();

  const [error, setError] = React.useState<any>();

  const isConnected = React.useMemo(() => !!accounts?.[0], [accounts]);

  const account = React.useMemo(() => accounts?.[0], [accounts]);

  const truncateAccount = React.useMemo(
    () => `${account?.slice(0, 5)}...${account?.slice(account.length - 4, account.length)}`,
    [account],
  );

  const init = React.useCallback(async () => {
    const { Web3Auth } = await import('@web3auth/web3auth');
    const infuraId = process.env.NEXT_PUBLIC_INFURA_KEY;
    const providerOptions = {
      walletconnect: {
        package: WalletConnect,
        options: {
          infuraId,
        },
      },
      coinbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
          appName: 'Cerulean NFT App',
          infuraId,
        },
      },
      web3auth: {
        package: Web3Auth,
        options: {
          infuraId,
        },
      },
    };

    const web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions,
    });

    setWallet(web3Modal);
  }, []);

  const resetState = React.useCallback(() => {
    setProvider(undefined);
    setAccounts(undefined);
    setNetwork(undefined);
  }, []);

  const connect = React.useCallback(async () => {
    if (!wallet) return;

    try {
      const provider = await wallet.connect();
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const accounts = await web3Provider.listAccounts();
      const network = await web3Provider.getNetwork();

      setProvider(provider);
      setAccounts(accounts);
      setNetwork(network);
    } catch (error) {
      setError(error);
    }
  }, [wallet]);

  const disconnect = React.useCallback(async () => {
    await wallet?.clearCachedProvider();
    resetState();
  }, [wallet, resetState]);

  React.useEffect(() => {
    if (!provider?.on) return;

    const handleAccountChanged = (accounts: Array<string>) => setAccounts(accounts);
    const handleDisconnect = () => disconnect();

    provider.on('accountChanged', handleAccountChanged);
    provider.on('disconnect', handleDisconnect);

    return () => {
      provider.removeAllListeners();
    };
  }, [provider?.on, disconnect, provider]);

  React.useEffect(() => {
    init();
  }, [init]);

  React.useEffect(() => {
    if (wallet?.cachedProvider) connect();
  }, [wallet?.cachedProvider, connect]);

  return { connect, disconnect, isConnected, wallet, account, truncateAccount, provider, network, error };
};

export default useWallet;
