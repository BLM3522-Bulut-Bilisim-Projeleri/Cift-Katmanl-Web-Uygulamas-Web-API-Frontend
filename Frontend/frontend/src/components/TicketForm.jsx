// src/components/TicketForm.jsx
import { useState } from 'react';
import axios from 'axios';

const TicketForm = ({ onTicketCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTicket = { title, description, status: 'Beklemede' };

    try {
      await axios.post('http://localhost:8080/api/tickets', newTicket);
      setTitle('');
      setDescription('');
      onTicketCreated(); // listeyi yenile
    } catch (err) {
      alert('Hata oluştu!');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Yeni Destek Talebi</h2>
      <input
        type="text"
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Açıklama"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <br />
      <button type="submit">Gönder</button>
    </form>
  );
};

export default TicketForm;
