import React from 'react';

import { useSelector } from 'react-redux';

const Repetitors = () => {
  // Массив с репетиторами
  const { repetitors } = useSelector(
    (state: AppState) => state.repetitorsReducer
  );

  const { currentSubject } = useSelector(
    (state: AppState) => state.selectDataReducer
  );

  return (
    <div className="swapper">
      <div className="repetitors">
        {repetitors.map((i) => {
          return (
            <div className="repetitor" key={i.id}>
              <div className="repetitor-photo">
                <img src={i.photoPathSquare} alt="" />
              </div>
              <div className="repetitor-text">
                <div className="repetitor-name">
                  {i.firstName + ' ' + i.patrName}
                </div>
                <div className="repetitor-subject">
                  {currentSubject
                    ? currentSubject.name
                    : i.teachingSubjects[0].subject.name}
                </div>
                <div className="repetitor-price">от {i.minPricePerHour} р</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Repetitors;
