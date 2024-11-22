import React, { useState } from 'react';
import axios from 'axios';

const AddPill = () => {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [timeTaken, setTimeTaken] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post(
      'http://localhost:5000/pills',
      { name, dosage, timeTaken },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert('Pill added!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Pill Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} required />
      <input type="datetime-local" value={timeTaken} onChange={(e) => setTimeTaken(e.target.value)} required />
      <button type="submit">Add Pill</button>
    </form>
  );
};

export default AddPill;
