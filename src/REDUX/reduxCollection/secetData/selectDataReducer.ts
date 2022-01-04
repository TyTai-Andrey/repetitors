import { ActionCreator, Reducer } from 'redux';

enum SelectDataActionTypes {
  DELETE_DISTRICTS = "selectData/DELETE_DISTRICTS",
  DISTRICTS = "selectData/DISTRICTS",
  SUBJECTS = "selectData/SUBJECTS",
  AREAS = "selectData/AREAS",
}

// Данные для select`ов
const initialDataState = {
  subjects: 'undefined',
  areas: 'undefined',
  districts: 'undefined',
};

type SetDistrictsAction = {
  type: SelectDataActionTypes.DISTRICTS;
  payload: any
};

// Записать массив с районами
export const setDistricts: ActionCreator<SetDistrictsAction> = (payload: any) => ({
  type: SelectDataActionTypes.DISTRICTS,
  payload
});

// Запросить районы
export function fetchDistricts(areaId: string | number) {
  return async (dispatch: any) => {
    const response = await fetch(
      `https://api.repetit.ru/public/districts?areaId=${areaId}`
    );
    const json = await response.json();
    dispatch(setDistricts(json))
  };
}

type SetSubjectsAction = {
  type: SelectDataActionTypes.SUBJECTS;
  payload: any
};

// Записать массив с предметами
export const setSubjects: ActionCreator<SetSubjectsAction> = (payload: any) => ({
  type: SelectDataActionTypes.SUBJECTS,
  payload
});

// Запросить предметы
export function fetchSubjects() {
  return async (dispatch: any) => {
    const response = await fetch('https://api.repetit.ru/public/subjects');
    const json = await response.json();
    dispatch(setSubjects(json));
  };
}


type SetAreasAction = {
  type: SelectDataActionTypes.AREAS;
  payload: any
};

// Записать массив с предметами
export const setAreas: ActionCreator<SetAreasAction> = (payload: any) => ({
  type: SelectDataActionTypes.AREAS,
  payload
});

// Запросить города
export function fetchAreas() {
  return async (dispatch: any) => {
    const response = await fetch('https://api.repetit.ru/public/areas');
    const json = await response.json();
    dispatch(setAreas(json));
  };
}

type DeleteDistrictAction = {
  type: SelectDataActionTypes.DELETE_DISTRICTS;
};

// Очистить массив с районами
export const deleteDistrict: ActionCreator<DeleteDistrictAction> = () => ({
  type: SelectDataActionTypes.DELETE_DISTRICTS,
});

type SelectDataActions =
  | DeleteDistrictAction
  | SetDistrictsAction
  | SetSubjectsAction
  | SetAreasAction;


export const selectDataReducer: Reducer<SelectDataReducerState, SelectDataActions> = 
(state = initialDataState, action
  ) => {
  switch (action.type) {
    case SelectDataActionTypes.SUBJECTS:
      return { ...state, subjects: action.payload };
    case SelectDataActionTypes.AREAS:
      return { ...state, areas: action.payload };
    case SelectDataActionTypes.DISTRICTS:
      return { ...state, districts: action.payload };
    case SelectDataActionTypes.DELETE_DISTRICTS:
      return { ...state, districts: 'undefined' };
    default:
      return state;
  }
}
