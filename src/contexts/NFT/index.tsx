import OpenSeaService from '@services/opensea';
import * as React from 'react';
import { ReducerActionType } from './actions';
import { initialState, nftReducer } from './reducer';
import { NFTReducer } from './types';

interface NFTActionsInt {
  fetchCollections: () => void;
  fetchMoreCollections: () => void;
  fetchAssets: () => void;
  fetchMoreAssets: () => void;
}

type NFTContextInt = NFTReducer & NFTActionsInt;

const nftContext = React.createContext<NFTContextInt>({
  ...initialState,
  fetchCollections: () => {},
  fetchMoreCollections: () => {},
  fetchAssets: () => {},
  fetchMoreAssets: () => {},
});

const NFTProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = React.useReducer(nftReducer, initialState);

  const fetchCollections = React.useCallback(async () => {
    dispatch({ type: ReducerActionType.GETTING_COLLECTIONS });

    const result = await OpenSeaService.GetCollections({
      limit: state.size,
    });

    if (result.status === 200) {
      console.log(result.data.collections);
      dispatch({ type: ReducerActionType.SUCCESS_GET_COLLECTIONS, payload: result.data.collections });
    } else {
      dispatch({ type: ReducerActionType.FAILED_GET_COLLECTIONS });
    }
  }, [state.size]);

  const fetchMoreCollections = React.useCallback(async () => {
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

  const fetchAssets = React.useCallback(async () => {
    dispatch({ type: ReducerActionType.GETTING_ASSETS });

    const result = await OpenSeaService.GetAssets();

    if (result.status === 200) {
      dispatch({ type: ReducerActionType.SUCCESS_GET_ASSETS, payload: result.data.assets });
    } else {
      dispatch({ type: ReducerActionType.FAILED_GET_ASSETS });
    }
  }, []);

  const fetchMoreAssets = React.useCallback(async () => {
    dispatch({ type: ReducerActionType.LOADING_MORE_ASSETS });

    const result = await OpenSeaService.GetAssets({
      offset: state.page * state.size,
      limit: state.size,
    });

    if (result.status === 200) {
      dispatch({ type: ReducerActionType.SUCCESS_LOAD_MORE_ASSETS, payload: result.data.assets });
    } else {
      dispatch({ type: ReducerActionType.FAILED_LOAD_MORE_ASSETS });
    }
  }, [state.page, state.size]);

  return (
    <nftContext.Provider value={{ ...state, fetchCollections, fetchMoreCollections, fetchAssets, fetchMoreAssets }}>
      {children}
    </nftContext.Provider>
  );
};

export default NFTProvider;
export const useNFT = () => {
  return React.useContext(nftContext);
};
