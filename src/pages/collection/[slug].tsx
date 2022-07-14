import * as React from 'react';
import { NextPage, NextPageContext } from 'next';
import { IconButton, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import ClearIcon from '@mui/icons-material/Clear';
import AssetListing from '@components/pages/collection/asset-listing';
import { useNFT } from '@contexts/NFT';
import SafeImage from '@components/common/SafeImage';
import StatBox from '@components/pages/collection/stat-box';
import { Collection as Collection } from '@contexts/NFT/types';
import OpenSeaService from '@services/opensea';

const CollectionDetail: NextPage<{ collection: Collection }> = ({ collection }) => {
  const { query } = useRouter();
  const { resetCollectionDetail, onTextSearch, clearSearch, isCollectionDetailLoading } = useNFT();

  const [searchTerm, setSearchTerm] = React.useState<string>('');

  const collectionSlug = React.useMemo(() => {
    const slug = query?.slug;

    return typeof slug === 'string' ? slug : slug?.[0] ?? '';
  }, [query]);

  const onSearch = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {
        target: { value },
      } = event;
      setSearchTerm(value);
      onTextSearch(value);
    },
    [onTextSearch],
  );

  const onSearchClear = React.useCallback(() => {
    setSearchTerm('');
    clearSearch();
  }, [clearSearch]);

  React.useEffect(() => {
    return () => {
      resetCollectionDetail();
    };
  }, [resetCollectionDetail]);

  return (
    <Stack width="100%">
      <Stack width="100%" height={350} position="relative">
        <SafeImage
          src={collection?.banner_image_url}
          isSrcLoading={isCollectionDetailLoading}
          layout="fill"
          objectFit="cover"
        />
      </Stack>
      <Stack paddingX={{ xs: 2, sm: 8 }}>
        <Stack width="100%" alignItems="center" paddingX={{ xs: 0, sm: 8 }} spacing={4}>
          <Stack position="relative" width={160} height={160} marginTop={-12}>
            <SafeImage
              style={{ borderRadius: 12 }}
              src={collection?.image_url}
              isSrcLoading={isCollectionDetailLoading}
              defaultSrc="/placeholder/avatar-default.png"
              layout="fill"
              objectFit="contain"
            />
          </Stack>
          <Typography variant="h4" fontWeight={700} textAlign="center">
            {collection?.name}
          </Typography>
          <Typography variant="subtitle1">{collection?.description || '-'}</Typography>
          <Stack direction="row" alignItems="center" justifyContent="center" flexWrap="wrap" spacing={{ xs: 0, sm: 2 }}>
            <StatBox icon="storefront" stat={collection?.stats.count ?? 0} label="Items" />
            <StatBox icon="group" stat={collection?.stats.num_owners ?? 0} label="Owners" />
            <StatBox icon="local_bar" stat={collection?.stats.total_volume ?? 0} label="Total Volume" />
            <StatBox icon="sell" stat={collection?.stats.total_sales ?? 0} label="Total Sales" />
          </Stack>
        </Stack>
        <Stack direction="row" paddingY={2} height="100%">
          <Stack flex={1}>
            <OutlinedInput
              placeholder="Search name"
              color="secondary"
              onChange={onSearch}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onSearchClear} edge="end">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              }
              value={searchTerm}
            />
            <AssetListing />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

CollectionDetail.getInitialProps = async (context: NextPageContext) => {
  const collectionSlug = context.query.slug;

  const slug = typeof collectionSlug === 'string' ? collectionSlug : collectionSlug?.[0] ?? '';

  const result = await OpenSeaService.GetCollection(slug);
  const collection: Collection = result.data.collection;

  return { collection };
};

export default CollectionDetail;
