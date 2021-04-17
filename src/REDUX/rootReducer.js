import {combineReducers} from 'redux'

// import {} from './types'


const initialState = {
	
}

function counterReducer (state = initialState, action) {
	switch (action.type) {
		default:
			return state;
	}
}

export const rootReducer = combineReducers ({
	counter: counterReducer,
})