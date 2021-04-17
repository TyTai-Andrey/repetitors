import React, {useEffect} from 'react'

import {useDispatch, useSelector} from 'react-redux';
import {

	fetchSubjects, fetchAreas, fetchDistricts, deleteDistrict,

	setDistrict, setSubject, setArea,

	downloadId
} from '../REDUX/actions.js';




function Nav () {


	const dispatch = useDispatch()
	const data = useSelector(state => state)

	useEffect(()=>{
		dispatch(fetchSubjects())
		dispatch(fetchAreas())
	}, [])
	

	function changeAreas(event){
		dispatch(setArea(event.target.value))
		if (event.target.value === 'default') {
			dispatch(setDistrict('default'))
			dispatch(deleteDistrict())
			return false
		}

		dispatch(fetchDistricts(event.target.value))
		dispatch(setDistrict('default'))
	}


	async function showRepetitors () {
		
		
		const subject = data.presetData.subject
		const area = data.presetData.area
		const district = data.presetData.district

		let PATH_downloadId = [];

		if (subject !== 'default') {
			PATH_downloadId.push(`subjectId=${subject}`)
		}
		if (area !=='default') {
			PATH_downloadId.push(`areaId=${area}`)
		}
		if (district !=='default') {
			PATH_downloadId.push(`districtId=${district}`)
		}

		if ( PATH_downloadId.length===0 ) {
			return
		} else {
			await dispatch(downloadId(PATH_downloadId.join('&')))
		}
	}

	return (
		<div className="swapper">
			<div className='selects_group'>
				<select name="subjects" id="subjects" className="select theme-white font_btn" onChange={event=>dispatch(setSubject(event.target.value))}>
					<option value="default">Укажите предмет</option>
					
					{
						(data.data.subjects !== 'undefined') ? data.data.subjects.map(i=>{
							return <option 
							value={i.id} 
							key={i.id}
							>{i.name}</option>
						}) : null
					}
					
						
						
					
				</select>
				<select name="areas" id="areas" className="select theme-white font_btn" onChange={event=>changeAreas(event)}>
					<option value="default">Укажите город</option>

					{
						(data.data.areas !== 'undefined') ? data.data.areas.map(i=>{
							return <option 
							value={i.id} 
							key={i.id}
							>{i.cityName}</option>
						}) : null
					}

				</select>
				<select name="districts" id="districts" className="select theme-white font_btn" onChange={event=>dispatch(setDistrict(event.target.value))}>
					<option value="default">Укажите район</option>
					{
						(data.data.districts !== 'undefined') ? data.data.districts.map(i=>{
							return <option 
							value={i.id} 
							key={i.id}
							>{i.name}</option>
						}) : null
					}
				</select>


				<button className="search font_btn btn-animate" onClick={showRepetitors}>Применить фильтр</button>
			</div>
		</div>
	)
}

export default Nav