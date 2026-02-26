import { createContext, useContext, useState } from 'react';

const PlayerDossierContext = createContext();

export function PlayerDossierProvider({ children }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const openDossier = (player) => {
    if (player) setSelectedPlayer(player);
  };

  const closeDossier = () => setSelectedPlayer(null);

  return (
    <PlayerDossierContext.Provider value={{ selectedPlayer, openDossier, closeDossier }}>
      {children}
    </PlayerDossierContext.Provider>
  );
}

export function usePlayerDossier() {
  const ctx = useContext(PlayerDossierContext);
  if (!ctx) throw new Error('usePlayerDossier must be used within PlayerDossierProvider');
  return ctx;
}
