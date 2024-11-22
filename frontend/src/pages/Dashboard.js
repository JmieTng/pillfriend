import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [pills, setPills] = useState([]);

  useEffect(() => {
    const fetchPills = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/pills', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPills(res.data);
    };

    fetchPills();
  }, []);

  return (
    <div>
      <h1>Pill Tracker</h1>
      <ul>
        {pills.map((pill) => (
          <li key={pill._id}>
            {pill.name} - {pill.dosage} (Taken: {new Date(pill.timeTaken).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
