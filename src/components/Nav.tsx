import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  setDistrict,
  setSubject,
  setArea,
} from '../redux/reduxCollection/dataForRequest/dataForRequestReducer';

import {
  deleteDistrict,
  fetchAreas,
  fetchSubjects,
  fetchDistricts,
  changeCurrentSubject,
} from '../redux/reduxCollection/secetData/selectDataReducer';

import {
  downloadId,
  setRepetitors,
  setRepetitorsId,
} from '../redux/reduxCollection/repetitors/repetitorsReducer';

const Nav = () => {
  const dispatch = useDispatch();
  const { dataForRequestReducer, selectDataReducer } = useSelector(
    (state: AppState) => state
  );
  const { subjects, areas, districts } = selectDataReducer;

  // Запросить предметы и города
  useEffect(() => {
    if (!subjects) {
      dispatch(fetchSubjects());
    }
    if (!areas) {
      dispatch(fetchAreas());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Обрабатывается выбор города
  const changeAreas = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Устанавлевает город для поиска
    const value = event.target.value === 'default' ? null : event.target.value;
    dispatch(setArea(value));

    // Если ничего не выбрано
    if (!value) {
      // Убрать район из поиска
      dispatch(setDistrict(null));
      // Очистить массив районов
      dispatch(deleteDistrict());
      return false;
    }

    // Если выбран город, то запросить районы для него
    dispatch(fetchDistricts(value));
    // Убрать район из поиска
    dispatch(setDistrict(null));
  };

  const showRepetitors = async () => {
    const subject = dataForRequestReducer.subject;
    const area = dataForRequestReducer.area;
    const district = dataForRequestReducer.district;

    let PATH_downloadId = [];

    // Если предмет для поиска выбран, то добавить его в строку запроса
    if (subject) {
      PATH_downloadId.push(`subjectId=${subject}`);
      dispatch(changeCurrentSubject(subjects?.[Number(subject) - 1]));
    } else {
      dispatch(changeCurrentSubject(null));
    }
    // Если город для поиска выбран, то добавить его в строку запроса
    if (area) {
      PATH_downloadId.push(`areaId=${area}`);
    }
    // Если район для поиска выбран, то добавить его в строку запроса
    if (district) {
      PATH_downloadId.push(`districtId=${district}`);
    }

    // Если строка запроса равна 0, то ничего не делать
    if (PATH_downloadId.length === 0) {
      dispatch(setRepetitors([]));
      dispatch(setRepetitorsId([]));
      return;
    } else {
      // Запросить массив с id преподавателей и вывести первых 10 (или меньше, если нет 10)
      await dispatch(downloadId(PATH_downloadId.join('&')));
    }
  };

  return (
    <div className="swapper">
      <div className="selects_group">
        <select
          name="subjects"
          id="subjects"
          className="select theme-white font_btn"
          onChange={(event) => {
            const value =
              event.target.value === 'default' ? null : event.target.value;
            dispatch(setSubject(value));
          }}
        >
          <option value="default">Укажите предмет</option>
          {/*Если в массиве с предметами что-то есть, то показать предметы*/}
          {subjects?.map((i: ISubject) => {
            return (
              <option value={i.id} key={i.id}>
                {i.name}
              </option>
            );
          })}
        </select>
        <select
          name="areas"
          id="areas"
          className="select theme-white font_btn"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            changeAreas(event)
          }
        >
          <option value="default">Укажите город</option>
          {/*Если в массиве с городами что-то есть, то показать города*/}
          {areas?.map((i: IArea) => {
            return (
              <option value={i.id} key={i.id}>
                {i.cityName}
              </option>
            );
          })}
        </select>
        <select
          name="districts"
          id="districts"
          className="select theme-white font_btn"
          onChange={(event) => {
            const value =
              event.target.value === 'default' ? null : event.target.value;
            dispatch(setDistrict(value));
          }}
        >
          <option value="default">Укажите район</option>
          {/*Если в массиве с районами что-то есть, то показать район*/}
          {districts?.map((i: IDistricts) => (
            <option value={i.id} key={i.id}>
              {i.name}
            </option>
          ))}
        </select>

        <button
          className="search font_btn btn-animate"
          onClick={showRepetitors}
        >
          Применить фильтр
        </button>
      </div>
    </div>
  );
};

export default Nav;
