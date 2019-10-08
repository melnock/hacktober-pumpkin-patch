import React from 'react';
import './PatchHeader.css';
import fence from '../../assets/fence.png';

function PatchHeader() {
  const numberOfFences = Math.floor(window.innerWidth / 346);
  const Fences = [];
  for (let i = 0; i < numberOfFences; i++) {
    Fences.push(<img key={i} src={fence} alt="spooky fence"/>)
  }

  return (
    <div className="patch-header">
      <h1>Welcome to the Pumpkin Patch!</h1>
      <div className="fence-wrapper">
        {Fences}
      </div>
    </div>
  );
}

export default PatchHeader;
