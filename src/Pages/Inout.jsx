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

      const entryCount = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
      const exitCount = Math.floor(Math.random() * (50 - 20 + 1)) + 20;

      entries.push({ hour: '08:00 - 09:00', count: entryCount });
      exits.push({ hour: '08:00 - 09:00', count: exitCount });

      for (let i = 9; i < 18; i++) {
        const hourRange = `${i}:00 - ${i + 1}:00`;
        const entryCount = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
        const exitCount = Math.floor(Math.random() * (50 - 20 + 1)) + 20;

        entries.push({ hour: hourRange, count: entryCount });
        exits.push({ hour: hourRange, count: exitCount });
      }

      setEntriesData(entries);
      setExitsData(exits);
    };

    generateRandomData();

    const handleResize = () => {
      
      console.log('Window resized!');
      
    };

    
    window.addEventListener('resize', handleResize);

    
    return () => {
      // Clean up ResizeObserver here
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
    </div>
  );
};

export default Inout;
