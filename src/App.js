import React from 'react';

import Nav from './components/Nav';
import Repetitors from './components/Repetitors';
import Download from './components/Download';
import { useSelector } from 'react-redux';

function App() {
  const state = useSelector((state) => state);
  return (
    <>
      <Nav />
      <Repetitors />

      {/*Если карточек нет, то не показывать кнопку*/}
      {state.repetitorsReducer.repetitorsID.length !== 0 ? <Download /> : null}
    </>
  );
}

export default App;
