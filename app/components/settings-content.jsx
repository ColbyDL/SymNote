"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import RandomSymbols from "../effects/randomSymbols";

const settingsContent = () => {
  const [theme, setTheme] = useState("light");

  const handleClick = (string) => {
    setTheme(string);
    setThemeTitle(string.charAt(0).toUpperCase() + string.slice(1));
  };

  useEffect(() => {
    themeChange(false);
    //false parameter is required for react project
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [theme]);

  const [themeTitle, setThemeTitle] = useState("Light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setThemeTitle(storedTheme.charAt(0).toUpperCase() + storedTheme.slice(1));
    }
  }, []);

  return (
    <div>
      <div className="flex flex-row  h-fit justify-center">
        <p className="text-lg font-bold pl-8 pr-2 pt-3">Theme: </p>
        <details className="dropdown">
          <summary className="btn m-1">{themeTitle}</summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li>
              <button
                data-set-theme=""
                data-act-class="ACTIVECLASS"
                onClick={() => handleClick("light")}
              >
                Light
              </button>
            </li>
            <li>
              <button
                data-set-theme="dark"
                data-act-class="ACTIVECLASS"
                onClick={() => handleClick("dark")}
              >
                Dark
              </button>
            </li>
            <li>
              <button
                data-set-theme="luxury"
                data-act-class="ACTIVECLASS"
                onClick={() => handleClick("luxury")}
              >
                Luxury
              </button>
            </li>
            <li>
              <button
                data-set-theme="cupcake"
                data-act-class="ACTIVECLASS"
                onClick={() => handleClick("cupcake")}
              >
                Cupcake
              </button>
            </li>
            <li>
              <button
                data-set-theme="synthwave"
                data-act-class="ACTIVECLASS"
                onClick={() => handleClick("synthwave")}
              >
                Synthwave
              </button>
            </li>
            <li>
              <button
                data-set-theme="aqua"
                data-act-class="ACTIVECLASS"
                onClick={() => handleClick("aqua")}
              >
                Aqua
              </button>
            </li>
            <li>
              <button
                data-set-theme="coffee"
                data-act-class="ACTIVECLASS"
                onClick={() => handleClick("coffee")}
              >
                Coffee
              </button>
            </li>
            <li>
              <button
                data-set-theme="valentine"
                data-act-class="ACTIVECLASS"
                onClick={() => handleClick("valentine")}
              >
                Valentine
              </button>
            </li>
          </ul>
        </details>
      </div>
      <div className="symbol-backdrop flex flex-row place-items-end justify-around">
        <RandomSymbols />
      </div>
    </div>
  );
};

export default settingsContent;
