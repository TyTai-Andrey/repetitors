
import {
	PRESET_DISTRICTS,PRESET_SUBJECTS,PRESET_AREAS, DELETE_DISTRICTS,
	SUBJECTS, AREAS, DISTRICTS, DOWNLOAD_ID, DOWNLOAD, DOWNLOAD_MORE
} from './types'





// export function nextPage (argument) {
// 	return {
// 		type: TYPE
// 	}
// }

// Запросить города
export function fetchAreas () {
	return async dispatch => {
		const response = await fetch('https://api.repetit.ru/public/areas')
		const json = await response.json()
		dispatch({type: AREAS, payload: json})
	}
}

// Запросить предметы
export function fetchSubjects () {
	return async dispatch => {
		const response = await fetch('https://api.repetit.ru/public/subjects')
		const json = await response.json()
		dispatch({type: SUBJECTS, payload: json})
	}
}


// Запросить районы
export function fetchDistricts (areaId) {
	return async dispatch => {
		const response = await fetch(`https://api.repetit.ru/public/districts?areaId=${areaId}`)
		const json = await response.json()
		dispatch({type: DISTRICTS, payload: json})
	}
}



// Очистить массив с районами
export function deleteDistrict () {
	return {type: DELETE_DISTRICTS}
}

// Установить район для поиска
export function setDistrict (district) {
	return {type: PRESET_DISTRICTS, payload: district}
}

// Установить предмет для поиска
export function setSubject (subject) {
	return {type: PRESET_SUBJECTS, payload: subject}
}

// Установить город для поиска
export function setArea (area) {
	return {type: PRESET_AREAS, payload: area}
}

// Запросить ID преподавателей и вывести 10 (или меньше)
export function downloadId (URL) {
	return async dispatch => {
		const response = await fetch(`https://api.repetit.ru/public/search/teacherIds?${URL}`)
		let json = await response.json()

		// Для запроса репетиторов по их ID
		let PATH_repetitorsID = [];

			// Если пришло 10 или меньше ID
			if (json.length<=10) {

				for (let i = 0; i <json.length; ++i) {
					PATH_repetitorsID.push(`Ids[${i}]=${json[i]}`)
				}	
				dispatch({type: DOWNLOAD_ID, payload: []})


			// Если пришло более 10 id
			} else {

				const repetitorsID_10 = json.splice(0, 10)

				for (let i = 0; i <repetitorsID_10.length; ++i) {
					PATH_repetitorsID.push(`Ids[${i}]=${repetitorsID_10[i]}`)
				}

				

			}


		// Запросить информацию о 10 репетиторах (или меньше)
		const response_2 = await fetch(`http://api.repetit.ru/public/teachers/short?${PATH_repetitorsID.join('&')}`)
		let json_2 = await response_2.json()

		// Сохнанить id репетиторов, кроме первых 10
		dispatch({type: DOWNLOAD_ID, payload: json})

		// Сохнанить 10 репетиторов (или меньше)
		dispatch({type: DOWNLOAD, payload: json_2})
	}
}


//Загрузить ещё карточек
export function download_More (arrayID) {
	return async dispatch => {
		
		let PATH_repetitorsID = [];

			if (arrayID.length<=10) {

				for (let i = 0; i <arrayID.length; ++i) {
					PATH_repetitorsID.push(`Ids[${i}]=${arrayID[i]}`)
				}	

			} else {

				const repetitorsID_10 = arrayID.splice(0, 10)

				for (let i = 0; i <repetitorsID_10.length; ++i) {
					PATH_repetitorsID.push(`Ids[${i}]=${repetitorsID_10[i]}`)
				}

				

			}

		const response = await fetch(`http://api.repetit.ru/public/teachers/short?${PATH_repetitorsID.join('&')}`)
		let json = await response.json()


		dispatch({type: DOWNLOAD_MORE, payload: json})
	}
}