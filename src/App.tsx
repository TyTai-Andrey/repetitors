import React from 'react';
import { useSelector } from 'react-redux';

import { Download } from './components/Download';
import { Loading } from './components/Loading';
import { Nav } from './components/Nav';
import { Repetitors } from './components/Repetitors';

import './styles/App.scss';

const App = () => {
  const { repetitorsID } = useSelector(
    (state: AppState) => state.repetitorsReducer
  );
  const { loading } = useSelector((state: AppState) => state.loadingReducer);
  return (
    <>
      <Nav />
      <Repetitors />
      {/*Если карточек нет, то не показывать кнопку*/}
      {loading && <Loading />}
      {!!repetitorsID.length && !loading && <Download />}
    </>
  );
};

export default App;
