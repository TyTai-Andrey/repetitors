import React from 'react';
import { useSelector } from 'react-redux';

import Nav from './components/Nav';
import Repetitors from './components/Repetitors';
import Download from './components/Download';

const App = () => {
  const { repetitorsID } = useSelector(
    (state: AppState) => state.repetitorsReducer
  );
  return (
    <>
      <Nav />
      <Repetitors />

      {/*Если карточек нет, то не показывать кнопку*/}
      {!!repetitorsID.length && <Download />}
    </>
  );
};

export default App;
