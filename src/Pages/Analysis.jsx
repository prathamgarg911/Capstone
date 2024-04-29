import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Analysis.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analysis = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [weekdayData, setWeekdayData] = useState([]);
  const [histogramData, setHistogramData] = useState([]);

  useEffect(() => {
    const generateRandomData = () => {
      const monthlyData = [];
      const weekdayData = Array(7).fill(0);
      const histogramData = [];

      for (let i = 0; i < 12; i++) {
        const month = i + 1;
        let totalVisitors = 0;

        for (let j = 0; j < 30; j++) {
          const entries = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
          const exits = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
          const dayVisitors = entries + exits;
          totalVisitors += dayVisitors;

          const dayOfWeek = new Date(2023, i, j + 1).getDay();
          weekdayData[dayOfWeek] += dayVisitors;

          histogramData.push({ visitors: dayVisitors });
        }

        monthlyData.push({ month: `Month ${month}`, visitors: totalVisitors });
      }

      for (let i = 0; i < 7; i++) {
        const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][i];
        weekdayData[i] = { day, visitors: weekdayData[i] };
      }

      setMonthlyData(monthlyData);
      setWeekdayData(weekdayData);
      setHistogramData(histogramData);
    };

    generateRandomData();
  }, []);

  return (
    <div className="app">
      <h1>Library Visitor Analysis</h1>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              dataKey="visitors"
              data={monthlyData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {monthlyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <h2>Monthly Visitor Analysis</h2>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={weekdayData}>
            <XAxis dataKey="day" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="visitors" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
        <h2>Visitor Analysis by Day of the Week</h2>
      </div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={histogramData}>
            <XAxis dataKey="visitors" />
            <YAxis type="number" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="visitors" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        <h2>Histogram of Daily Visitors</h2>
      </div>
    </div>
  );
};

export default Analysis;