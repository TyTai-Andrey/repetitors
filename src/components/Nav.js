import React from 'react'

function Nav () {
	return (
		<div className="swapper">
			<div className='selects_group'>
				<select name="" id="" className="select theme-white font_btn">
					<option value="default">Укажите предмет</option>
					<option value="default">Укажите предмет</option>
					<option value="default">Укажите предмет</option>
					<option value="default">Укажите предмет</option>
				</select>
				<select name="" id="" className="select theme-white font_btn">
					<option value="default">Укажите город</option>
				</select>
				<select name="" id="" className="select theme-white font_btn">
					<option value="default">Укажите район</option>
				</select>
				<button className="search font_btn btn-animate">Применить фильтр</button>
			</div>
		</div>
	)
}

export default Nav