import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import '../Schedule/Top-panel/TopPanel.css'

class TopPanelFinance extends React.Component {
    render() {
        return (
            <div className='TopPanel'>
                <div className='TopPanel-gap'></div>
                <div className='TopPanel-block'><NavLink className='TopPanel-block-link' to='/Finance/Income'>Доходы</NavLink></div>
                <div className='TopPanel-block'><NavLink className='TopPanel-block-link' to='/Finance/Expenses'>Расходы</NavLink></div>
                <div className='TopPanel-block'><NavLink className='TopPanel-block-link' to='/Finance/Report'>Отчет</NavLink></div>
                <div className='TopPanel-gap'></div>
            </div>
        )
    }
}
export default TopPanelFinance;