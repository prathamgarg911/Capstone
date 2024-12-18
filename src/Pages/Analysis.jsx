import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import './Analysis.css';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';


const Analysis = () => {
   const navigate= useNavigate()
  const [dayOfWeekData, setDayOfWeekData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [peakHoursData, setPeakHoursData] = useState([]);
  const [dailyVisitorsData, setDailyVisitorsData] = useState([]);
  const [chartNo, setChartNo] = useState(0);
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
  setInterval(async () => {
    fetchGraphData()
  }, 2000); 

  const fetchGraphData = async (frequency,graph_number)=>{
      const res = await axios.post("http://localhost:8000/graph", {
        frequency:frequency,
        graph_number:graph_number
      })

      if(frequency=="h"){
       setPeakHoursData(res.data)   
      }
      if(frequency=="m"){
       setMonthlyData(res.data)
      }
      if(frequency=="d"){
        setDayOfWeekData(res.data)
      }
      if(frequency=="w"){
        setWeeklyData(res.data)
      }
    }


  const charts =[
    <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dayOfWeekData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="visitors" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>,
          <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="visitors" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>,
        <ResponsiveContainer width="100%" height={300}>
        <BarChart data={weeklyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="visitors" fill="#ff8042" />
        </BarChart>
      </ResponsiveContainer>,
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

  ]

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

  const setlevel =(e)=>{
    console.log(e.target.value)
    navigate(`../level${e.target.value}`,{ replace: true })
  }
  const logout = (e)=>{
    localStorage.removeItem("role")
      navigate("../login")
}

  return (<>
  <div className='flex flex-col gap-10'>
     <div>
            <div className='text-center justify-around items-center p-4 flex text-white bg-[#640000]' >
              <div className='font-bold '>
          
                  Nava Nalanda Library, Thapar University 
                  <div className="cl">  Analytics</div>
              </div>
              <div className='flex gap-2 items-center justify-center'>
          
              <select placeholder="level" onChange={setlevel} className='p-2 bg-white text-[#640000] rounded'>
              <option value="" disabled selected>Go to Level</option>
       <option value="0">Level 0</option>
       <option value="1">Level 1</option>
        <option value="2">Level 2</option>
        <option value="3">Level 3</option>
        <option value="4">Level 4</option>
       </select>
              {/* <Link to="/inout"><button className='p-2 bg-white text-[#640000] rounded'>In-out Data</button></Link> */}
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
            <div className="background2"></div>
            <div className='flex '>
            <div className="flex flex-col  items-center  gap-8 p-4 w-1/2 shadow-lg m-4 bg-white rounded-lg">
            <h2 className='text-white font-mono text-lg bg-[#640000] px-3 py-1 rounded '>FootFall</h2>
            <div className='flex justify-around w-full'>

            <button onClick={()=>setChartNo(0)} className={`text-white font-mono w-1/5 text-lg bg-[#640000] px-6 py-1 rounded hover:scale-110 ease-in-out  ${chartNo==0 ?"bg-[#640000]":"bg-slate-500" } `}>DAY</button>
            <button onClick={()=>setChartNo(1)} className={`text-white font-mono w-1/5  text-lg bg-[#640000] px-6 py-1 rounded hover:scale-110 ease-in-out ${chartNo==1 ?"bg-[#640000]":"bg-slate-500" } `}>WEEK</button>
            <button onClick={()=>setChartNo(2)} className={`text-white font-mono w-1/5  text-lg bg-[#640000] px-6 py-1 rounded hover:scale-110 ease-in-out ${chartNo==2 ?"bg-[#640000]":"bg-slate-500" } `}>MONTH</button>
            <button onClick={()=>setChartNo(3)} className={`text-white font-mono w-1/5   text-lg bg-[#640000] px-6 py-1 rounded hover:scale-110 ease-in-out ${chartNo==3 ?"bg-[#640000]":"bg-slate-500" } `}>HOURLY</button>
            </div>
          {/* <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dayOfWeekData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="visitors" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer> */}
          {charts[chartNo]}
        </div>
        <div className="flex flex-col  items-center  gap-20 p-4 w-1/2 shadow-lg m-4 bg-white rounded-lg">
          <h2 className='text-white font-mono text-lg bg-[#640000] px-3 py-1 rounded '>Daily Visitors </h2>
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
    {/* <div className="analysis-container">
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
    </div> */}
    </>
  );
};

export default Analysis;
