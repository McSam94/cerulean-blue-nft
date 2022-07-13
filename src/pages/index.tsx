import NFTListing from '@components/pages/home/nft-listing';
import { Stack } from '@mui/material';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Stack direction="row" width="100%" height="100%">
      <NFTListing />
    </Stack>
  );
};

export default Home;
