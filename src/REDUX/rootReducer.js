import { combineReducers } from 'redux';
import { selectDataReducer } from './reduxCollection/secetData/selectDataReducer';
import {
  PRESET_DISTRICTS,
  PRESET_SUBJECTS,
  PRESET_AREAS,
  DOWNLOAD_ID,
  DOWNLOAD,
  DOWNLOAD_MORE,
} from './types';

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

// Массив с информацией о репетиторах для карточек и массив с ID репетиторов
const initialDownloadState = {
  repetitorsID: [],
  repetitors: [],
};

function downloadReducer(state = initialDownloadState, action) {
  switch (action.type) {
    case DOWNLOAD_ID:
      return { ...state, repetitorsID: action.payload };
    case DOWNLOAD:
      return { ...state, repetitors: action.payload };
    case DOWNLOAD_MORE:
      return {
        ...state,
        repetitors: [...state.repetitors].concat(action.payload),
      };
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  data: selectDataReducer,
  presetData: presetDataReducer,
  download: downloadReducer,
});
