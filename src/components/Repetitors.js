import React from 'react';

import { useSelector } from 'react-redux';

// Список репетиторов

function Repetitors() {
  // Массив с репетиторами
  const data = useSelector((state) => state.repetitorsReducer.repetitors);

  return (
    <div className="swapper">
      <div className="repetitors">
        {/*Если массив с репетиторами пуст, то ничего не показывать*/}
        {data !== 'default'
          ? data.map((i) => {
              return (
                <div className="repetitor" key={i.id}>
                  <div className="repetitor-photo">
                    <img src={i.photoPath} alt="" />
                  </div>
                  <div className="repetitor-text">
                    <div className="repetitor-name">
                      {i.firstName + ' ' + i.patrName}
                    </div>
                    <div className="repetitor-subject">Математика</div>
                    <div className="repetitor-price">
                      от {i.minPricePerHour} р
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Repetitors;
