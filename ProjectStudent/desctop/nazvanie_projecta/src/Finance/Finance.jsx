import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import './Finance.css'
import TopPanelFinance from './TopPanelFinance';
import Income from './Income/Income';
import Expenses from './Expenses/Expenses';
import Report from './Report/Report';

class Finance extends React.Component {
    render() {
      return (
        <div className='Finance'>
          <TopPanelFinance></TopPanelFinance>
          <Routes>
            <Route path='/Report' element={<Report />}></Route>
            <Route path='/Income' element={<Income />}></Route>
            <Route path='/Expenses' element={<Expenses />}></Route>
          </Routes>
        </div>
      )
    }
  }
  export default Finance;