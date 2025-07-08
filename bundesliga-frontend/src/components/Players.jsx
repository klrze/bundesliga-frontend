import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from "./Header";
import { allPlayers } from '../services/Service';

import Card from './Card';

const Players = () => {




  return (
    <div>
      <Header />
      <Card />

    </div>
  )
}

export default Players