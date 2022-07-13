import ApiUtils from './base';

const { get } = ApiUtils;

const OpenSeaService = {
  GetCollections: (params?: { [x: string]: string | number }) => get('/collections', params ? { params } : undefined),
  GetAssets: (params?: { [x: string]: string | number }) => get('/assets', params ? { params } : undefined),
};

export default OpenSeaService;
