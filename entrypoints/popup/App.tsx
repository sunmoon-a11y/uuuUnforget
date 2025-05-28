import { lazy } from 'react';
import { Route, Routes, HashRouter, Navigate } from "react-router-dom";

import './App.less';

import '@/support/IndexDB.ts'

const Home = lazy(() => import('./pages/home'))

function App() {
  return (
    <HashRouter>
      <section className='un-forget-app'>
        <Routes>
          <Route path='/' index element={<Home/>}/>
          <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
      </section>
    </HashRouter>
  );
}

export default App;
