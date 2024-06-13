import './App.css';
import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import Header from './Component/Header';
import About from './Component/About/About';
import EdibleMushrooms from './Component/EdibleMushrooms/EdibleMushrooms';
import Glavnaij from './Component/Glavnaij/Glavnaij';
import InedibleMushrooms from './Component/InedibleMushrooms/InedibleMushrooms';
import PoisonousMushrooms from './Component/PoisonousMushrooms/PoisonousMushrooms';
import Futher from './Component/Futher';


class Content extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className='Content'>
          <HashRouter>
          <Header></Header>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/EdibleMushrooms" element={<EdibleMushrooms />} />
            <Route path="/Glavnaij" element={<Glavnaij />} />
            <Route path="/InedibleMushrooms" element={<InedibleMushrooms />} />
            <Route path="/PoisonousMushrooms" element={<PoisonousMushrooms />} />
          </Routes>
          <Futher></Futher>
        </HashRouter>
      </div>
    );
  }
}
export default Content;