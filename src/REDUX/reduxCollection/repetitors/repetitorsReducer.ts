import { Reducer } from 'react';
import { ActionCreator } from 'redux';


enum RepetitorsActionTypes {
    DOWNLOAD_MORE = 'DOWNLOAD_MORE',
    DOWNLOAD_ID = 'DOWNLOAD_ID',
    DOWNLOAD = 'DOWNLOAD',
  }

// Массив с информацией о репетиторах для карточек и массив с ID репетиторов
const initialState: RepetitorsReducerState = {
    repetitorsID: [],
    repetitors: [],
  };
  

  type SetRepetitorsAction = {
    type: RepetitorsActionTypes.DOWNLOAD;
    payload: any
  };
  
  // Записать массив с предметами
  export const setRepetitors: ActionCreator<SetRepetitorsAction> = (payload: any) => ({
    type: RepetitorsActionTypes.DOWNLOAD,
    payload
  });

  type SetRepetitorsIdAction = {
    type: RepetitorsActionTypes.DOWNLOAD_ID;
    payload: any
  };
  
  // Записать массив с предметами
  export const setRepetitorsId: ActionCreator<SetRepetitorsIdAction> = (payload: any) => ({
    type: RepetitorsActionTypes.DOWNLOAD_ID,
    payload
  });

  type addMoreRepetitorsAction = {
    type: RepetitorsActionTypes.DOWNLOAD_MORE;
    payload: any
  };
  
  // Записать массив с предметами
  export const addMoreRepetitors: ActionCreator<addMoreRepetitorsAction> = (payload: any) => ({
    type: RepetitorsActionTypes.DOWNLOAD_MORE,
    payload
  });

  // Запросить ID преподавателей и вывести 10 (или меньше)
export function downloadId(URL: string | number) {
    return async (dispatch: any) => {
      const response = await fetch(
        `https://api.repetit.ru/public/search/teacherIds?${URL}`
      );
      let json = await response.json();
  
      // Для запроса репетиторов по их ID
      let PATH_repetitorsID = [];
  
      // Если пришло 10 или меньше ID
      if (json.length <= 10) {
        for (let i = 0; i < json.length; ++i) {
          PATH_repetitorsID.push(`Ids[${i}]=${json[i]}`);
        }
        dispatch(setRepetitorsId([]))
        // Если пришло более 10 id
      } else {
        const repetitorsID_10 = json.splice(0, 10);
  
        for (let i = 0; i < repetitorsID_10.length; ++i) {
          PATH_repetitorsID.push(`Ids[${i}]=${repetitorsID_10[i]}`);
        }
  
        // Сохнанить id репетиторов, кроме первых 10
        dispatch(setRepetitorsId(json))
      }
  
      // Запросить информацию о 10 репетиторах (или меньше)
      const response_2 = await fetch(
        `http://api.repetit.ru/public/teachers/short?${PATH_repetitorsID.join(
          '&'
        )}`
      );
      let json_2 = await response_2.json();
  
      // Сохнанить 10 репетиторов (или меньше)
      dispatch(setRepetitors(json_2))
    };
  }
  
  //Загрузить ещё карточек
  export function download_More(arrayID: any) {
    return async (dispatch: any) => {
      let PATH_repetitorsID = [];
  
      if (arrayID.length <= 10) {
        for (let i = 0; i < arrayID.length; ++i) {
          PATH_repetitorsID.push(`Ids[${i}]=${arrayID[i]}`);
        }
        dispatch(setRepetitorsId([]))
      } else {
        const repetitorsID_10 = arrayID.splice(0, 10);
  
        for (let i = 0; i < repetitorsID_10.length; ++i) {
          PATH_repetitorsID.push(`Ids[${i}]=${repetitorsID_10[i]}`);
        }
        dispatch(setRepetitorsId(arrayID))
      }
      const response = await fetch(
        `http://api.repetit.ru/public/teachers/short?${PATH_repetitorsID.join(
          '&'
        )}`
      );
      let json = await response.json();
        dispatch(addMoreRepetitors(json))
    };
  }

  type RepetitorsActions =
  | SetRepetitorsAction
  | SetRepetitorsIdAction
  | addMoreRepetitorsAction;

  export const repetitorsReducer: Reducer<RepetitorsReducerState, RepetitorsActions> = 
  (state = initialState, action
    ) => {
    switch (action.type) {
      case RepetitorsActionTypes.DOWNLOAD_ID:
        return { ...state, repetitorsID: action.payload };
      case RepetitorsActionTypes.DOWNLOAD:
        return { ...state, repetitors: action.payload };
      case RepetitorsActionTypes.DOWNLOAD_MORE:
        return {
          ...state,
          repetitors: [...state.repetitors].concat(action.payload),
        };
      default:
        return state;
    }
  }
