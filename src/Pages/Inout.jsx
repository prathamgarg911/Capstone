import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './inout.css';

const Inout = () => {
  const [entriesData, setEntriesData] = useState([]);
  const [exitsData, setExitsData] = useState([]);

  useEffect(() => {
    const generateRandomData = () => {
      const entries = [];
      const exits = [];

      // Bias entries data
      entries.push({ hour: '08:00 - 09:00', count: Math.floor(Math.random() * (40 - 25 + 1)) + 25 });
      entries.push({ hour: '09:00 - 10:00', count: Math.floor(Math.random() * (40 - 25 + 1)) + 25 });
      entries.push({ hour: '10:00 - 11:00', count: Math.floor(Math.random() * (40 - 25 + 1)) + 25 });
      entries.push({ hour: '11:00 - 12:00', count: Math.floor(Math.random() * (30 - 15 + 1)) + 15 });
      entries.push({ hour: '12:00 - 13:00', count: Math.floor(Math.random() * (20 - 10 + 1)) + 10 });
      entries.push({ hour: '13:00 - 14:00', count: Math.floor(Math.random() * (20 - 10 + 1)) + 10 });
      entries.push({ hour: '14:00 - 15:00', count: Math.floor(Math.random() * (25 - 10 + 1)) + 10 });
      entries.push({ hour: '15:00 - 16:00', count: Math.floor(Math.random() * (25 - 15 + 1)) + 15 });
      entries.push({ hour: '16:00 - 17:00', count: Math.floor(Math.random() * (20 - 10 + 1)) + 10 });
      entries.push({ hour: '17:00 - 18:00', count: Math.floor(Math.random() * (15 - 5 + 1)) + 5 });

      // Bias exits data
      exits.push({ hour: '08:00 - 09:00', count: Math.floor(Math.random() * (15 - 5 + 1)) + 5 });
      exits.push({ hour: '09:00 - 10:00', count: Math.floor(Math.random() * (20 - 10 + 1)) + 10 });
      exits.push({ hour: '10:00 - 11:00', count: Math.floor(Math.random() * (25 - 15 + 1)) + 15 });
      exits.push({ hour: '11:00 - 12:00', count: Math.floor(Math.random() * (25 - 15 + 1)) + 15 });
      exits.push({ hour: '12:00 - 13:00', count: Math.floor(Math.random() * (35 - 20 + 1)) + 20 });
      exits.push({ hour: '13:00 - 14:00', count: Math.floor(Math.random() * (35 - 20 + 1)) + 20 });
      exits.push({ hour: '14:00 - 15:00', count: Math.floor(Math.random() * (30 - 15 + 1)) + 15 });
      exits.push({ hour: '15:00 - 16:00', count: Math.floor(Math.random() * (30 - 20 + 1)) + 20 });
      exits.push({ hour: '16:00 - 17:00', count: Math.floor(Math.random() * (25 - 10 + 1)) + 10 });
      exits.push({ hour: '17:00 - 18:00', count: Math.floor(Math.random() * (20 - 5 + 1)) + 5 });

      setEntriesData(entries);
      setExitsData(exits);
    };

    generateRandomData();

    const handleResize = () => {
      console.log('Window resized!');
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="app">
      <h1>Library Visitor Analysis</h1>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={entriesData} layout="vertical" barSize={25}>
            <XAxis type="number" dataKey="count" />
            <YAxis type="category" dataKey="hour" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        <h2>Entries per Hour</h2>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={exitsData} layout="vertical" barSize={25}>
            <XAxis type="number" dataKey="count" />
            <YAxis type="category" dataKey="hour" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
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
