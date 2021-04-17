
import {
	PRESET_DISTRICTS,PRESET_SUBJECTS,PRESET_AREAS, DELETE_DISTRICTS,
	SUBJECTS, AREAS, DISTRICTS, DOWNLOAD_ID, DOWNLOAD, DOWNLOAD_MORE
} from './types'





// export function nextPage (argument) {
// 	return {
// 		type: TYPE
// 	}
// }

export function fetchAreas () {
	return async dispatch => {
		const response = await fetch('https://api.repetit.ru/public/areas')
		const json = await response.json()
		dispatch({type: AREAS, payload: json})
	}
}

export function fetchSubjects () {
	return async dispatch => {
		const response = await fetch('https://api.repetit.ru/public/subjects')
		const json = await response.json()
		dispatch({type: SUBJECTS, payload: json})
	}
}

// https://api.repetit.ru/public/districts?areaId=1

export function fetchDistricts (areaId) {
	return async dispatch => {
		const response = await fetch(`https://api.repetit.ru/public/districts?areaId=${areaId}`)
		const json = await response.json()
		dispatch({type: DISTRICTS, payload: json})
	}
}



export function deleteDistrict () {
	return {type: DELETE_DISTRICTS}
}

export function setDistrict (district) {
	return {type: PRESET_DISTRICTS, payload: district}
}

export function setSubject (subject) {
	return {type: PRESET_SUBJECTS, payload: subject}
}

export function setArea (area) {
	return {type: PRESET_AREAS, payload: area}
}

export function downloadId (URL) {
	return async dispatch => {
		const response = await fetch(`https://api.repetit.ru/public/search/teacherIds?${URL}`)
		let json = await response.json()

		let PATH_repetitorsID = [];

			if (json.length<=10) {

				for (let i = 0; i <json.length; ++i) {
					PATH_repetitorsID.push(`Ids[${i}]=${json[i]}`)
				}	

			} else {

				const repetitorsID_10 = json.splice(0, 10)

				for (let i = 0; i <repetitorsID_10.length; ++i) {
					PATH_repetitorsID.push(`Ids[${i}]=${repetitorsID_10[i]}`)
				}

				

			}

		const response_2 = await fetch(`http://api.repetit.ru/public/teachers/short?${PATH_repetitorsID.join('&')}`)
		let json_2 = await response_2.json()

		dispatch({type: DOWNLOAD_ID, payload: json})
		dispatch({type: DOWNLOAD, payload: json_2})
	}
}

export function download (arrayID) {
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