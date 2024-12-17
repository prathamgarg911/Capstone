import React, { useState, useEffect } from 'react';
import './SeatMatrix.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

  const handleSeatClick = (rowIndex, colIndex) => {
    // Implement logic to handle seat click
  };

  return (
    <div className="seat-matrix-container">
      <h1>
        Nava Nalanda Library, Thapar University -  
        <div className="cl"> Level {level}</div>
      </h1>
      <div className="background"></div>
      <div className="main-layout">
      <div className="entry-text">
        <h2>Entry</h2>
      </div>
        <div className="seat-matrix">
          {seatLayout.map((row, rowIndex) => (
            <div key={rowIndex} className={`column ${row.length === 4 ? 'left-align' : ''}`}>
              {row.map((seatStatus, colIndex) => (
                <div
                  key={colIndex}
                  className={`seat ${seatStatus}`}
                  onClick={() => handleSeatClick(rowIndex, colIndex)}
                >
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="navigation-buttons">
          <div className="total-vacant-seats">
            <h3>Total Empty Seats At Level {level}: {getTotalVacantSeats()}</h3>
          </div>

          {/* Dynamically generate buttons based on available levels */}
          {levels.map((lvl) => (
            <Link key={lvl.id} to={`/level${lvl.id}`}>
              <button>Level {lvl.id}</button>
            </Link>
          ))}

          {/* Static navigation buttons */}
          <Link to="/Inout"><button>In-out Data</button></Link>
          <Link to="/Analysis"><button>Data Analysis</button></Link>
        </div>
      </div>
    </div>
  );
};

export default SeatMatrix;
