export type Asset = {
  id: string;
  token_id: string;
  image_url: string;
  image_preview_url: string;
  image_original_url: string;
  name: string;
  description: string;
  external_link: string;
  asset_contract: {
    address: string;
    created_date: string;
    name: string;
  };
  owner: {
    profile_img_url: string;
    address: string;
  };
  traits: Array<{
    trait_type: string;
    value: number;
    trait_count: number;
  }>;
};

export type Collection = {
  created_date: string;
  description: string;
  image_url: string;
  large_image_url: string;
  name: string;
  slug: string;
};

export interface NFTReducer {
  page: number;
  size: number;
  collections: Array<Collection>;
  assets: Array<Asset>;
  isCollectionsLoading: boolean;
  isAssetsLoading: boolean;
  isLoadingMore: boolean;
  search: {
    cost: number | undefined;
    date: Date | undefined;
  };
}
