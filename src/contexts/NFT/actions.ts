import { Asset, Collection } from './types';

export enum ReducerActionType {
  GETTING_COLLECTIONS,
  SUCCESS_GET_COLLECTIONS,
  FAILED_GET_COLLECTIONS,
  GETTING_MORE_COLLECTIONS,
  SUCCESS_GET_MORE_COLLECTIONS,
  FAILED_GET_MORE_COLLECTIONS,
  GETTING_COLLECTION_DETAIL,
  SUCCESS_GET_COLLECTION_DETAIL,
  FAILED_GET_COLLECTION_DETAIL,
  RESET_COLLECTION_DETAIL,
  GETTING_ASSETS,
  SUCCESS_GET_ASSETS,
  FAILED_GET_ASSETS,
  LOADING_MORE_ASSETS,
  SUCCESS_LOAD_MORE_ASSETS,
  FAILED_LOAD_MORE_ASSETS,
  SEARCH_ASSETS,
  RESET_SEARCH_ASSETS,
}

export type startFetchCollections = {
  type: ReducerActionType.GETTING_COLLECTIONS;
};

export type fetchedCollections = {
  type: ReducerActionType.SUCCESS_GET_COLLECTIONS;
  payload: Array<Collection>;
};

export type failedFetchCollections = {
  type: ReducerActionType.FAILED_GET_COLLECTIONS;
};

export type startFetchMoreCollections = {
  type: ReducerActionType.GETTING_MORE_COLLECTIONS;
};

export type fetchedMoreCollections = {
  type: ReducerActionType.SUCCESS_GET_MORE_COLLECTIONS;
  payload: Array<Collection>;
};

export type failedFetchMoreCollections = {
  type: ReducerActionType.FAILED_GET_MORE_COLLECTIONS;
};

export type startFetchCollectionDetail = {
  type: ReducerActionType.GETTING_COLLECTION_DETAIL;
};

export type fetchedCollectionDetail = {
  type: ReducerActionType.SUCCESS_GET_COLLECTION_DETAIL;
  payload: Collection;
  hasMore: boolean;
};

export type failedFetchCollectionDetail = {
  type: ReducerActionType.FAILED_GET_COLLECTION_DETAIL;
};

export type resetCollectionDetail = {
  type: ReducerActionType.RESET_COLLECTION_DETAIL;
};

export type startFetchAssetsAction = {
  type: ReducerActionType.GETTING_ASSETS;
};

export type fetchedAssetsAction = {
  type: ReducerActionType.SUCCESS_GET_ASSETS;
  payload: Array<Asset>;
  hasMore: boolean;
};

export type failedFetchAssetsAction = {
  type: ReducerActionType.FAILED_GET_ASSETS;
};

export type startFetchMoreAssetsAction = {
  type: ReducerActionType.LOADING_MORE_ASSETS;
};

export type fetchedMoreAssets = {
  type: ReducerActionType.SUCCESS_LOAD_MORE_ASSETS;
  payload: Array<Asset>;
  hasMore: boolean;
};

export type failedFetchMoreAssets = {
  type: ReducerActionType.FAILED_LOAD_MORE_ASSETS;
};

export type searchAssets = {
  type: ReducerActionType.SEARCH_ASSETS;
  payload: Array<Asset>;
};

export type resetSearchAssets = {
  type: ReducerActionType.RESET_SEARCH_ASSETS;
};

export type ReducerAction =
  | startFetchCollections
  | fetchedCollections
  | failedFetchCollections
  | startFetchMoreCollections
  | fetchedMoreCollections
  | failedFetchMoreCollections
  | startFetchCollectionDetail
  | fetchedCollectionDetail
  | failedFetchCollectionDetail
  | resetCollectionDetail
  | startFetchAssetsAction
  | fetchedAssetsAction
  | failedFetchAssetsAction
  | startFetchMoreAssetsAction
  | fetchedMoreAssets
  | failedFetchMoreAssets
  | searchAssets
  | resetSearchAssets;
