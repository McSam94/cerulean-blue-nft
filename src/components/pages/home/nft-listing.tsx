import * as React from 'react';
import { Stack } from '@mui/material';
import { useNFT } from '@contexts/NFT';
import ThumbGrid from '@components/common/ThumbGrid';

const NftListing: React.FC = () => {
  const { fetchCollections, fetchMoreCollections, collections, isLoadingMore } = useNFT();

  React.useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return (
    <ThumbGrid
      data={collections}
      isLoadingMore={isLoadingMore}
      loadMoreItems={fetchMoreCollections}
      rowRender={({ index, style }) => (
        <Stack direction="row" alignItems="center" spacing={2} style={style}>
          {collections[index]?.name}
        </Stack>
      )}
    />
  );
};

export default NftListing;
