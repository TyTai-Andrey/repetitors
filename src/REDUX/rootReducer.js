import { combineReducers } from 'redux';
import { selectDataReducer } from './reduxCollection/secetData/selectDataReducer';
import { repetitorsReducer } from './reduxCollection/repetitors/repetitorsReducer';
import { dataForRequestReducer } from './reduxCollection/dataForRequest/dataForRequestReducer';

export const rootReducer = combineReducers({
  data: selectDataReducer,
  presetData: dataForRequestReducer,
  download: repetitorsReducer,
});
