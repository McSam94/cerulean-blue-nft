import { ReducerAction, ReducerActionType } from './actions';
import { NFTReducer } from './types';

export const initialState: NFTReducer = {
  page: 1,
  size: 50,
  collections: [],
  assets: [],
  isCollectionsLoading: false,
  isAssetsLoading: false,
  isLoadingMore: false,
  search: {
    cost: undefined,
    date: undefined,
  },
};

export const nftReducer: React.Reducer<NFTReducer, ReducerAction> = (state = initialState, action) => {
  switch (action.type) {
    case ReducerActionType.GETTING_COLLECTIONS: {
      return {
        ...state,
        page: 1,
        isCollectionsLoading: true,
      };
    }
    case ReducerActionType.SUCCESS_GET_COLLECTIONS: {
      return {
        ...state,
        page: 1,
        collections: [...state.collections, ...action.payload],
        isCollectionsLoading: false,
      };
    }
    case ReducerActionType.GETTING_ASSETS: {
      return {
        ...state,
        page: 1,
        isLoading: true,
      };
    }
    case ReducerActionType.SUCCESS_GET_ASSETS: {
      return {
        ...state,
        page: 1,
        assets: [...state.assets, ...action.payload],
        isLoading: false,
      };
    }
    case ReducerActionType.FAILED_GET_ASSETS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case ReducerActionType.LOADING_MORE_ASSETS:
    case ReducerActionType.GETTING_MORE_COLLECTIONS: {
      return {
        ...state,
        isLoadingMore: true,
      };
    }
    case ReducerActionType.SUCCESS_GET_MORE_COLLECTIONS: {
      return {
        ...state,
        page: state.page + 1,
        collections: [...state.collections, ...action.payload],
        isLoadingMore: false,
      };
    }
    case ReducerActionType.SUCCESS_LOAD_MORE_ASSETS: {
      return {
        ...state,
        page: state.page + 1,
        assets: [...state.assets, ...action.payload],
        isLoadingMore: false,
      };
    }
    case ReducerActionType.FAILED_LOAD_MORE_ASSETS:
    case ReducerActionType.FAILED_GET_MORE_COLLECTIONS: {
      return {
        ...state,
        isLoadingMore: false,
      };
    }
    case ReducerActionType.SEARCH_ASSETS: {
      return {
        ...state,
        search: {
          ...state.search,
          ...action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};
