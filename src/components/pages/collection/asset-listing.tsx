import * as React from 'react';
import { useRouter } from 'next/router';
import ThumbGrid from '@components/common/ThumbGrid';
import { useNFT } from '@contexts/NFT';
import { Stack, Typography } from '@mui/material';
import SafeImage from '@components/common/SafeImage';
import Image from 'next/image';
import useResponsive from '@hooks/useResponsive';

const LIST_ITEM_HEIGHT = 300;

const AssetListing: React.FC = () => {
  const { query } = useRouter();
  const { isMobile, isTablet } = useResponsive();
  const { fetchAssets, fetchMoreAssets, isSearch, assets, filteredAssets, isLoadingMore, hasMoreAssets } = useNFT();

  const data = React.useMemo(() => (isSearch ? filteredAssets : assets), [isSearch, filteredAssets, assets]);

  const columnCount = React.useMemo(() => {
    if (isMobile) return 1;

    if (isTablet) return 2;

    return 3;
  }, [isMobile, isTablet]);

  const collectionSlug = React.useMemo(() => {
    const slug = query?.slug;

    return typeof slug === 'string' ? slug : slug?.[0] ?? '';
  }, [query]);

  React.useEffect(() => {
    if (!collectionSlug) return;

    fetchAssets(collectionSlug);
  }, [collectionSlug, fetchAssets]);

  return (
    <>
      {data.length > 0 ? (
        <ThumbGrid
          data={data}
          height={Math.ceil(data.length / columnCount) * LIST_ITEM_HEIGHT}
          isLoadingMore={isLoadingMore}
          loadMoreItems={() => fetchMoreAssets(collectionSlug)}
          columnCount={columnCount}
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
                    {name ?? 'Unknown'}
                  </Typography>
                </Stack>
              </Stack>
            );
          }}
        />
      ) : (
        <Stack alignItems="center" justifyContent="center" height={300} spacing={2}>
          <Image src="/icons/empty.svg" alt="empty" width={80} height={80} layout="fixed" />
          <Typography variant="h6" color="GrayText">
            No assets found
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default AssetListing;
