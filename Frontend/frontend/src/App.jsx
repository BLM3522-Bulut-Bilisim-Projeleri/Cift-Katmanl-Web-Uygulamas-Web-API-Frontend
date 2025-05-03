import { useState } from 'react';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Destek Talep Sistemi</h1>
      <TicketForm onTicketCreated={handleRefresh} />
      <TicketList refreshTrigger={refresh} />
    </div>
  );
}

export default App;
