import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMoreRepetitors } from '../../redux/reduxCollection/repetitors/repetitorsReducer';

export const Download = () => {
  const { repetitorsID } = useSelector(
    (state: AppState) => state.repetitorsReducer
  );
  const dispatch = useDispatch();

  // загрузить ещё 10 карточек (или меньше)
  const downloadMore = () => {
    dispatch(getMoreRepetitors(repetitorsID));
  };

  return (
    <div className="swapper">
      <button
        className="theme-white font_btn download btn-animate"
        onClick={downloadMore}
      >
        Загрузить еще
      </button>
    </div>
  );
};
