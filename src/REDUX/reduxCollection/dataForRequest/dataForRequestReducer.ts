import { Reducer } from 'react';
import { ActionCreator } from 'redux';

enum DataForRequestActionTypes {
  PRESET_DISTRICTS = 'PRESET/DISTRICTS',
  PRESET_SUBJECTS = 'PRESET/SUBJECTS',
  PRESET_AREAS = 'PRESET/AREAS',
}

// Данные для запроса
const initialState: DataForRequestReducerState = {
  subject: null,
  area: null,
  district: null,
};

type SetDistrictAction = {
  type: DataForRequestActionTypes.PRESET_DISTRICTS;
  payload: any;
};

// Установить район для поиска
export const setDistrict: ActionCreator<SetDistrictAction> = (
  payload: any
) => ({
  type: DataForRequestActionTypes.PRESET_DISTRICTS,
  payload,
});

type SetSubjectAction = {
  type: DataForRequestActionTypes.PRESET_SUBJECTS;
  payload: any;
};

// Установить предмет для поиска
export const setSubject: ActionCreator<SetSubjectAction> = (payload: any) => ({
  type: DataForRequestActionTypes.PRESET_SUBJECTS,
  payload,
});

type SetAreaAction = {
  type: DataForRequestActionTypes.PRESET_AREAS;
  payload: any;
};

// Установить город для поиска
export const setArea: ActionCreator<SetAreaAction> = (payload: any) => ({
  type: DataForRequestActionTypes.PRESET_AREAS,
  payload,
});

type DataForRequestActions =
  | SetDistrictAction
  | SetSubjectAction
  | SetAreaAction;

export const dataForRequestReducer: Reducer<
  DataForRequestReducerState | any,
  DataForRequestActions
> = (state = initialState, action) => {
  switch (action.type) {
    case DataForRequestActionTypes.PRESET_SUBJECTS:
      return { ...state, subject: action.payload };
    case DataForRequestActionTypes.PRESET_AREAS:
      return { ...state, area: action.payload };
    case DataForRequestActionTypes.PRESET_DISTRICTS:
      return { ...state, district: action.payload };
    default:
      return state;
  }
};
