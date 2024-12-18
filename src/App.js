import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SeatMatrix from './SeatMatrix';
import Inout from './Pages/Inout';
import Analysis from './Pages/Analysis';
import axios from 'axios';
import Login from "./Pages/Login"

function App() {
  const [levels, setLevels] = useState([]);

  const getLevels = () => {
    axios.get("http://127.0.0.1:8000/floors")
      .then((res) => {
        setLevels(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getLevels();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Generate routes dynamically for each level */}
          {levels.map((level) => (
            <Route 
              key={level.id} 
              path={`/level${level.id}`} 
              element={<SeatMatrix level={level.id} />} 
            />
          ))}

          {/* Default route */}
          <Route path="/" element={<SeatMatrix level={levels.length > 0 ? levels[0].id : 1} />} />

          {/* Static routes */}
          <Route path="/Inout" element={<Inout />} />
          <Route path="/Analysis" element={<Analysis />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
