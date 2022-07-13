import * as React from 'react';
import { Button } from '@mui/material';
import useWallet from '@hooks/useWallet';

const WalletButton: React.FC = () => {
  const { connect, disconnect, truncateAccount, isConnected } = useWallet();

  return (
    <Button disableElevation variant="contained" onClick={isConnected ? disconnect : connect}>
      {isConnected ? `${truncateAccount}` : 'Connect'}
    </Button>
  );
};

export default WalletButton;
