import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import './TopPanel.css';

class TopPanel extends React.Component {
    render() {
        return (
            <div className='TopPanel'>
                <div className='TopPanel-gap'></div>
                <div className='TopPanel-block'><NavLink className='TopPanel-block-link' id="link" to='/Schedule/MainSchedule'>Расписание</NavLink></div>
                <div className='TopPanel-block'><NavLink className='TopPanel-block-link' to='/Schedule/AddSchedule'>Создать</NavLink></div>
                <div className='TopPanel-block'><NavLink className='TopPanel-block-link' to='/Schedule/MySchedule'>Мои расписания</NavLink></div>
                <div className='TopPanel-gap'></div>
            </div>
        )
    }
}
export default TopPanel;