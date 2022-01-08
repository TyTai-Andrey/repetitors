import { ActionCreator, Reducer } from 'redux';
import getDistricts from '../../../services/getDistricts';
import getEntities from '../../../services/getEntities';
import { AppDispatch } from '../../rootReducer';

enum SelectDataActionTypes {
  DELETE_DISTRICTS = 'selectData/DELETE_DISTRICTS',
  DISTRICTS = 'selectData/DISTRICTS',
  SUBJECTS = 'selectData/SUBJECTS',
  AREAS = 'selectData/AREAS',
  CHANGE_CURRENT_SUBJECT = 'selectData/CHANGE_CURRENT_SUBJECT',
}

// Данные для select`ов
const initialState: SelectDataReducerState = {
  subjects: null,
  areas: null,
  districts: null,
  currentSubject: null,
};

type SetDistrictsAction = {
  type: SelectDataActionTypes.DISTRICTS;
  payload: IDistricts[] | null;
};

// Записать массив с районами
export const setDistricts: ActionCreator<SetDistrictsAction> = (
  payload: IDistricts[] | null
) => ({
  type: SelectDataActionTypes.DISTRICTS,
  payload,
});

// Запросить районы
export const fetchDistricts =
  (areaId: string | number) => async (dispatch: AppDispatch) => {
    const districts = await getDistricts(areaId);
    if (districts) {
      dispatch(setDistricts(districts));
    }
  };

type SetSubjectsAction = {
  type: SelectDataActionTypes.SUBJECTS;
  payload: ISubject[] | null;
};

// Записать массив с предметами
export const setSubjects: ActionCreator<SetSubjectsAction> = (
  payload: ISubject[] | null
) => ({
  type: SelectDataActionTypes.SUBJECTS,
  payload,
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
  payload: IArea[] | null;
};

// Записать массив с предметами
export const setAreas: ActionCreator<SetAreasAction> = (
  payload: IArea[] | null
) => ({
  type: SelectDataActionTypes.AREAS,
  payload,
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

type ChangeCurrentSubjectAction = {
  type: SelectDataActionTypes.CHANGE_CURRENT_SUBJECT;
  payload: ISubject | null;
};

// Записать массив с районами
export const changeCurrentSubject: ActionCreator<ChangeCurrentSubjectAction> = (
  payload: ISubject | null
) => ({
  type: SelectDataActionTypes.CHANGE_CURRENT_SUBJECT,
  payload,
});

type SelectDataActions =
  | DeleteDistrictAction
  | SetDistrictsAction
  | SetSubjectsAction
  | SetAreasAction
  | ChangeCurrentSubjectAction;

export const selectDataReducer: Reducer<
  SelectDataReducerState,
  SelectDataActions
> = (state = initialState, action) => {
  switch (action.type) {
    case SelectDataActionTypes.SUBJECTS:
      return { ...state, subjects: action.payload };
    case SelectDataActionTypes.AREAS:
      return { ...state, areas: action.payload };
    case SelectDataActionTypes.DISTRICTS:
      return { ...state, districts: action.payload };
    case SelectDataActionTypes.DELETE_DISTRICTS:
      return { ...state, districts: null };
    case SelectDataActionTypes.CHANGE_CURRENT_SUBJECT: {
      return { ...state, currentSubject: action.payload };
    }
    default:
      return state;
  }
};
