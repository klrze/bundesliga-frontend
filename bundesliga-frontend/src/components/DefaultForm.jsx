import React from 'react'
import './DefaultForm.css'
import { allPlayers } from '../services/Service';
import { useState, useEffect } from 'react';
import axios from 'axios';  
import { allTeamPlayers } from '../services/Service';

const defaultForm = () => {



  return (
    <div>
      <div className="container">
        <div className="row1">
          <h2>GK</h2>
          <div className="goalkeeper box">
            <h2>Player Name</h2>
          </div>
        </div>
        <div className="row2">
        
        </div>
        <div className="row3">
        
        </div>
        <div className="row4">
          <div className="leftwing box">
            
          </div>
          <div className="striker box">
          
          </div>
        </div>
      </div>
    </div>
  )
}

export default defaultForm