import React, { useState, useEffect } from 'react';

function RandomSymbols() {
  const [symbols, setSymbols] = useState([
    { content: '∞', visible: false },
    { content: '∑', visible: false },
    { content: 'π', visible: false },
    { content: '%', visible: false },
    { content: '+', visible: false },
    { content: '-', visible: false },
    { content: '/', visible: false },
    { content: '*', visible: false },
    { content: '√', visible: false },
    { content: '∫', visible: false },
    { content: '∿', visible: false },
    { content: 'θ', visible: false },
    { content: 'α', visible: false },
    { content: 'β', visible: false },
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newSymbols = symbols.map((symbol, index) => {
        const newVisible = Math.random() < 0.5;
        return { ...symbol, visible: newVisible };
      });
      setSymbols(newSymbols);
    }, 2750);

    return () => clearInterval(intervalId);
  }, [symbols]);

  return (
    <div className="w-full inline-flex justify-between">
      {symbols.map((symbol, index) => (
        <p className="rising-text basis-4 object-bottom text-3xl font-mono max-[515px]:text-lg"key={index} style={{ display: symbol.visible ? 'inline-flex' : 'none' }}>
          {symbol.content}
        </p>
      ))}
    </div>
  );
}

export default RandomSymbols;