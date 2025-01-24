import React, { useState } from 'react';
import Markblock from './components/markblock';
import './index.css';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [blocks, setBlocks] = useState<JSX.Element[]>([]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const addBlock = () => {
    setBlocks([...blocks, <Markblock key={blocks.length} />]);
  };

  return (
    <main className={darkMode ? 'app dark-mode' : 'app'}>
      <article>
        <button onClick={toggleDarkMode} className="mode-switch">
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
        <h1 className="title">
          Mark<span className={darkMode ? 'it dark-mode' : 'it'}>IT</span>
        </h1>
      </article>
    <article className='mark-block'>
      <button onClick={addBlock} className='mode-switch'>+</button>
      {blocks.map((block) => block)}
    </article>
    </main>
  );
};

export default App;