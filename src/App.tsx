import React, { useState, useEffect } from 'react';
import Markblock from './components/markblock';
import './index.css';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Load dark mode preference from localStorage
    return localStorage.getItem('darkMode') === 'true';
  });

  const [blocks, setBlocks] = useState<{ id: number; content: string }[]>(() => {
    // Load blocks from localStorage
    const savedBlocks = localStorage.getItem('blocks');
    return savedBlocks ? JSON.parse(savedBlocks) : [];
  });

  // Sync dark mode state with localStorage and apply class to body
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Sync blocks state with localStorage
  useEffect(() => {
    localStorage.setItem('blocks', JSON.stringify(blocks));
  }, [blocks]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const addBlock = () => {
    setBlocks((prevBlocks) => [
      ...prevBlocks,
      { id: prevBlocks.length + 1, content: "Use '#' for **headings**,\n'-' for *unordered* lists,\n '1.' for *numbered* lists,\n\n or read [Markdown syntax](https://www.markdownguide.org/basic-syntax/)" },
    ]);
  };

  const deleteBlock = (id: number) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
  };

  const updateContent = (id: number, newContent: string) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, content: newContent } : block
      )
    );
  };

  return (
    <main className={darkMode ? 'app dark-mode' : 'app'}>
      
      <article className='mark-header'>
        <section>
          <h1>
            Mark<span className={darkMode ? 'it dark-mode' : 'it'}>IT</span>
          </h1> 
          <button onClick={toggleDarkMode} >
            {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>                 
        </section>
        <section>
          <button onClick={addBlock} >
            Add new block
          </button>          
        </section>

      </article>

      <article className="mark-block">
        {blocks.map((block) => (
          <Markblock
            counter={block.id}
            content={block.content}
            onDelete={() => deleteBlock(block.id)}
            onUpdate={(newContent) => updateContent(block.id, newContent)}
          />
        ))}
      </article>

    </main>
  );
};

export default App;
