import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './inout.css';

const Inout = () => {
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

  return (
    <div className="app">
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
    </div>
  );
};

export default Inout;