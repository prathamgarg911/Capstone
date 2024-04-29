import React, { useState, useEffect } from 'react';
import './SeatMatrix.css';
import { Link } from 'react-router-dom';

// Function to generate random seat status (occupied or vacant)
const generateRandomSeatStatus = () => {
  return Math.random() < 0.5 ? 'occupied' : 'vacant';
};

// Function to generate seat layout for the specified number of rows and columns
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

const SeatMatrix = () => {
  const [seatLayout, setSeatLayout] = useState([]);

  // Generate seat layout on component mount
  useEffect(() => {
    const rows = [
      { count: 6, seats: 7 },
      { count: 4, seats: 4 },
      { count: 6, seats: 7 }
    ];

    const newSeatLayout = rows.reduce((acc, { count, seats }) => {
      for (let i = 0; i < count; i++) {
        acc.push(generateSeatLayout(1, seats)[0]);
      }
      return acc;
    }, []);

    setSeatLayout(newSeatLayout);
  }, []);

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
      <div className="background"></div>
      <div className="content">
        <div className="heading">
          <h1>Nava Nalanda Library, Thapar University</h1>
        </div>
        <div className="seat-matrix">
          {seatLayout.map((row, rowIndex) => (
            <div key={rowIndex} className={`row ${row.length === 4 ? 'left-align' : ''}`}>
              {row.map((seatStatus, colIndex) => (
                <div
                  key={colIndex}
                  className={`seat ${seatStatus}`}
                  onClick={() => handleSeatClick(rowIndex, colIndex)}
                >
                  <span className="seat-index">{String.fromCharCode(65 + rowIndex)}{colIndex + 1}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="total-vacant-seats">
          <h3>Total Empty Seats At Level 4: {getTotalVacantSeats()}</h3>
          <Link to='Inout'>
          <button type="button">In-out Data</button>
          </Link>
          <Link to='Analysis'>
          <button type="button">Data Analysis</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SeatMatrix;
