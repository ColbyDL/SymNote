import React, {useState, useEffect} from 'react';
import symbolsData from '../public/katexSymbols.json'

const SymbolPicker = () => {
    const [symbols, setSymbols] = useState([]);
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
      setSymbols(symbolsData);
    }, []);
  
    const startDragging = (e) => {
      setIsDragging(true);
      setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
    };
  
    const onDragging = (e) => {
      if (isDragging) {
        setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
      }
    };
  
    const stopDragging = () => {
      setIsDragging(false);
    };
  
    // Function to copy the LaTeX syntax to the clipboard
    const copyToClipboard = (latex) => {
      navigator.clipboard.writeText(latex)
        .then(() => {
          alert(`Copied: ${latex} 
            \nTo insert superscript and subscript, use ^{value} and _{value} respectively.`);
        })
        .catch(err => {
          console.error("Could not copy text: ", err);
        });
    };
  
    return (
      <div
        className="symbol-picker p-4 bg-gray-100 rounded-lg shadow-lg cursor-move"
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 1000,
          width: '250px',
        }}
        onMouseDown={startDragging}
        onMouseMove={onDragging}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        <h2 className="font-bold text-lg mb-2">Select a Symbol</h2>
        <div className="flex flex-wrap gap-3">
          {symbols.map((item, index) => (
            <button
              key={index}
              onClick={() => copyToClipboard(item.latex)}  // Copy LaTeX to clipboard
              className="p-2 bg-white border border-gray-300 rounded shadow hover:bg-gray-200"
            >
              {item.symbol}
            </button>
          ))}
        </div>
      </div>
    );
  };

export default SymbolPicker;
