import * as React from 'react';
import { useRouter } from 'next/router';
import ThumbGrid from '@components/common/ThumbGrid';
import { useNFT } from '@contexts/NFT';
import { Stack, Typography } from '@mui/material';
import SafeImage from '@components/common/SafeImage';

const LIST_ITEM_HEIGHT = 300;
const COLUMN_COUNT = 3;

const AssetListing: React.FC = () => {
  const { query } = useRouter();
  const { fetchAssets, fetchMoreAssets, isSearch, assets, filteredAssets, isLoadingMore, hasMoreAssets } = useNFT();
  console.log('🚀 ~ file: asset-listing.tsx ~ line 14 ~ assets', assets);

  const data = React.useMemo(() => (isSearch ? filteredAssets : assets), [isSearch, filteredAssets, assets]);

  const collectionSlug = React.useMemo(() => {
    const slug = query?.slug;

    return typeof slug === 'string' ? slug : slug?.[0] ?? '';
  }, [query]);

  React.useEffect(() => {
    if (!collectionSlug) return;

    fetchAssets(collectionSlug);
  }, [collectionSlug, fetchAssets]);

  return (
    <ThumbGrid
      data={data}
      height={500}
      isLoadingMore={isLoadingMore}
      loadMoreItems={() => fetchMoreAssets(collectionSlug)}
      columnCount={COLUMN_COUNT}
      rowHeight={LIST_ITEM_HEIGHT}
      hasMore={hasMoreAssets && !isSearch}
      gridRenderer={({ index }) => {
        const asset = assets[index];

        if (!asset) return null;

        const { image_url, name } = asset;
        return (
          <Stack
            alignItems="center"
            borderRadius={2}
            height={LIST_ITEM_HEIGHT}
            boxShadow="0px 4px 12px 2px #0000000D"
            sx={{ cursor: 'pointer' }}
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
              <Typography variant="subtitle1" fontWeight={500}>
                {name}
              </Typography>
            </Stack>
          </Stack>
        );
      }}
    />
  );
};

export default AssetListing;
