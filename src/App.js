import React from 'react';
import SeatMatrix from './SeatMatrix';
import {BrowserRouter ,Routes,Route} from "react-router-dom";
import Inout from './Pages/Inout';
import Analysis from './Pages/Analysis';
function App() {
  return (
    <BrowserRouter>

    <div className="App">
      <Routes>
        <Route exact path='/' element={<SeatMatrix />}></Route>
        <Route exact path='/Inout' element={<Inout/>}></Route>
        <Route exact path='/Analysis' element={<Analysis/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
