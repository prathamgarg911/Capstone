import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import './Analysis.css';

const Analysis = () => {
  const [dayOfWeekData, setDayOfWeekData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [peakHoursData, setPeakHoursData] = useState([]);
  const [dailyVisitorsData, setDailyVisitorsData] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    const fetchDayOfWeekData = () => {
      const data = [
        { day: 'Monday', visitors: 250 },
        { day: 'Tuesday', visitors: 300 },
        { day: 'Wednesday', visitors: 350 },
        { day: 'Thursday', visitors: 320 },
        { day: 'Friday', visitors: 280 },
        { day: 'Saturday', visitors: 150 },
        { day: 'Sunday', visitors: 120 }
      ];
      setDayOfWeekData(data);
    };

    const fetchMonthlyData = () => {
      const data = [
        { month: 'Jan', visitors: 1800 },
        { month: 'Feb', visitors: 2600 },
        { month: 'Mar', visitors: 2700 },
        { month: 'Apr', visitors: 2900 },
        { month: 'May', visitors: 3200 },
        { month: 'Jun', visitors: 2100 },
        { month: 'Jul', visitors: 2200 },
        { month: 'Aug', visitors: 2300 },
        { month: 'Sep', visitors: 3500 },
        { month: 'Oct', visitors: 3000 },
        { month: 'Nov', visitors: 3100 },
        { month: 'Dec', visitors: 1900 }
      ];
      setMonthlyData(data);
    };

    const fetchWeeklyData = () => {
      const data = [
        { week: 'Week 1', visitors: 600 },
        { week: 'Week 2', visitors: 700 },
        { week: 'Week 3', visitors: 800 },
        { week: 'Week 4', visitors: 750 }
      ];
      setWeeklyData(data);
    };

    const fetchPeakHoursData = () => {
      const data = [
        { hour: '08:00 - 09:00', visitors: 70 },
        { hour: '09:00 - 10:00', visitors: 90 },
        { hour: '10:00 - 11:00', visitors: 110 },
        { hour: '11:00 - 12:00', visitors: 130 },
        { hour: '12:00 - 13:00', visitors: 150 },
        { hour: '13:00 - 14:00', visitors: 180 },
        { hour: '14:00 - 15:00', visitors: 200 },
        { hour: '15:00 - 16:00', visitors: 180 },
        { hour: '16:00 - 17:00', visitors: 160 },
        { hour: '17:00 - 18:00', visitors: 140 }
      ];
      setPeakHoursData(data);
    };

    const fetchDailyVisitorsData = () => {
      const data = [
        { day: '2024-08-01', visitors: 100 },
        { day: '2024-08-02', visitors: 120 },
        { day: '2024-08-03', visitors: 90 },
        { day: '2024-08-04', visitors: 150 },
        { day: '2024-08-05', visitors: 110 },
        { day: '2024-08-06', visitors: 130 },
        { day: '2024-08-07', visitors: 140 },
        { day: '2024-08-08', visitors: 160 },
        { day: '2024-08-09', visitors: 170 },
        { day: '2024-08-10', visitors: 180 },
        // Add more data as needed
      ];
      setDailyVisitorsData(data);
    };

    fetchDayOfWeekData();
    fetchMonthlyData();
    fetchWeeklyData();
    fetchPeakHoursData();
    fetchDailyVisitorsData();
  }, []);

  return (
    <div className="analysis-container">
      <h1>Library Footfall Analysis</h1>
      <div className="chart-container">
        <div className="chart-item">
          <h2>Footfall by Day of the Week</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dayOfWeekData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="visitors" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-item">
          <h2>Monthly Footfall</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="visitors" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-item">
          <h2>Weekly Footfall</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="visitors" fill="#ff8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-item">
          <h2>Peak Hours Footfall</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={peakHoursData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="visitors" stroke="#ff8042" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-item">
          <h2>Daily Visitors Histogram</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyVisitorsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="step" dataKey="visitors" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
