import React, { useState, useEffect } from 'react';
import Header from './Header';
import DefaultForm from './DefaultForm';
import SecondForm from './SecondForm';
import { deleteTeamPlayer } from '../services/Service';
import axios from 'axios';
import './Team.css';
import '../App.css';

const Team = () => {
  // --- State hooks ---
  const [selectedOption, setSelectedOption] = useState('4-3-3');
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [positionAssignStatus, setPositionAssignStatus] = useState({}); // { position: playerId }

  // List of positions for assignment buttons
  const positions = ['GK', 'LB', 'RB', 'CB', 'CB','CM', 'CM', 'DM', 'LW', 'RW', 'ST'];

  // --- Fetch all players on mount ---
  useEffect(() => {
    fetchPlayers();
  }, []);

  // --- Fetch players helper ---
  const fetchPlayers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/team_player');
      setTeamPlayers(res.data);

      // Build position assignment map for quick lookups
      const posStatus = {};
      res.data.forEach(player => {
        if (player.startPos) {
          posStatus[player.startPos.toUpperCase()] = player.id;
        }
      });
      setPositionAssignStatus(posStatus);

    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  // --- Handle formation selection ---
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // --- Delete player handler ---
  const deletePlayer = async (id) => {
    try {
      await deleteTeamPlayer(id);
      setTeamPlayers(prev => prev.filter(player => player.id !== id));
      // Optionally refresh positions map after deletion
      fetchPlayers();
    } catch (error) {
      console.error('Error deleting player:', error);
      alert('Failed to delete player');
    }
  };

  // --- Modal open/close ---
  const openModal = (player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedPlayer(null);
    setIsModalOpen(false);
  };

  // --- Assign or unassign position ---
  const assignPosition = async (position) => {
    if (!selectedPlayer) {
      alert('Select a player first!');
      return;
    }

    try {
      const assignedToPlayerId = positionAssignStatus[position];
      // If the position is already assigned to this player => unassign
      if (assignedToPlayerId === selectedPlayer.id) {
        await axios.post('http://localhost:8080/api/team_player/unassign_position', {
          playerId: selectedPlayer.id,
          position,
        });
        
      } else {
        // Assign position to selected player
        await axios.post('http://localhost:8080/api/team_player/assign_position', {
          playerId: selectedPlayer.id,
          position,
        });
        alert(`Position ${position} assigned to ${selectedPlayer.name}`);
      }
      // Refresh players and position status
      await fetchPlayers();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data); // Position taken error
      } else {
        alert('Failed to assign/unassign position');
      }
    }
  };

  // --- Helper buttons for setting start/bench ---
  const updateBenchStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:8080/api/team_player/start_bench/${id}`, { benchStart: status });
      setTeamPlayers(prev =>
        prev.map(player => player.id === id ? { ...player, benchStart: status } : player)
      );
    } catch (error) {
      alert('Failed to update player status');
    }
  };

  return (
    <div>
      <div className={isModalOpen ? 'blurred' : ''}>
        <Header />

        <div className="side">
          <div className="formation">
            {/* You can put formation visuals or buttons here */}
          </div>

          <div className="formType">
            <h3>*Changing Formation Will Reset Players</h3>
            <select value={selectedOption} onChange={handleChange}>
              <option value="4-3-3">4-3-3</option>
              <option value="4-4-2">4-4-2</option>
            </select>

            {selectedOption === '4-3-3' && <DefaultForm />}
            {selectedOption === '4-4-2' && <SecondForm />}
          </div>

          <div className="starters">
            <h1 className="title">Starters</h1>
            <div className="divider"></div>
            {teamPlayers.filter(p => p.benchStart === 'start').map(player => (
              <div className="startPlayer" key={player.id} onClick={() => setSelectedPlayer(player)} style={{ cursor: 'pointer' }}>
                <h2>{player.name} {player.startPos ? `(${player.startPos})` : ''}</h2>
                <h3>{player.startPosition}</h3>
                <button onClick={() => {
                  updateBenchStatus(player.id, 'bench');
                  assignPosition(null);
                }}>
                  Bench
                </button>
                <button onClick={() => openModal(player)}>Info</button>
              </div>
            ))}
          </div>

          {/* Position Assignment Buttons */}
          <div className="posSelector" style={{ marginTop: '30px'
          }}>
            <h2>Assign Position for: {selectedPlayer ? selectedPlayer.name : 'Select a player'}</h2>
            {positions.map(pos => {
              const assignedToPlayerId = positionAssignStatus[pos];
              const isTakenByAnother = assignedToPlayerId && assignedToPlayerId !== selectedPlayer?.id;
              const isAssignedToSelected = assignedToPlayerId === selectedPlayer?.id;

              return (
                <button
                  key={pos}
                  onClick={() => assignPosition(pos)}
                  disabled={!selectedPlayer || isTakenByAnother}
                  style={{
                    opacity: isTakenByAnother ? 1 : 1,
                    cursor: isTakenByAnother ? 'not-allowed' : 'pointer',
                    backgroundColor: isAssignedToSelected ? 'lightgray' : 'lightgray',
                    margin: '5px 5px',
                    padding: '10px 12px',
                    borderRadius: '5px',
                    border: 'none',
                    fontWeight: 'bold',
                    justifyContent: 'center'
                  }}
                >
                  {pos}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bench players section */}
      <div className="team">
        {teamPlayers.filter(p => p.benchStart === 'bench').map(player => (
          <div className="player" key={player.id} onClick={() => setSelectedPlayer(player)} style={{ cursor: 'pointer' }}>
            <h2>{player.name} {player.startPos ? `(${player.startPos})` : ''}</h2>
            <button onClick={() => updateBenchStatus(player.id, 'start')}>Start</button>
            <button onClick={() => openModal(player)}>View Stats</button>
            <button className="remove" onClick={() => deletePlayer(player.id)}>Remove</button>
          </div>
        ))}
      </div>

      {/* Player Info Modal */}
      {isModalOpen && selectedPlayer && (
        <div className="modal-overlay">
          <div className="modal2">
            <h1>{selectedPlayer.name}</h1>
              <h2>Club: {selectedPlayer.club} </h2>
              <h2>Nationality: {selectedPlayer.nationality}</h2>
              <h2>Age: {selectedPlayer.age}</h2>
              <h2>Height: {selectedPlayer.height}</h2>
              <h2>Position: {selectedPlayer.position}</h2>
              <h2>Foot: {selectedPlayer.foot}</h2>
              <h2>Shirt #: {selectedPlayer.shirtNr}</h2>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
