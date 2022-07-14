import CollectionListing from '@components/pages/home/collection-listing';
import { Stack } from '@mui/material';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Stack width="100%" height="100%">
      <CollectionListing />
    </Stack>
  );
};

export default Home;
