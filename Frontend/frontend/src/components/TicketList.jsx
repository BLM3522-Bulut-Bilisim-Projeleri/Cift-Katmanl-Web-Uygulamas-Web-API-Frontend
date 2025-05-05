import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const TicketList = ({ refreshTrigger }) => {
  const [tickets, setTickets] = useState([]);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTicket, setModalTicket] = useState(null);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tickets`);
      setTickets(response.data);
    } catch (err) {
      console.error('Ticketlar çekilemedi:', err);
    }
  };

  const deleteTicket = async (id) => {
    if (!window.confirm("Bu talebi silmek istediğinize emin misiniz?")) return;
    try {
      await axios.delete(`${API_URL}/api/tickets/${id}`);
      fetchTickets();
    } catch (err) {
      console.error('Silme hatası:', err);
    }
  };

  const startEdit = (ticket) => {
    setModalTicket(ticket);
    setEditTitle(ticket.title);
    setEditDescription(ticket.description);
    setIsModalOpen(true);
  };

  const cancelEdit = () => {
    setIsModalOpen(false);
    setModalTicket(null);
    setEditTitle('');
    setEditDescription('');
  };

  const saveEdit = async () => {
    try {
      await axios.put(`${API_URL}/api/tickets/${modalTicket.id}`, {
        title: editTitle,
        description: editDescription,
        status: modalTicket.status,
      });
      cancelEdit();
      fetchTickets();
    } catch (err) {
      console.error('Güncelleme hatası:', err);
    }
  };

  const changeStatus = async (ticket) => {
    const nextStatus = ticket.status === 'Beklemede'
      ? 'Çözülüyor'
      : ticket.status === 'Çözülüyor'
        ? 'Tamamlandı'
        : 'Beklemede';

    try {
      await axios.put(`${API_URL}/api/tickets/${ticket.id}`, {
        title: ticket.title,
        description: ticket.description,
        status: nextStatus,
      });
      fetchTickets();
    } catch (err) {
      console.error('Durum güncellenemedi:', err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [refreshTrigger]);

  return (
    <div>
      <h2>Destek Talepleri</h2>

      <label>Filtrele: </label>
      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
        <option value="All">Tümü</option>
        <option value="Beklemede">Beklemede</option>
        <option value="Çözülüyor">Çözülüyor</option>
        <option value="Tamamlandı">Tamamlandı</option>
      </select>

      <ul>
        {tickets
          .filter(ticket => filterStatus === 'All' || ticket.status === filterStatus)
          .map((ticket) => (
            <li key={ticket.id} className="ticket-item">
              <strong>{ticket.title}</strong> - {ticket.description}
              <span style={{
                backgroundColor: ticket.status === 'Beklemede' ? '#ffcc00'
                  : ticket.status === 'Çözülüyor' ? '#00bfff'
                    : ticket.status === 'Tamamlandı' ? '#4caf50'
                      : '#ccc',
                color: 'white',
                borderRadius: '5px',
                padding: '2px 6px',
                marginLeft: '10px'
              }}>
                {ticket.status}
              </span>
              &nbsp;
              <button onClick={() => startEdit(ticket)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Düzenle</button>
              <button onClick={() => deleteTicket(ticket.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Sil</button>
              <button onClick={() => changeStatus(ticket)} className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800">Durumu Değiştir</button>
            </li>
          ))}
      </ul>

      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            width: '90%',
            maxWidth: '400px',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)'
          }}>
            <h3>Talebi Düzenle - #{modalTicket?.id}</h3>
            <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
            <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
            <br />
            <button onClick={saveEdit}>Kaydet</button>
            <button onClick={cancelEdit}>İptal</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketList;
