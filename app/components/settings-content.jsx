'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';

const settingsContent = () => {
    const [themeText, setThemeText] = useState('Light');

    const handleClick = (string) => {
        setThemeText(string);
    };

    useEffect(() => {
        themeChange(false)
        //false parameter is required for react project
      }, [])

    return (
        <>
        <div className="flex flex-row">
            <p className="text-lg font-bold pl-8 self-center">Theme: </p>
            <details className="dropdown">
                <summary className="btn m-1">{themeText}</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><button data-set-theme="" data-act-class="ACTIVECLASS" onClick={() => handleClick('Light')}>Light</button></li>
                    <li><button data-set-theme="dark" data-act-class="ACTIVECLASS" onClick={() => handleClick('Dark')}>Dark</button></li>
                    <li><button data-set-theme="cupcake" data-act-class="ACTIVECLASS" onClick={() => handleClick('Cupcake')}>Cupcake</button></li>
                    <li><button data-set-theme="synthwave" data-act-class="ACTIVECLASS" onClick={() => handleClick('Synthwave')}>Synthwave</button></li>
                    <li><button data-set-theme="aqua" data-act-class="ACTIVECLASS" onClick={() => handleClick('Aqua')}>Aqua</button></li>
                </ul>
            </details>
        </div>
        </>    
    )
}
  
export default settingsContent