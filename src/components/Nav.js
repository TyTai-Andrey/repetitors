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
} from '../redux/reduxCollection/secetData/selectDataReducer';

import { downloadId } from '../redux/reduxCollection/repetitors/repetitorsReducer';

function Nav() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state);

  // Запросить предметы и города
  useEffect(() => {
    dispatch(fetchSubjects());
    dispatch(fetchAreas());
  }, []);

  // Обрабатывается выбор города
  function changeAreas(event) {
    // Устанавлевает город для поиска
    dispatch(setArea(event.target.value));

    // Если ничего не выбрано
    if (event.target.value === 'default') {
      // Убрать район из поиска
      dispatch(setDistrict('default'));
      // Очистить массив районов
      dispatch(deleteDistrict());
      return false;
    }

    // Если выбран город, то запросить районы для него
    dispatch(fetchDistricts(event.target.value));
    // Убрать район из поиска
    dispatch(setDistrict('default'));
  }

  async function showRepetitors() {
    const subject = data.dataForRequestReducer.subject;
    const area = data.dataForRequestReducer.area;
    const district = data.dataForRequestReducer.district;

    let PATH_downloadId = [];

    // Если предмет для поиска выбран, то добавить его в строку запроса
    if (subject !== 'default') {
      PATH_downloadId.push(`subjectId=${subject}`);
    }
    // Если город для поиска выбран, то добавить его в строку запроса
    if (area !== 'default') {
      PATH_downloadId.push(`areaId=${area}`);
    }
    // Если район для поиска выбран, то добавить его в строку запроса
    if (district !== 'default') {
      PATH_downloadId.push(`districtId=${district}`);
    }

    // Если строка запроса равна 0, то ничего не делать
    if (PATH_downloadId.length === 0) {
      return;
    } else {
      // Запросить массив с id преподавателей и вывести первых 10 (или меньше, если нет 10)
      await dispatch(downloadId(PATH_downloadId.join('&')));
    }
  }

  return (
    <div className="swapper">
      <div className="selects_group">
        <select
          name="subjects"
          id="subjects"
          className="select theme-white font_btn"
          onChange={(event) => dispatch(setSubject(event.target.value))}
        >
          <option value="default">Укажите предмет</option>

          {/*Если в массиве с предметами что-то есть, то показать предметы*/}
          {data.selectDataReducer.subjects !== 'undefined'
            ? data.selectDataReducer.subjects.map((i) => {
                return (
                  <option value={i.id} key={i.id}>
                    {i.name}
                  </option>
                );
              })
            : null}
        </select>
        <select
          name="areas"
          id="areas"
          className="select theme-white font_btn"
          onChange={(event) => changeAreas(event)}
        >
          <option value="default">Укажите город</option>

          {/*Если в массиве с городами что-то есть, то показать города*/}
          {data.selectDataReducer.areas !== 'undefined'
            ? data.selectDataReducer.areas.map((i) => {
                return (
                  <option value={i.id} key={i.id}>
                    {i.cityName}
                  </option>
                );
              })
            : null}
        </select>
        <select
          name="districts"
          id="districts"
          className="select theme-white font_btn"
          onChange={(event) => dispatch(setDistrict(event.target.value))}
        >
          <option value="default">Укажите район</option>
          {/*Если в массиве с районами что-то есть, то показать район*/}
          {data.selectDataReducer.districts !== 'undefined'
            ? data.selectDataReducer.districts.map((i) => {
                return (
                  <option value={i.id} key={i.id}>
                    {i.name}
                  </option>
                );
              })
            : null}
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
}

export default Nav;
