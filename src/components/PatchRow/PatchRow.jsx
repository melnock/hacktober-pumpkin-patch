import React from 'react';
import './PatchRow.css';
import PumpkinPlot from "../PumpkinPlot/PumpkinPlot";

const PatchRow = ({pumpkins}) => {
  const PumpkinPlots = pumpkins.map((pumpkin, index) => <PumpkinPlot key={index} pumpkin={pumpkin}/>);
  return (
    <div className="patch-row">
      {PumpkinPlots}
    </div>
  );
}

export default PatchRow;
