import React from 'react'
import './PosModal.css';
import { updateStartPos } from '../services/Service';
const PosModal = ({ closePosModal, posPlayer, formation}) => {
  return (
    <div>
      <div className="pos-modal">
        <h1>Select Positon for: {posPlayer?.name}</h1>
        <button className="close" onClick={()  =>    closePosModal(false)}>Close</button>
        {formation === "4-3-3" && 
          <div className="pos-433">
            <button>ST</button>
            <button>LW</button>
            <button>RW</button>
            <button>CM</button>
            <button>CM</button>
            <button>DM</button>
            <button>LB</button>
            <button>RB</button>
            <button>CB</button>
            <button>CB</button> 
            <button onClick={() => updateStartPos(posPlayer.id, 'GK')}>GK</button>
             </div>  }
          {formation === "4-4-2" && 
            <div className="pos-442">
              <button>ST</button>
              <button>ST</button>
              <button>CM</button>
              <button>CM</button>
              <button>LM</button>
              <button>RM</button>
              <button>LB</button>
              <button>RB</button>
              <button>CB</button>
              <button>CB</button>
              <button>GK</button>
             </div>  }
      </div>
      
    </div>
  )
}

export default PosModal