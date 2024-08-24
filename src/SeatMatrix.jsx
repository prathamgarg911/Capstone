import React, { useState, useEffect } from 'react';
import './SeatMatrix.css';
import { Link } from 'react-router-dom';

const generateRandomSeatStatus = () => {
  return Math.random() < 0.5 ? 'occupied' : 'vacant';
};

const generateSeatLayout = (rows, cols) => {
  const layout = [];
  for (let i = 0; i < rows; i++) {
    layout.push([]);
    for (let j = 0; j < cols; j++) {
      layout[i].push(generateRandomSeatStatus());
    }
  }
  return layout;
};

const getSeatRowsForLevel = (level) => {
  switch (level) {
    case 2:
      return [
        { count: 4, seats: 7 },
        { count: 6, seats: 9 },
        { count: 4, seats: 6 }
      ];
    case 3:
      return [
        { count: 5, seats: 7 },
        { count: 7, seats: 5 },
        { count: 4, seats: 1 }
      ];
    default:
      return [
        { count: 6, seats: 7 },
        { count: 4, seats: 4 },
        { count: 6, seats: 7 }
      ];
  }
};

const SeatMatrix = ({ level }) => {
  const [seatLayout, setSeatLayout] = useState([]);

  useEffect(() => {
    const rows = getSeatRowsForLevel(level);
    const newSeatLayout = rows.reduce((acc, { count, seats }) => {
      for (let i = 0; i < count; i++) {
        acc.push(generateSeatLayout(1, seats)[0]);
      }
      return acc;
    }, []);

    setSeatLayout(newSeatLayout);
  }, [level]);

  const getTotalVacantSeats = () => {
    let totalVacantSeats = 0;
    seatLayout.forEach(row => {
      totalVacantSeats += row.filter(seat => seat === 'vacant').length;
    });
    return totalVacantSeats;
  };

  const handleSeatClick = (rowIndex, colIndex) => {
    // Implement logic to handle seat click
  };

  return (
    <div className="seat-matrix-container">
      <h1>Nava Nalanda Library, Thapar University -  
        <div className="cl"> Level {level}</div></h1>
      <div className="background"></div>
      <div className="main-layout">
        <div className="seat-matrix">
          {seatLayout.map((row, rowIndex) => (
            <div key={rowIndex} className={`column ${row.length === 4 ? 'left-align' : ''}`}>
              {row.map((seatStatus, colIndex) => (
                <div
                  key={colIndex}
                  className={`seat ${seatStatus}`}
                  onClick={() => handleSeatClick(rowIndex, colIndex)}
                >
                  {/* Removed seat index span */}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="navigation-buttons">
          <div className="total-vacant-seats">
            <h3>Total Empty Seats At Level {level}: {getTotalVacantSeats()}</h3>
          </div>
          <Link to='/level1'><button>Level 1</button></Link>
          <Link to='/level2'><button>Level 2</button></Link>
          <Link to='/level3'><button>Level 3</button></Link>
          <Link to='/'><button>Level 4</button></Link>
          <Link to='/Inout'><button>In-out Data</button></Link>
          <Link to='/Analysis'><button>Data Analysis</button></Link>
        </div>
      </div>
    </div>
  );
};

export default SeatMatrix;
