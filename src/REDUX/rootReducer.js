import { combineReducers } from 'redux';
import { selectDataReducer } from './reduxCollection/secetData/selectDataReducer';
import { repetitorsReducer } from './reduxCollection/repetitors/repetitorsReducer';
import { PRESET_DISTRICTS, PRESET_SUBJECTS, PRESET_AREAS } from './types';

// Данные для запроса
const initialPresetDataState = {
  subject: 'default',
  area: 'default',
  district: 'default',
};

function presetDataReducer(state = initialPresetDataState, action) {
  switch (action.type) {
    case PRESET_SUBJECTS:
      return { ...state, subject: action.payload };
    case PRESET_AREAS:
      return { ...state, area: action.payload };
    case PRESET_DISTRICTS:
      return { ...state, district: action.payload };
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  data: selectDataReducer,
  presetData: presetDataReducer,
  download: repetitorsReducer,
});
