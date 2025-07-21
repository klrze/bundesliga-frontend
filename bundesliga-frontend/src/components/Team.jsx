import React from 'react'
import Header from './Header'
import './Team.css'
import { useState } from 'react'
import DefaultForm from './DefaultForm';
import SecondForm from './SecondForm';
import { deleteTeamPlayer } from '../services/Service';
import { allTeamPlayers } from '../services/Service'; 
import axios from 'axios';
import { useEffect } from 'react';
import '../App.css';


const Team = () => {
  
   const [selectedOption, setSelectedOption] = useState('4-3-3');
   const [teamPlayers, setTeamPlayers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);


    const handleChange = (event) => {
    setSelectedOption(event.target.value); // update state to selected option
  };

  useEffect(() => {
    // Replace this URL with your actual endpoint
  axios.get('http://localhost:8080/api/team_player') // default, unsorted
    .then((res) => setTeamPlayers(res.data))
    .catch((err) => console.error('Error fetching players:', err));
  }, []);

  const deletePlayer = async (id)  => {
    try {
      await deleteTeamPlayer(id);
      setTeamPlayers(teamPlayers.filter(player => player.id !== id));
    } catch (error) {
      console.error('Error deleting player:', error);
      alert("Failed to delete player");
    }
  };


  const openModal = (player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedPlayer(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className={isModalOpen ? 'blurred' : ''}>
      <Header />
      
        <div className="side"> 
          <div className="formation">
            
          </div>
          <div className="formType">
          <select value={selectedOption} onChange={handleChange}>
              <option value="4-3-3">4-3-3</option>
              <option value="4-4-2">4-4-2</option>
            </select>
            {selectedOption === '4-3-3' && 
              <div className="form433">
                <DefaultForm />
              </div>}
            {selectedOption === '4-4-2' && 
              <div className="form442">
                <SecondForm />
                </div>}
              </div>
              
          <div className="bench">
            <h1 className="title">Bench</h1>
            <div className="divider"></div>
            {teamPlayers
  .filter(player => player.benchStart === "bench")
  .map(player => (
            <div className="benchPlayer" key={player.id}>
              <h2>{player.name}</h2>
              <button className="start">Start</button>
              <button className="info" onClick={() => openModal(player)}>Info</button>
              <button className="remove" onClick={() => deletePlayer(player.id)}>Remove</button>
            </div> ))}
          </div> 
                
        </div>
        </div>
        
        <div className="team">
          {teamPlayers.map(player => (
          <div className="player" key={player.id}>
              <h2>{player.name}</h2>
              <button onClick={() => openModal(player)}>View Stats</button>
          </div>
          ))}

        </div>

      {isModalOpen && selectedPlayer && (
  <div className="modal-overlay">
    <div className="modal">
      <h3>{selectedPlayer.name}</h3>
      <ul>
        {selectedPlayer.teamInfo?.length > 0 ? (
          selectedPlayer.teamInfo.map((info, idx) => (
            <li key={idx}>{info}</li>
          ))
        ) : (
          <li>No team info available.</li>
        )}
      </ul>
      <button onClick={closeModal}>Close</button>
    </div>
  </div>
)}

        
      </div>
    
  )
}

export default Team