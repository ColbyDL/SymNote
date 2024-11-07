import React, {useState, useEffect} from 'react';
import symbolsData from '../public/symbols/katexSymbols.json'
import symbolsArrows from '../public/symbols/Arrows.json'
import symbolsGreek from '../public/symbols/Greek_Letters.json'
import symbolsLogic from '../public/symbols/Logical_and_Set_Notation.json'
import symbolsRelational from '../public/symbols/Relational_Operators.json'
import symbolsMisc from '../public/symbols/Miscellaneous_Symbols.json'

const SymbolPicker = () => {
    const [symbols, setSymbols] = useState([]);
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const categories = {
      '↔\nArrows\n↔': symbolsArrows,
      'Ξ\nGreek Letters\nΞ': symbolsGreek,
      '∈\nLogical and Set Notation\n∋': symbolsLogic,
      '<\nRelational Operators\n>': symbolsRelational,
      'Miscellaneous': symbolsMisc,
    };

    const handleCategoryChange = (category) => {
      setSymbols(categories[category]);
    }

    // useEffect(() => {
    //   setSymbols(symbolsData);
    // }, []);
  
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
        className="symbol-picker p-4 rounded-lg shadow-lg cursor-move align-middle"
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 1000,
          width: '700px',
        }}
        onMouseDown={startDragging}
        onMouseMove={onDragging}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        <h2 className="sym-pick-header font-bold text-lg mb-2">Mathematical Symbol Selector</h2>

        {/* Category selection buttons */}
        <div className="mb-4 flex gap-2">
          {Object.keys(categories).map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className="category-btns p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
          {category.replace('_', ' ')}
          </button>
        ))}
      </div>



        <div className="flex flex-wrap gap-3">
          {symbols.map((item, index) => (
            <button
              key={index}
              onClick={() => copyToClipboard(item.latex)}  // Copy LaTeX to clipboard
              className="symbol-btns p-2 border border-gray-300 rounded shadow hover:bg-gray-200"
            >
              {item.symbol}
            </button>
          ))}
        </div>
      </div>
    );
  };

export default SymbolPicker;
