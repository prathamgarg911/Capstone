import React, { useState, useEffect } from 'react';
import './SeatMatrix.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { PiArmchairFill } from "react-icons/pi";
import { PiOfficeChairFill } from "react-icons/pi"

const generateSeatLayout = (rowsConfig, seatData) => {
  const layout = [];
  
  let seatIndex = 0;

  rowsConfig.forEach(({ count, seats }) => {
    for (let i = count-1; i >= 0; i--) {
      const row = [];
      for (let j = seats-1; j >=0; j--) {
        if (seatIndex < seatData.length) {
          row.push(seatData[seatIndex].is_occupied ? 'occupied' : 'vacant');
          seatIndex++;
        } else {
          row.push('vacant'); // Default to vacant if no data available
        }
      }
      layout.push(row);
    }
  });

  return layout;
};

const getSeatRowsForLevel = (level) => {
  switch (level) {
    case 2:
      return [
        { count: 4, seats: 7 },     //102 seats
        { count: 4, seats: 10 },
        { count: 4, seats: 6 },
        { count: 1, seats: 10 },
        
      ];
    case 3:
      return [
        { count: 4, seats: 7 },  //112 seats
        { count: 6, seats: 8 },
        { count: 4, seats: 7 },
      ];
    case 4: 
    return [
      { count: 4, seats: 7 },  //68 seats
      { count: 2, seats: 4 },
      { count: 4, seats: 7 },
    ];
    case 1:
      return [
        {count:10, seats:8}, //80 seats
      ]
    default:
      return [
        { count: 4, seats: 7 },
        { count: 3, seats: 4 },
        { count: 4, seats: 7 },
      ];
  }
};

const SeatMatrix = ({ level }) => {
  const navigate= useNavigate()
  const role = localStorage.getItem("role")
  const [showAnalytics , setShowAnalytics] = useState(role)
  const [seatLayout, setSeatLayout] = useState([]);
  const [levels, setLevels] = useState([]);

  const fetchLevels = () => {
    // Fetch levels for buttons
    axios.get("http://127.0.0.1:8000/floors")
      .then((res) => {
        setLevels(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fetchSeats = () => {
    
    // Fetch seat data for the given level
    axios.get(`http://127.0.0.1:8000/seats?floor_id=${level}`)
      .then((res) => {
        const seatData = res.data;
        const rowsConfig = getSeatRowsForLevel(level);
        const formattedSeatLayout = generateSeatLayout(rowsConfig, seatData);
        setSeatLayout(formattedSeatLayout);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchLevels();
    fetchSeats();
  }, [level]);

  const getTotalVacantSeats = () => {
    let totalVacantSeats = 0;
    seatLayout.forEach((row) => {
      totalVacantSeats += row.filter((seat) => seat === 'vacant').length;
    });
    return totalVacantSeats;
  };

  const   handleSeatClick = (rowIndex, colIndex) => {
    // Implement logic to handle seat click
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
    <div>
  <div>
  <div className='text-center justify-around items-center p-4 flex text-white bg-[#640000]' >
    <div className='font-bold '>

        Nava Nalanda Library, Thapar University -  
        <div className="cl"> Level {level}</div>
    </div>
    <div className='flex gap-2'>
  {showAnalytics=="admin" && <>
    {/* <Link to="/Inout"><button className='p-2 bg-white text-[#640000] rounded'>In-out Data</button></Link> */}
    <Link to="/Analysis"><button className='p-2 bg-white text-[#640000] rounded'> Analytics</button></Link>
  </>
  }
    <div className='p-2 bg-white font-bold text-green-500  rounded'>Empty Seats : <span className='text-green-500'>
      {getTotalVacantSeats()}
      </span>
      </div>
   <select placeholder="level" onChange={setlevel} className='p-2 bg-white text-[#640000] rounded'>
   <option value="1">Level 1</option>
    <option value="2">Level 2</option>
    <option value="3">Level 3</option>
    <option value="4">Level 4</option>
   </select>
   <button onClick={logout} className='p-2 bg-white text-[#640000] rounded'>Logout</button>
    </div>
      </div>
  </div>
   
    <div className="flex flex-col  justify-center items-center w-full">
    
      <div className="background"></div>
      {/* <div className='px-28 py-4 text-lg font-semibold mt-10 bg-white text-[#640000] rounded'>Empty Seats : {getTotalVacantSeats()}</div> */}
      <div className="main-layout flex justify-center items-center ">
      {/* <div className="entry-text">
        <h2>Entry</h2>
      </div> */}
        <div className="seat-matrix items-center justify-center">
          {seatLayout.map((row, rowIndex) => (
            <div key={rowIndex} className={`column ${row.length === 4 ? 'left-align' : ''}`}>
              {row.map((seatStatus, colIndex) => (
                <div
                  key={colIndex}
                  className='p-1  '
                  onClick={() => handleSeatClick(rowIndex, colIndex)}
                >
                  <PiOfficeChairFill className={`p-1 bg-white rounded-lg 
                    ${seatStatus === 'occupied' ? 'text-red-500' : 'text-green-500'} 
                     w-8 h-8`}></PiOfficeChairFill>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* <div className="navigation-buttons"> */}
          {/* <div className="total-vacant-seats">
            <h3>Total Empty Seats At Level {level}: {getTotalVacantSeats()}</h3>
          </div> */}

          {/* Dynamically generate buttons based on available levels */}
          {/* {levels.map((lvl) => (
            <Link key={lvl.id} to={`/level${lvl.id}`}>
              <button>Level {lvl.id}</button>
            </Link>
          ))} */}

          {/* Static navigation buttons */}
          {/* <Link to="/Inout"><button>In-out Data</button></Link>
          <Link to="/Analysis"><button>Data Analysis</button></Link> */}
        {/* </div> */}
      </div>
    </div>
    </div>
  );
};

export default SeatMatrix;
