import { Reducer } from 'react';
import { ActionCreator } from 'redux';

enum LoadingActionTypes {
  SET_START_LOADING = 'LOADING/SET_START_LOADING',
  SET_ERROR_LOADING = 'LOADING/SET_ERROR_LOADING',
  SET_SUCCESSFUL_LOADING = 'LOADING/SET_SUCCESSFUL_LOADING',
}

// Данные для запроса
const initialState: LoadingReducerState = {
  loading: false,
  error: false,
};

type SetStartLoadingAction = {
  type: LoadingActionTypes.SET_START_LOADING;
};

// Установить район для поиска
export const setStartLoading: ActionCreator<SetStartLoadingAction> = () => ({
  type: LoadingActionTypes.SET_START_LOADING,
});

type SetSuccessfulLoadingAction = {
  type: LoadingActionTypes.SET_SUCCESSFUL_LOADING;
};

// Установить район для поиска
export const setSuccessfulLoading: ActionCreator<
  SetSuccessfulLoadingAction
> = () => ({
  type: LoadingActionTypes.SET_SUCCESSFUL_LOADING,
});

type SetErrorLoadingAction = {
  type: LoadingActionTypes.SET_ERROR_LOADING;
};

// Установить район для поиска
export const setErrorLoading: ActionCreator<SetErrorLoadingAction> = () => ({
  type: LoadingActionTypes.SET_ERROR_LOADING,
});

type LoadingActions =
  | SetStartLoadingAction
  | SetSuccessfulLoadingAction
  | SetErrorLoadingAction;

export const loadingReducer: Reducer<
  LoadingReducerState | any,
  LoadingActions
> = (state = initialState, action) => {
  switch (action.type) {
    case LoadingActionTypes.SET_START_LOADING:
      return { ...state, loading: true, error: false };
    case LoadingActionTypes.SET_SUCCESSFUL_LOADING:
      return { ...state, loading: false, error: false };
    case LoadingActionTypes.SET_ERROR_LOADING:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
