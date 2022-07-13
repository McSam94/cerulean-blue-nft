import * as React from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import WalletConnect from '@walletconnect/web3-provider';
import { HexString } from '@coinbase/wallet-sdk/dist/types';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { getVisibleBalance } from '@constants/index';

interface TokenInfo {
  name: string;
  symbol: string;
  decimal: number;
}

interface WalletContextInt {
  connect: () => void;
  disconnect: () => void;
  isConnected: boolean;
  wallet: Web3Modal | undefined;
  account: string | undefined;
  balances: Map<string, number>;
  tokenInfos: Map<string, TokenInfo>;
  truncateAccount: string | undefined;
  provider: ethers.providers.Web3Provider | undefined;
  chainId: number | undefined;
  error: any;
}

const walletContext = React.createContext<WalletContextInt>({
  connect: () => {},
  disconnect: () => {},
  isConnected: false,
  wallet: undefined,
  account: undefined,
  balances: new Map(),
  tokenInfos: new Map(),
  truncateAccount: undefined,
  provider: undefined,
  chainId: undefined,
  error: undefined,
});

const WalletProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [wallet, setWallet] = React.useState<Web3Modal>();
  const [provider, setProvider] = React.useState<any>();
  const [web3Provider, setWeb3Provider] = React.useState<ethers.providers.Web3Provider>();
  const [accounts, setAccounts] = React.useState<Array<string>>();
  const [chainId, setChainId] = React.useState<number>();
  const [tokensContract, setTokenContracts] = React.useState<Array<ethers.Contract>>();
  const [tokenInfos, setTokenInfos] = React.useState<Map<string, TokenInfo>>(new Map());
  const [balances, setBalances] = React.useState<Map<string, any>>(new Map());

  const [error, setError] = React.useState<any>();

  const isConnected = React.useMemo(() => !!accounts?.[0], [accounts]);

  const account = React.useMemo(() => accounts?.[0], [accounts]);

  const truncateAccount = React.useMemo(
    () => (account ? `${account.slice(0, 5)}...${account.slice(account.length - 4, account.length)}` : ''),
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

  const resetAccountState = React.useCallback(() => {
    setBalances(new Map());
    setTokenInfos(new Map());
  }, []);

  const resetState = React.useCallback(() => {
    setProvider(undefined);
    setWeb3Provider(undefined);
    setAccounts(undefined);
    setChainId(undefined);
    resetAccountState();
  }, [resetAccountState]);

  const getBalances = React.useCallback(async () => {
    if (!web3Provider || !accounts || !chainId) return;

    const owner = accounts[0];
    // ETH Balance
    const ethBalance = ethers.utils.formatEther(await web3Provider.getBalance(owner));
    setBalances((prevState) => prevState.set(owner, ethBalance));
    setTokenInfos((prevState) =>
      prevState.set(owner, {
        name: 'Ethereum',
        symbol: 'ETH',
        decimal: 18,
      }),
    );

    const visibleCoinBalance = getVisibleBalance(chainId);

    const erc20abi = require('../constants/erc20-abi.json');

    const tokensContract = await Promise.all(
      visibleCoinBalance.map(async (address) => {
        const tokenContract = new ethers.Contract(address, erc20abi, web3Provider);
        const tokenBalance = ethers.utils.formatEther(await tokenContract.balanceOf(owner));
        const name = await tokenContract.name();
        const symbol = await tokenContract.symbol();
        const decimal = await tokenContract.decimals();

        setTokenInfos((prevState) =>
          prevState.set(address, {
            name,
            symbol,
            decimal,
          }),
        );
        setBalances((prevState) => prevState.set(address, tokenBalance));

        return tokenContract;
      }),
    );

    setTokenContracts(tokensContract);
  }, [accounts, chainId, web3Provider]);

  const connect = React.useCallback(async () => {
    if (!wallet) return;

    try {
      const provider = await wallet.connect();
      const web3Provider = new ethers.providers.Web3Provider(provider, 'any');
      const accounts = await web3Provider.listAccounts();

      if (!accounts.length) throw new Error('No account found');

      const network = await web3Provider.getNetwork();

      setProvider(provider);
      setWeb3Provider(web3Provider);
      setAccounts(accounts);
      setChainId(network.chainId);
    } catch (error: any) {
      setError(error);
    }
  }, [wallet]);

  const disconnect = React.useCallback(async () => {
    await wallet?.clearCachedProvider();
    resetState();
    provider?.removeAllListeners();
  }, [wallet, resetState, provider]);

  // listen account & chainId changes
  React.useEffect(() => {
    const handleAccountChanged = async (accounts: Array<string>) => {
      resetAccountState();
      setAccounts(accounts);
    };
    const handleChainChanged = (chainId: HexString) => {
      setBalances(new Map());
      setTokenInfos(new Map());
      setChainId(parseInt(chainId, 16));
    };
    const handleDisconnect = () => disconnect();

    provider?.on('accountsChanged', handleAccountChanged);
    provider?.on('chainChanged', handleChainChanged);
    provider?.on('disconnect', handleDisconnect);

    return () => {
      provider?.removeAllListeners();
    };
  }, [provider?.on, web3Provider, disconnect, provider, resetAccountState]);

  // init Provider
  React.useEffect(() => {
    init();
  }, [init]);

  // Get Native and ERC20 Balance
  React.useEffect(() => {
    getBalances();
  }, [getBalances]);

  // Reconnect if cached
  React.useEffect(() => {
    if (wallet?.cachedProvider) {
      connect();
    }
  }, [wallet?.cachedProvider, connect]);

  // Listen USDC balance
  React.useEffect(() => {
    if (!tokensContract) return;

    tokensContract.forEach((tokenContract) => {
      tokenContract.on('Transfer', () => getBalances());
    });
    return () => {
      tokensContract.forEach((tokenContract) => {
        tokenContract.removeAllListeners();
      });
    };
  }, [tokensContract, getBalances]);

  // Listen ETH balance
  React.useEffect(() => {
    if (!account) return;

    web3Provider?.on(account, () => getBalances());

    return () => {
      web3Provider?.removeAllListeners();
    };
  }, [web3Provider, account, getBalances]);

  return (
    <walletContext.Provider
      value={{
        connect,
        disconnect,
        isConnected,
        wallet,
        account,
        balances,
        tokenInfos,
        truncateAccount,
        provider,
        chainId,
        error,
      }}
    >
      {children}
    </walletContext.Provider>
  );
};

export default WalletProvider;
export const useWallet = () => {
  return React.useContext(walletContext);
};
