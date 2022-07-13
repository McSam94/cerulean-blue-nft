const MAINNET_CHAIN_ID = 1;

export const getVisibleBalance = (chainId: number) =>
  chainId === MAINNET_CHAIN_ID
    ? ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48']
    : ['0xe11A86849d99F524cAC3E7A0Ec1241828e332C62'];
