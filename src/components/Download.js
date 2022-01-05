import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { download_More } from '../redux/reduxCollection/repetitors/repetitorsReducer';

function Download() {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();

  // загрузить ещё 10 карточек (или меньше)
  function downloadMore() {
    dispatch(download_More(data.download.repetitorsID));
  }

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
}

export default Download;
