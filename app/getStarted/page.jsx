"use client";

import TextEditor from '../components/textEditor';
import { useState } from 'react';

const getStarted = () => {

  const[isActive, setIsActive] = useState(false);

  const tabClick = () => {
    setIsActive(!isActive);
  }

  return (
    <div>
      <div id="editor-file-nav" className={isActive ? 'file-nav-active' : ''}>
        <div id="nav-tab">
          <button onClick={tabClick}>
            →
          </button>
        </div>
        <ul>
          <li id="folder">
            folder 1
            <button id="file">
              file 1
            </button>
            <button id="file">
              file 2
            </button>
          </li>
          <li id="folder">
            folder 2
            <button id="file">
              file 1
            </button>
          </li>
        </ul>
      </div>
      <div> 
        <TextEditor />
      </div>
    </div>
  )
}

export default getStarted;