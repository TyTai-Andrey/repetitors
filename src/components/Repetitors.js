import React from 'react'

import {useSelector} from 'react-redux';



function Repetitors () {
	const data = useSelector(state => state.download.repetitors)

	return (
		<div className="swapper">
			<div className='repetitors'>

				{
					(data !== 'default') ? data.map(i=>{
						return  <div className='repetitor'>
									<div className="repetitor-photo">
										<img src={i.photoPath} alt=""/>
									</div>
									<div className="repetitor-text">
										<div className="repetitor-name">{i.firstName+' ' +i.patrName}</div>
										<div className="repetitor-subject">Математика</div>
										<div className="repetitor-price">от {i.minPricePerHour} р</div>
									</div>
								</div>
					}) : null
				}

			</div>
		</div>
	)
}

export default Repetitors