import ApiUtils from './base';

const { get } = ApiUtils;

type ApiParam = { [x: string]: string | number };

const OpenSeaService = {
  GetCollections: (params?: ApiParam) => get('/collections', params ? { params } : undefined),
  GetCollection: (slug: string) => get(`/collection/${slug}`),
  GetAssets: (params?: ApiParam) => get('/assets', params ? { params } : undefined),
};

export default OpenSeaService;
