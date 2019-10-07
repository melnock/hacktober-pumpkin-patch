import React from 'react';
import './PumpkinPlot.css';

const PumpkinPlot = ({pumpkin}) => {
  if (pumpkin) {
    const images = require.context('../../assets', true);
    let pumpkinImage = images('./' + pumpkin.src);

    return (
      <div className="pumpkin-plot">
        <img src={pumpkinImage} alt={pumpkin.title}/>
      </div>
    );
  }
  return (
    <div className="pumpkin-plot"/>
  );
};

export default PumpkinPlot;
