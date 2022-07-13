import FilterPanel from '@components/pages/home/filter-panel';
import NFTListing from '@components/pages/home/nft-listing';
import { Stack } from '@mui/material';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Stack direction="row" width="100%">
      <Stack flex={1}>
        <NFTListing />
      </Stack>
      <Stack flexBasis="25%">
        <FilterPanel />
      </Stack>
    </Stack>
  );
};

export default Home;
