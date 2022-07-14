import * as React from 'react';
import { Avatar, Stack, Typography } from '@mui/material';
import { useNFT } from '@contexts/NFT';
import ThumbGrid from '@components/common/ThumbGrid';
import SafeImage from '@components/common/SafeImage';
import Link from 'next/link';

const LIST_ITEM_HEIGHT = 300;
const COLUMN_COUNT = 3;

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
      columnCount={COLUMN_COUNT}
      rowHeight={LIST_ITEM_HEIGHT}
      header={({ style }) => (
        <Stack justifyContent="center" alignItems="center" style={style}>
          <Typography variant="h2" component="div" fontWeight="500" textAlign="center">
            NFT Collections
          </Typography>
        </Stack>
      )}
      gridRenderer={({ index }) => {
        const collection = collections[index];

        if (!collection) return null;

        const { image_url, name, slug, primary_asset_contracts } = collection;

        return (
          <Link href={`/collection/${slug}`} passHref>
            <a>
              <Stack
                alignItems="center"
                borderRadius={2}
                height={LIST_ITEM_HEIGHT}
                sx={{ cursor: 'pointer', boxShadow: '0px 4px 12px 2px #0000000D;' }}
              >
                <Stack height={LIST_ITEM_HEIGHT * (2 / 3)} width="100%" position="relative">
                  <SafeImage
                    style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
                    src={image_url}
                    defaultSrc="/placeholder/collection-default.png"
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                  />
                </Stack>
                <Stack direction="row" width="100%" alignItems="center" paddingY={2} paddingX={4} spacing={4}>
                  <Avatar
                    variant="rounded"
                    alt={primary_asset_contracts?.[0]?.name}
                    src={primary_asset_contracts?.[0]?.image_url ?? '/placeholder/avatar-default.png'}
                    sx={{ width: 80, height: 80, marginTop: '-50px' }}
                  />
                  <Typography variant="subtitle1" fontWeight={500}>
                    {name}
                  </Typography>
                </Stack>
              </Stack>
            </a>
          </Link>
        );
      }}
    />
  );
};

export default NftListing;
