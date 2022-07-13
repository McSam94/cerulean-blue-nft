import { Asset, Collection } from './types';

export enum ReducerActionType {
  GETTING_COLLECTIONS,
  SUCCESS_GET_COLLECTIONS,
  FAILED_GET_COLLECTIONS,
  GETTING_MORE_COLLECTIONS,
  SUCCESS_GET_MORE_COLLECTIONS,
  FAILED_GET_MORE_COLLECTIONS,
  GETTING_ASSETS,
  SUCCESS_GET_ASSETS,
  FAILED_GET_ASSETS,
  LOADING_MORE_ASSETS,
  SUCCESS_LOAD_MORE_ASSETS,
  FAILED_LOAD_MORE_ASSETS,
  SEARCH_ASSETS,
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

export type startFetchAssetsAction = {
  type: ReducerActionType.GETTING_ASSETS;
};

export type fetchedAssetsAction = {
  type: ReducerActionType.SUCCESS_GET_ASSETS;
  payload: Array<Asset>;
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
};

export type failedFetchMoreAssets = {
  type: ReducerActionType.FAILED_LOAD_MORE_ASSETS;
};

export type searchAssets = {
  type: ReducerActionType.SEARCH_ASSETS;
  payload: { [x: string]: any };
};

export type ReducerAction =
  | startFetchCollections
  | fetchedCollections
  | failedFetchCollections
  | startFetchMoreCollections
  | fetchedMoreCollections
  | failedFetchMoreCollections
  | startFetchAssetsAction
  | fetchedAssetsAction
  | failedFetchAssetsAction
  | startFetchMoreAssetsAction
  | fetchedMoreAssets
  | failedFetchMoreAssets
  | searchAssets;
