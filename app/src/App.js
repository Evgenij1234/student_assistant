import './null.css';
import './App.css';
import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import System from './System/System';
import Schedule from './Schedule/Schedule';
import Exercise from './Exercise/Exercise';
import Finance from './Finance/Finance';
import Sidebar from './Sidebar/Sidebar';
import { OpenSidebar } from './store/store';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  closeSidebar = () => {
    this.props.OpenSidebar(false);
  }
  render() {
    return (
      <div className="App">
        <HashRouter>
          <System></System>
          <Sidebar></Sidebar>
          <div className='top-gap'></div>
          <div className='App-content' onClick={this.closeSidebar}>
            <Routes>
              <Route path='/Schedule/*' element={<Schedule />}></Route>
              <Route path='/*' element={<Exercise />}></Route>
              <Route path='/Finance/*' element={<Finance />}></Route>
            </Routes>
            <div className='emptyPlace'></div>
          </div>
        </HashRouter>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    openClose: state.openClose
  }
}
export default connect(mapStateToProps, { OpenSidebar })(App);
