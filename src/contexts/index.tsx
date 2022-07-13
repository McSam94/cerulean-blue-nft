import * as React from 'react';
import NFTProvider from './NFT';
import WalletProvider from './wallet';

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <WalletProvider>
      <NFTProvider>{children}</NFTProvider>
    </WalletProvider>
  );
};

export default Providers;
