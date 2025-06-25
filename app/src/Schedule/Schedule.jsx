import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import MySchedule from './MySchedule/MySchedule';
import AddSchedule from './AddSchedule/AddSchedule';
import TopPanel from './Top-panel/TopPanel';
import MainSchedule from './MainSchedule/MainSchedule';
import EditSchedule from './EditSchedule/EditSchedule';
import './Schedule.css';

class Schedule extends React.Component {
    render() {
      return (
        <div className='Schedule'>
          <TopPanel></TopPanel>
          <Routes>
            <Route path='/MainSchedule' element={<MainSchedule />}></Route>
            <Route path='/AddSchedule' element={<AddSchedule />}></Route>
            <Route path='/MySchedule' element={<MySchedule />}></Route>
            <Route path='/EditSchedule' element={<EditSchedule />}></Route>
          </Routes>
        </div>
      )
    }
  }
  export default Schedule;