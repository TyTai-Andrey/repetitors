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

//   Без понятия почему, но выбивает с ошибку с этим редюсером и с repetitorsReducer

// No overload matches this call.
//   Overload 1 of 3, '(reducers: ReducersMapObject<AppState, any>): Reducer<CombinedState<AppState>, AnyAction>', gave the following error.
//     Type 'Reducer<DataForRequestReducerState, DataForRequestActions>' is not assignable to type 'Reducer<DataForRequestReducerState, any>'.
//       Types of parameters 'prevState' and 'state' are incompatible.
//         Type 'DataForRequestReducerState | undefined' is not assignable to type 'DataForRequestReducerState'.
//           Type 'undefined' is not assignable to type 'DataForRequestReducerState'.

//   selectDataReducer прекрасно работает и без этого any и раньше писал и всё было хорошо. Может не вижу чего-то....но вроде всё правильно....

//   ну, всё правильно, кроме этого any

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
