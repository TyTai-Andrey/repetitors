import { Reducer } from 'react';
import { ActionCreator } from 'redux';
import getCardTeachers from '../../../services/getCardTeachers';
import getTeacherIds from '../../../services/getTeacherIds';
import { AppDispatch } from '../../rootReducer';
import {
  setErrorLoading,
  setStartLoading,
  setSuccessfulLoading,
} from '../loading/loadingReducer';

enum RepetitorsActionTypes {
  ADD_MORE_REPETITORS = 'repetitors/ADD_MORE_REPETITORS',
  SET_REPETITORS_ID = 'repetitors/SET_REPETITORS_ID',
  DOWNLOAD = 'repetitors/DOWNLOAD',
}

// Массив с информацией о репетиторах для карточек и массив с ID репетиторов
const initialState: RepetitorsReducerState = {
  repetitorsID: [],
  repetitors: [],
};

type SetRepetitorsAction = {
  type: RepetitorsActionTypes.DOWNLOAD;
  payload: any;
};

// Записать массив с предметами
export const setRepetitors: ActionCreator<SetRepetitorsAction> = (
  payload: any
) => ({
  type: RepetitorsActionTypes.DOWNLOAD,
  payload,
});

type SetRepetitorsIdAction = {
  type: RepetitorsActionTypes.SET_REPETITORS_ID;
  payload: any;
};

// Записать массив с предметами
export const setRepetitorsId: ActionCreator<SetRepetitorsIdAction> = (
  payload: any
) => ({
  type: RepetitorsActionTypes.SET_REPETITORS_ID,
  payload,
});

type AddMoreRepetitorsAction = {
  type: RepetitorsActionTypes.ADD_MORE_REPETITORS;
  payload: any[];
};

// Записать массив с предметами
export const addMoreRepetitors: ActionCreator<AddMoreRepetitorsAction> = (
  payload: any[]
) => ({
  type: RepetitorsActionTypes.ADD_MORE_REPETITORS,
  payload,
});

// Запросить ID преподавателей и вывести 10 (или меньше)
export const downloadId =
  (URL: string | number) => async (dispatch: AppDispatch) => {
    dispatch(setStartLoading());
    const teacherIds = await getTeacherIds(URL);
    if (teacherIds) {
      // Для запроса репетиторов по их ID
      let PATH_repetitorsID = [];

      // Если пришло 10 или меньше ID
      if (teacherIds.length <= 10) {
        for (let i = 0; i < teacherIds.length; ++i) {
          PATH_repetitorsID.push(`Ids[${i}]=${teacherIds[i]}`);
        }
        dispatch(setRepetitorsId([]));
        // Если пришло более 10 id
      } else {
        const repetitorsID_10 = teacherIds.splice(0, 10);

        for (let i = 0; i < repetitorsID_10.length; ++i) {
          PATH_repetitorsID.push(`Ids[${i}]=${repetitorsID_10[i]}`);
        }

        // Сохнанить id репетиторов, кроме первых 10
        dispatch(setRepetitorsId(teacherIds));
      }

      // Запросить информацию о 10 репетиторах (или меньше)
      const cardsTeachers = await getCardTeachers(PATH_repetitorsID);
      if (cardsTeachers) {
        // Сохнанить 10 репетиторов (или меньше)
        dispatch(setRepetitors(cardsTeachers));
        dispatch(setSuccessfulLoading());
      }
    } else {
      dispatch(setErrorLoading());
    }
  };

//Загрузить ещё карточек
export const getMoreRepetitors =
  (arrayID: any) => async (dispatch: AppDispatch) => {
    dispatch(setStartLoading());

    let PATH_repetitorsID = [];

    if (arrayID.length <= 10) {
      for (let i = 0; i < arrayID.length; ++i) {
        PATH_repetitorsID.push(`Ids[${i}]=${arrayID[i]}`);
      }
      dispatch(setRepetitorsId([]));
    } else {
      const repetitorsID_10 = arrayID.splice(0, 10);

      for (let i = 0; i < repetitorsID_10.length; ++i) {
        PATH_repetitorsID.push(`Ids[${i}]=${repetitorsID_10[i]}`);
      }
      dispatch(setRepetitorsId(arrayID));
    }
    const cardsTeachers = await getCardTeachers(PATH_repetitorsID);
    if (cardsTeachers) {
      dispatch(addMoreRepetitors(cardsTeachers));
      dispatch(setSuccessfulLoading());
    } else {
      dispatch(setErrorLoading());
    }
  };

type RepetitorsActions =
  | SetRepetitorsAction
  | SetRepetitorsIdAction
  | AddMoreRepetitorsAction;

export const repetitorsReducer: Reducer<
  RepetitorsReducerState | any,
  RepetitorsActions
> = (state = initialState, action) => {
  switch (action.type) {
    case RepetitorsActionTypes.SET_REPETITORS_ID:
      return { ...state, repetitorsID: action.payload };
    case RepetitorsActionTypes.DOWNLOAD:
      return { ...state, repetitors: action.payload };
    case RepetitorsActionTypes.ADD_MORE_REPETITORS:
      return {
        ...state,
        repetitors: [...state.repetitors].concat(action.payload),
      };
    default:
      return state;
  }
};
