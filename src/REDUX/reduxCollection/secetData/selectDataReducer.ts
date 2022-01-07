import { ActionCreator, Reducer } from 'redux';
import getDistricts from '../../../services/getDistricts';
import getEntities from '../../../services/getEntities';
import { AppDispatch } from '../../rootReducer';

enum SelectDataActionTypes {
  DELETE_DISTRICTS = "selectData/DELETE_DISTRICTS",
  DISTRICTS = "selectData/DISTRICTS",
  SUBJECTS = "selectData/SUBJECTS",
  AREAS = "selectData/AREAS",
}

// Данные для select`ов
const initialState: SelectDataReducerState = {
  subjects: null,
  areas: null,
  districts: null,
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
export const fetchDistricts = (areaId: string | number) => async (dispatch: AppDispatch) => {
  const districts = await getDistricts(areaId);
  if (districts) {
    dispatch(setDistricts(districts))
  }
};

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
export const fetchSubjects = () => async (dispatch: AppDispatch) => {
  const subjects = await getEntities('subjects');
  if (subjects) {
    dispatch(setSubjects(subjects));
  }
};


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
export const fetchAreas = () => async (dispatch: AppDispatch) => {
  const areas = await getEntities('areas');
  if (areas) {
    dispatch(setAreas(areas));
  }
};

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
(state = initialState, action
  ) => {
  switch (action.type) {
    case SelectDataActionTypes.SUBJECTS:
      return { ...state, subjects: action.payload };
    case SelectDataActionTypes.AREAS:
      return { ...state, areas: action.payload };
    case SelectDataActionTypes.DISTRICTS:
      return { ...state, districts: action.payload };
    case SelectDataActionTypes.DELETE_DISTRICTS:
      return { ...state, districts: null };
    default:
      return state;
  }
}
