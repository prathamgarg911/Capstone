import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './inout.css';
import { Link , useNavigate } from 'react-router-dom';


const Inout = () => {
   const navigate= useNavigate()
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/in-out/');
        const data = response.data.map(item => ({
          hour: item.hour,
          entries: item.entries,
          exits: item.exits
        }));
        setChartData(data);
      } catch (error) {
        console.error("Error fetching in-out data:", error);
      }
    };

    fetchData();

    const handleResize = () => {
      console.log('Window resized!');
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const axisSettings = {
    tickCount: 11,
    domain: [0, 100], // Adjust the domain if needed to fit your data range
  };
  const setlevel =(e)=>{
    console.log(e.target.value)
    navigate(`../level${e.target.value}`,{ replace: true })
  }
  const logout = (e)=>{
    localStorage.removeItem("role")
      navigate("../login")
}

  return (
    <>
    <div className='flex flex-col gap-10 '>
        <div>
        <div className='text-center justify-around items-center p-4 flex text-white bg-[#640000]' >
          <div className='font-bold '>
      
              Nava Nalanda Library, Thapar University 
              <div className="cl"> IN OUT Analytics</div>
          </div>
          <div className='flex gap-2 items-center justify-center'>
      
          <select placeholder="level" onChange={setlevel} className='p-2 bg-white text-[#640000] rounded'>
          <option value="" disabled selected>Go to Level</option>
   <option value="1">Level 1</option>
    <option value="2">Level 2</option>
    <option value="3">Level 3</option>
    <option value="4">Level 4</option>
   </select>
          <Link to="/Analysis"><button className='p-2 bg-white text-[#640000] rounded'>Data Analysis</button></Link>
          <button onClick={logout} className='p-2 bg-white text-[#640000] rounded'>Logout</button>
          {/* <div className='p-2 bg-white text-[#640000] rounded'>Empty Seats : {getTotalVacantSeats()}</div> */}
         {/* <select placeholder="level" onChange={setlevel} className='p-2 bg-white text-[#640000] rounded'>
         <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
          <option value="4">Level 4</option>
         </select> */}
          </div>
            </div>
        </div>
      <div className="background"></div>
      <div className='flex '>


        <div className="flex flex-col  items-center  gap-3 p-4 w-1/2 shadow-lg m-4 bg-white rounded-lg">
        <h2 className='text-white font-mono text-lg bg-[#640000] px-3 py-1 rounded '>Entries per Hour</h2>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} barSize={25}>
          <XAxis type="category" dataKey="hour" />
          <YAxis type="number" {...axisSettings} />
          <Tooltip />
          <Legend />
          <Bar dataKey="entries" fill="#8884d8" name="Entries" />
          </BarChart>
        </ResponsiveContainer>

      </div>
      <div className="flex  flex-col gap-3  items-center  p-4 w-1/2 shadow-lg m-4 bg-white rounded-lg">
      <h2 className='text-white font-mono text-lg bg-[#640000] px-3 py-1 rounded '>Exits per Hour</h2>
      <ResponsiveContainer width="100%" height={400}>
  <BarChart data={chartData} barSize={25}>
    <XAxis type="category" dataKey="hour" />
    <YAxis type="number" {...axisSettings} />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Legend />
    <Bar dataKey="exits" fill="#82ca9d" name="Exits" />
  </BarChart>
</ResponsiveContainer>

       
      </div>
      </div>

    </div>

    {/* <div className="app">
      <h1>Library Visitor Analysis</h1>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} layout="vertical" barSize={25}>
            <XAxis type="number" {...axisSettings} />
            <YAxis type="category" dataKey="hour" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="entries" fill="#8884d8" name="Entries" />
          </BarChart>
        </ResponsiveContainer>
        <h2>Entries per Hour</h2>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} layout="vertical" barSize={25}>
            <XAxis type="number" {...axisSettings} />
            <YAxis type="category" dataKey="hour" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="exits" fill="#82ca9d" name="Exits" />
          </BarChart>
        </ResponsiveContainer>
        <h2>Exits per Hour</h2>
      </div>
      <div className="button-container">
        <a href="/level1">
          <button className="navigate-button">Go to Seat Matrix Level 1</button>
        </a>
        <a href="/Analysis">
          <button className="navigate-button">Go to Data Analysis</button>
        </a>
      </div>
    </div> */}
    </>
  );
};

export default Inout;