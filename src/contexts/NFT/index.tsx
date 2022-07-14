import OpenSeaService from '@services/opensea';
import * as React from 'react';
import { ReducerActionType } from './actions';
import { initialState, nftReducer } from './reducer';
import { NFTReducer } from './types';

interface NFTActionsInt {
  fetchCollections: () => void;
  fetchMoreCollections: () => void;
  fetchAssets: (collectionSlug: string) => void;
  fetchMoreAssets: (collectionSlug: string) => void;
  fetchCollectionDetail: (slug: string) => void;
  resetCollectionDetail: () => void;
  onTextSearch: (term: string) => void;
  clearSearch: () => void;
}

type NFTContextInt = NFTReducer & NFTActionsInt;

const nftContext = React.createContext<NFTContextInt>({
  ...initialState,
  fetchCollections: () => {},
  fetchMoreCollections: () => {},
  fetchAssets: () => {},
  fetchMoreAssets: () => {},
  fetchCollectionDetail: () => {},
  resetCollectionDetail: () => {},
  onTextSearch: () => {},
  clearSearch: () => {},
});

type SearchOptions = {
  date?: Date;
  name?: string;
  description?: string;
};

const NFTProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = React.useReducer(nftReducer, initialState);

  const fetchCollections = React.useCallback(async () => {
    dispatch({ type: ReducerActionType.GETTING_COLLECTIONS });

    const result = await OpenSeaService.GetCollections({
      limit: state.size,
    });

    if (result.status === 200) {
      dispatch({ type: ReducerActionType.SUCCESS_GET_COLLECTIONS, payload: result.data.collections });
    } else {
      dispatch({ type: ReducerActionType.FAILED_GET_COLLECTIONS });
    }
  }, [state.size]);

  const fetchMoreCollections = React.useCallback(async () => {
    console.log(state.page);
    dispatch({ type: ReducerActionType.GETTING_MORE_COLLECTIONS });

    const result = await OpenSeaService.GetCollections({
      offset: state.page * state.size,
      limit: state.size,
    });

    if (result.status === 200) {
      dispatch({ type: ReducerActionType.SUCCESS_GET_MORE_COLLECTIONS, payload: result.data.collections });
    } else {
      dispatch({ type: ReducerActionType.FAILED_GET_MORE_COLLECTIONS });
    }
  }, [state.page, state.size]);

  const fetchAssets = React.useCallback(
    async (collectionSlug: string) => {
      dispatch({ type: ReducerActionType.GETTING_ASSETS });

      const result = await OpenSeaService.GetAssets({
        collection: collectionSlug,
        limit: state.size,
      });

      if (result.status === 200) {
        dispatch({
          type: ReducerActionType.SUCCESS_GET_ASSETS,
          payload: result.data.assets,
          hasMore: !!result.data.next,
        });
      } else {
        dispatch({ type: ReducerActionType.FAILED_GET_ASSETS });
      }
    },
    [state.size],
  );

  const fetchMoreAssets = React.useCallback(
    async (collectionSlug: string) => {
      dispatch({ type: ReducerActionType.LOADING_MORE_ASSETS });

      const result = await OpenSeaService.GetAssets({
        collection: collectionSlug,
        offset: state.page * state.size,
        limit: state.size,
      });

      if (result.status === 200) {
        dispatch({
          type: ReducerActionType.SUCCESS_LOAD_MORE_ASSETS,
          payload: result.data.assets,
          hasMore: !!result.data.next,
        });
      } else {
        dispatch({ type: ReducerActionType.FAILED_LOAD_MORE_ASSETS });
      }
    },
    [state.page, state.size],
  );

  const fetchCollectionDetail = React.useCallback(async (slug: string) => {
    dispatch({ type: ReducerActionType.GETTING_COLLECTION_DETAIL });

    const result = await OpenSeaService.GetCollection(slug);

    if (result.status === 200) {
      dispatch({
        type: ReducerActionType.SUCCESS_GET_COLLECTION_DETAIL,
        payload: result.data.collection,
        hasMore: !!result.data.next,
      });
    } else {
      dispatch({ type: ReducerActionType.FAILED_GET_COLLECTION_DETAIL });
    }
  }, []);

  const resetCollectionDetail = React.useCallback(
    () => dispatch({ type: ReducerActionType.RESET_COLLECTION_DETAIL }),
    [],
  );

  const onTextSearch = React.useCallback(
    (searchTerm: string) => {
      const upperCaseSearchTerm = searchTerm.toUpperCase();
      const filteredAssets = state.assets.filter((asset) => {
        const isNameRelated = asset.name.toUpperCase().includes(upperCaseSearchTerm);
        const isDescriptionRelated = asset.description.toUpperCase().includes(upperCaseSearchTerm);

        return isNameRelated || isDescriptionRelated;
      });

      dispatch({ type: ReducerActionType.SEARCH_ASSETS, payload: filteredAssets });
    },
    [state.assets],
  );

  const clearSearch = React.useCallback(() => {
    dispatch({ type: ReducerActionType.RESET_SEARCH_ASSETS });
  }, []);

  return (
    <nftContext.Provider
      value={{
        ...state,
        fetchCollections,
        fetchMoreCollections,
        fetchAssets,
        fetchMoreAssets,
        fetchCollectionDetail,
        resetCollectionDetail,
        onTextSearch,
        clearSearch,
      }}
    >
      {children}
    </nftContext.Provider>
  );
};

export default NFTProvider;
export const useNFT = () => {
  return React.useContext(nftContext);
};
