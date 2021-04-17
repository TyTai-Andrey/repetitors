import React from 'react'
import {useDispatch, useSelector} from 'react-redux';

import {
	download
} from '../REDUX/actions.js';

function Download () {
	const data = useSelector(state => state)
	const dispatch = useDispatch()


	function downloadMore () {
		dispatch(download(data.download.repetitorsID))
	}

	return (
		<div className="swapper">
			<button className="theme-white font_btn download btn-animate" onClick={downloadMore}>Загрузить еще</button>
		</div>
	)
}

export default Download