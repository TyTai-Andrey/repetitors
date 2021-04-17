import {combineReducers} from 'redux'

import {
	PRESET_DISTRICTS,PRESET_SUBJECTS,PRESET_AREAS, DELETE_DISTRICTS,
	SUBJECTS, AREAS, DISTRICTS, DOWNLOAD_ID, DOWNLOAD, DOWNLOAD_MORE
		} from './types'


// Данные для select`ов
const initialDataState = {
	subjects: 'undefined',
	areas: 'undefined',
	districts: 'undefined',
}

function dataReducer (state = initialDataState, action) {
	switch (action.type) {
		case SUBJECTS:
			return {...state, subjects: action.payload};
		case AREAS:
			return {...state, areas: action.payload};
		case DISTRICTS:
			return {...state, districts: action.payload};
		case DELETE_DISTRICTS:
			return {...state, districts: 'undefined'};
		default:
			return state;
	}
}


// Данные для запроса
const initialPresetDataState = {
	subject: 'default',
	area: 'default',
	district: 'default',
}

function presetDataReducer (state = initialPresetDataState, action) {
	switch (action.type) {
		case PRESET_SUBJECTS:
			return {...state, subject: action.payload};
		case PRESET_AREAS:
			return {...state, area: action.payload};
		case PRESET_DISTRICTS:
			return {...state, district: action.payload};
		default:
			return state;
	}
}


// Массив с информацией о репетиторах для карточек и массив с ID репетиторов
const initialDownloadState = {
	repetitorsID: [],
	repetitors: []
}

function downloadReducer (state = initialDownloadState, action) {
	switch (action.type) {
		case DOWNLOAD_ID:
			return {...state, repetitorsID: action.payload};
		case DOWNLOAD:
			return {...state, repetitors: action.payload};
		case DOWNLOAD_MORE:
			return {...state, repetitors: [...state.repetitors].concat(action.payload)};
		default:
			return state;
	}
}



export const rootReducer = combineReducers ({
	data: dataReducer,
	presetData: presetDataReducer,
	download: downloadReducer,
})