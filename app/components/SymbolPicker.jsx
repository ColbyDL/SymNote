import React, {useState} from 'react';
import symbolsArrows from '../public/symbols/Arrows.json'
import symbolsGreek from '../public/symbols/Greek_Letters.json'
import symbolsLogic from '../public/symbols/Logical_and_Set_Notation.json'
import symbolsRelational from '../public/symbols/Relational_Operators.json'
import symbolsMisc from '../public/symbols/Miscellaneous_Symbols.json'

const SymbolPicker = () => {
    const [symbols, setSymbols] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });    
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const categories = {
      '↔\nArrows\n↔': symbolsArrows,
      'Ξ\nGreek Letters\nΞ': symbolsGreek,
      '∈\nLogical and Set Notation\n∋': symbolsLogic,
      '<\nRelational Operators\n>': symbolsRelational,
      'Miscellaneous': symbolsMisc,
    };

    const handlePointerDown = (event) => {
      setIsDragging(true);
      event.target.setPointerCapture(event.pointerId);

      setStartPos({ x: event.clientX - position.x, y:event.clientY - position.y });
    }

    const handlePointerMove = (event) => {
      if (isDragging) {
        const newX = event.clientX - startPos.x;
        const newY = event.clientY - startPos.y;
        setPosition({ x: newX, y: newY});
      }
    }

    const handlePointerUp = (event) => {
      setIsDragging(false);
      event.target.releasePointerCapture(event.pointerId);
    }


    const handleCategoryChange = (e) => {
      const category = e.target.value;
      setSymbols(categories[category] || []);
    }
  
    // const startDragging = (e) => {
    //   setIsDragging(true);
    //   setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
    // };
  
    // const onDragging = (e) => {
    //   if (isDragging) {
    //     setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    //   }
    // };
  
    // const stopDragging = () => {
    //   setIsDragging(false);
    // };
  
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
          width: '300px',
        }}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        //onMouseLeave={stopDragging}
      >
      <h2 className="sym-pick-header font-bold text-lg mb-2">Mathematical Symbol Selector</h2>
      
      {/* Category selection dropdown */}
      <div className="mb-4 flex gap-2">
        <select 
          onChange={handleCategoryChange} 
          className='p-2 bg-blue-500 text-white rounded'>
          
          <option value ="">Select a category</option>
          {Object.keys(categories).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
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
