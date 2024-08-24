import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SeatMatrix from './SeatMatrix';
import Inout from './Pages/Inout';
import Analysis from './Pages/Analysis';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<SeatMatrix level={4} />} />
          <Route exact path='/level1' element={<SeatMatrix level={1} />} />
          <Route exact path='/level2' element={<SeatMatrix level={2} />} />
          <Route exact path='/level3' element={<SeatMatrix level={3} />} />
          <Route exact path='/Inout' element={<Inout />} />
          <Route exact path='/Analysis' element={<Analysis />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
