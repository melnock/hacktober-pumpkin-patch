import React from 'react';
import './App.css';

import PatchHeader from './components/PatchHeader/PatchHeader';
import Patch from './components/Patch/Patch';

function App() {
  return (
    <div className="App">
      <PatchHeader/>
      <Patch/>
    </div>
  );
}

export default App;
