import React from 'react'
import './Card.css';
import { allPlayers } from '../services/Service';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Card = () => {

  const [players, setPlayers] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [isSorted, setIsSorted] = useState(false);



  useEffect(() => {
    // Replace this URL with your actual endpoint
  axios.get('http://localhost:8080/api/player') // default, unsorted
    .then((res) => setPlayers(res.data))
    .catch((err) => console.error('Error fetching players:', err));
  }, []);

  const toggleSort = () => {
  const url = isSorted
    ? 'http://localhost:8080/api/player'           // default
    : 'http://localhost:8080/api/player/alpha';   // A–Z

  axios.get(url)
    .then((res) => {
      setPlayers(res.data);
      setIsSorted(!isSorted); // toggle the sort state
    })
    .catch((err) => console.error('Error toggling sort:', err));
};

  function getAllPlayers() {
    allPlayers().then((Response) => {
    setPlayers(Response.data);
    }).catch(error => {
      console.error(error);
    })
  }

    const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
const playersToDisplay = searchTerm ? filteredPlayers : players.slice(0, 50);

  const resetToDefault = () => {
    fetchDefaultPlayers();
    setIsSorted(false);
  };

  
  
  return (
    <div>
      <div className="search">
      <h2 className="search-label">Search</h2>
      <input type="text"
        placeholder="Search players..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
         style={{ padding: '10px', width: '100%' }}/>
      </div>
      <div className="players">
      {playersToDisplay.map((player) => (
      <div className="cards" key={player.id}>
          <h2 className="playerInfo">{player.name}</h2>  
          <p className="playerInfo">{player.club}</p>
          <p className="playerInfo">{player.nationality}</p>
        </div>
        ))}
      </div>
      <div className="button">
        <h2>Sort by:</h2>
        <button onClick={toggleSort} className={isSorted ? 'sorted-button' : 'default-button'}>A–Z</button>

      </div>
    </div>
  )
}

export default Card