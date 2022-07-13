import type { NextPage } from 'next';
import { Button } from '@mui/material';
import useWallet from '@hooks/useWallet';

const Home: NextPage = () => {
  const { connect, disconnect, truncateAccount, isConnected } = useWallet();

  return (
    <div>
      <Button disableElevation variant="contained" onClick={isConnected ? disconnect : connect}>
        {isConnected ? `${truncateAccount}` : 'Connect'}
      </Button>
    </div>
  );
};

export default Home;
