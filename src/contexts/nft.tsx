import * as React from 'react';

interface NFTContextInt {}

const nftContext = React.createContext<NFTContextInt>({});

const NFTProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <nftContext.Provider value={{}}>{children}</nftContext.Provider>;
};

export default NFTProvider;
export const useNFT = () => {
  return React.useContext(nftContext);
};
