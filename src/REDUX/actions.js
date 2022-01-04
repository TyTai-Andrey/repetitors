import {
  PRESET_DISTRICTS,
  PRESET_SUBJECTS,
  PRESET_AREAS,
  DOWNLOAD_ID,
  DOWNLOAD,
  DOWNLOAD_MORE,
} from './types';

// Установить район для поиска
export function setDistrict(district) {
  return { type: PRESET_DISTRICTS, payload: district };
}

// Установить предмет для поиска
export function setSubject(subject) {
  return { type: PRESET_SUBJECTS, payload: subject };
}

// Установить город для поиска
export function setArea(area) {
  return { type: PRESET_AREAS, payload: area };
}

// Запросить ID преподавателей и вывести 10 (или меньше)
export function downloadId(URL) {
  return async (dispatch) => {
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
      dispatch({ type: DOWNLOAD_ID, payload: [] });

      // Если пришло более 10 id
    } else {
      const repetitorsID_10 = json.splice(0, 10);

      for (let i = 0; i < repetitorsID_10.length; ++i) {
        PATH_repetitorsID.push(`Ids[${i}]=${repetitorsID_10[i]}`);
      }

      // Сохнанить id репетиторов, кроме первых 10
      dispatch({ type: DOWNLOAD_ID, payload: json });
    }

    // Запросить информацию о 10 репетиторах (или меньше)
    const response_2 = await fetch(
      `http://api.repetit.ru/public/teachers/short?${PATH_repetitorsID.join(
        '&'
      )}`
    );
    let json_2 = await response_2.json();

    // Сохнанить 10 репетиторов (или меньше)
    dispatch({ type: DOWNLOAD, payload: json_2 });
  };
}

//Загрузить ещё карточек
export function download_More(arrayID) {
  return async (dispatch) => {
    let PATH_repetitorsID = [];

    if (arrayID.length <= 10) {
      for (let i = 0; i < arrayID.length; ++i) {
        PATH_repetitorsID.push(`Ids[${i}]=${arrayID[i]}`);
      }
      dispatch({ type: DOWNLOAD_ID, payload: [] });
    } else {
      const repetitorsID_10 = arrayID.splice(0, 10);

      for (let i = 0; i < repetitorsID_10.length; ++i) {
        PATH_repetitorsID.push(`Ids[${i}]=${repetitorsID_10[i]}`);
      }
      dispatch({ type: DOWNLOAD_ID, payload: arrayID });
    }
    const response = await fetch(
      `http://api.repetit.ru/public/teachers/short?${PATH_repetitorsID.join(
        '&'
      )}`
    );
    let json = await response.json();

    dispatch({ type: DOWNLOAD_MORE, payload: json });
  };
}
