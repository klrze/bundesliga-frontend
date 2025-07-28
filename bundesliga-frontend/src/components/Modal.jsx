import React from 'react';
import './Modal.css';

const Modal = ({ closeModal, loading, player }) => {
  return (
    <div>
      <div className="modal">
        {loading ? (
          <p>Loading...</p>
        ) : player?.error ? (
          <p>{player.error}</p>
        ) : (
          <>
            <h1>{player?.name}</h1>
            <h2>Club: {player?.club}</h2>
            <h2>Nationality: {player?.nationality}</h2>
            <h2>Position: {player?.position}</h2>
            <h2>Dom. Foot: {player?.foot}</h2>
            <h2>Age: {player?.age}</h2>
            <h2>Height: {player?.height}</h2>
            <h2>Shirt #: {player?.shirtNumber}</h2>
          </>
        )}
        <button className="close" onClick={() => closeModal(false)}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
