import React from 'react';
import './Sidebar.css';
import { OpenSidebar } from '../store/store';
import { connect } from 'react-redux';
import 'animate.css/animate.css';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: false,
    }
  }
  closeSidebar = () => {
    this.props.OpenSidebar(false);
  }
  render() {
    if (this.props.openClose == true) {
      return (
        <div className="Sidebar animate__animated animate__fadeInLeft">
          <div className='Sidebar-panel'>
            <div className='Sidebar-panel-open'>
            </div>
            <div className='Sidebar-panel-route'>
              <div onClick={this.closeSidebar} className='Sidebar-panel-block'><NavLink className={"Sidebar-panel-block-link"} to='/Schedule/MainSchedule'>Расписание</NavLink></div>
              <div onClick={this.closeSidebar} className='Sidebar-panel-block'><NavLink className={"Sidebar-panel-block-link"} to='/*'>Задания</NavLink></div>
              <div onClick={this.closeSidebar} className='Sidebar-panel-block'><NavLink className={"Sidebar-panel-block-link"} to='/Finance/Income'>Финансы</NavLink></div>
            </div>
            <div className='Sidebar-panel-site'>
              
            </div>
            <div className='gap'></div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    openClose: state.openClose,
  }
}

export default connect(mapStateToProps, { OpenSidebar })(Sidebar);