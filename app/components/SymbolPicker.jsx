import React, {useState} from 'react';
import symbolsArrows from '../public/symbols/Arrows.json'
import symbolsGreek from '../public/symbols/Greek_Letters.json'
import symbolsLogic from '../public/symbols/Logical_and_Set_Notation.json'
import symbolsRelational from '../public/symbols/Relational_Operators.json'
import symbolsArith from '../public/symbols/Arithmetic_and_Algebra.json'
import symbolsMisc from '../public/symbols/Miscellaneous_Symbols.json'

const SymbolPicker = () => {
    const [symbols, setSymbols] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [positionState, setPositionState] = useState({ x: 100, y: 100 });
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });   
    const [miscIndex, setMiscIndex] = useState(20); //tracking how many symbols will be rendered by misc
    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = {
      '↔\nArrows\n↔': symbolsArrows,
      'Arithmetic & Algebra': symbolsArith,
      'Ξ\nGreek Letters\nΞ': symbolsGreek,
      '∈\nLogical and Set Notation\n∋': symbolsLogic,
      '<\nRelational Operators\n>': symbolsRelational,
      'Miscellaneous': symbolsMisc,
    };

    const handlePointerDown = (event) => {
  setIsDragging(true);

  try {
    // Attempt to capture the pointer for drag interactions
    event.target.setPointerCapture(event.pointerId);
  } catch (error) {
    console.error("Failed to set pointer capture:", error);
  }

  setStartPos({ x: event.clientX - positionState.x, y: event.clientY - positionState.y });
};

const handlePointerMove = (event) => {
  if (isDragging) {
    const newX = event.clientX - startPos.x;
    const newY = event.clientY - startPos.y;
    setPositionState({ x: newX, y: newY });
  }
};

const handlePointerUp = (event) => {
  setIsDragging(false);

  try {
    // Attempt to release the pointer capture
    event.target.releasePointerCapture(event.pointerId);
  } catch (error) {
    console.error("Failed to release pointer capture:", error);
  }
};



    const handleCategoryChange = (e) => {
      const category = e.target.value;
      setSelectedCategory(category);
      if(category === 'Miscellaneous') {
        setSymbols(symbolsMisc.slice(0,20)); //load first 20 symbols
        setMiscIndex(20);
      }
      else {
        setSymbols(categories[category] || []);
        setMiscIndex(20);
      }
    }
    
    const handleViewMore = () => {
      const newSymbols = symbolsMisc.slice(miscIndex, miscIndex + 20); //load 20 more symbols
      setSymbols((prevSymbols) => [...prevSymbols, ...newSymbols]);
      setMiscIndex(miscIndex + 20);
    }
  
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
          position: 'relative',
          left: `${positionState.x}px`,
          top: `${positionState.y}px`,
          zIndex: 1000,
          width: '300px',
        }}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
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
  
        {/* View More Misc Symbols */}
        {selectedCategory === 'Miscellaneous' && symbols.length < symbolsMisc.length && (
          <button
            onClick={handleViewMore}
            className='mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              View More
            </button>
        )}
      </div>
    );
  };
  

export default SymbolPicker;
