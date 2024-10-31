'use client';

import { useState } from 'react';

const fileNav = () => {
    const[isActive, setIsActive] = useState(false);

    const tabClick = () => {
      setIsActive(!isActive);
    }

    return (
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
    );
};

export default fileNav;