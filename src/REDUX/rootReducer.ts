import { AnyAction, combineReducers } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { selectDataReducer } from './reduxCollection/secetData/selectDataReducer';
import { repetitorsReducer } from './reduxCollection/repetitors/repetitorsReducer';
import { dataForRequestReducer } from './reduxCollection/dataForRequest/dataForRequestReducer';
import { loadingReducer } from './reduxCollection/loading/loadingReducer';

export type AppDispatch = ThunkDispatch<AppState, any, AnyAction>;

const rootReducer = combineReducers<AppState>({
  selectDataReducer,
  repetitorsReducer,
  dataForRequestReducer,
  loadingReducer,
});

export { rootReducer };
