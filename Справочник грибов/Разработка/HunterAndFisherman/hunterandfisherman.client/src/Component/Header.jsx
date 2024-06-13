import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';


class Header extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
        <div className='Header'>
        <div className='Header-panel-block'>
          <NavLink className="Header-panel-block-link" to='/'>О нас</NavLink>
        </div>
        <div className='Header-panel-block'>
          <NavLink className="Header-panel-block-link" to='/EdibleMushrooms'>Съедобные грибы</NavLink>
        </div>
        <div className='Header-panel-block'>
          <NavLink className="Header-panel-block-link" to='/InedibleMushrooms'>Несъедобные грибы</NavLink>
        </div>
        <div className='Header-panel-block'>
          <NavLink className="Header-panel-block-link" to='/PoisonousMushrooms'>Ядовитые грибы</NavLink>
        </div>
        <div className='Header-panel-block'>
          <NavLink className="Header-panel-block-link" to='/Glavnaij'>Меры предосторожности</NavLink>
        </div>
      </div>
    );
  }
}
export default Header;