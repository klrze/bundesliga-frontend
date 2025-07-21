import React from 'react'
import './DefaultForm.css'
import { allPlayers } from '../services/Service';
import { useState, useEffect } from 'react';
import axios from 'axios';  
import { allTeamPlayers } from '../services/Service';

const defaultForm = () => {

  useEffect(() => {
    // Replace this URL with your actual endpoint
  axios.get('http://localhost:8080/api/team_player') // default, unsorted
    .then((res) => setPlayers(res.data))
    .catch((err) => console.error('Error fetching players:', err));
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row1">
          <h2>GK</h2>
          <div className="goalkeeper">
            <h2>Player Name</h2>
          </div>
        </div>
        <div className="row2">
        
        </div>
        <div className="row3">
        
        </div>
        <div className="row4">
        
        </div>
      </div>
    </div>
  )
}

export default defaultForm