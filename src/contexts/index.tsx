import * as React from 'react';
import NFTProvider from './nft';

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <NFTProvider>{children}</NFTProvider>;
};

export default Providers;
