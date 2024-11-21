import React, { useEffect, useRef, useState } from "react";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import MathTool from "editorjs-math";
import SymbolPicker from "./SymbolPicker";
import Undo from "editorjs-undo";
import FileNav from "./fileNav";

import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";

import { useParams } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faSquareRootVariable,
} from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

import "katex/dist/katex.min.css";
import jsPDF from "jspdf";
import arithmetic from "../public/symbols/Arithmetic_and_Algebra.json";
import arrows from "../public/symbols/Arrows.json";
import greek from "../public/symbols/Greek_Letters.json";
import logical from "../public/symbols/Logical_and_Set_Notation.json";
import misc from "../public/symbols/Miscellaneous_Symbols.json";
import relational from "../public/symbols/Relational_Operators.json";

import { useUser } from "@auth0/nextjs-auth0/client";

const TextEditorStarted = () => {
  // Stores reference to an Editor.js instance
  const ejInstance = useRef();
  const [isMathMode, setIsMathMode] = useState(false);

  const [isSymbolPickerOpen, setIsSymbolPickerOpen] = useState(false);

  const [currentMathBlockIndex, setCurrentMathBlockIndex] = useState(null);
  const { fileId } = useParams();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const { user } = useUser();
  const [init, setInit] = useState(false);

  const combinedSymbols = [
    ...arithmetic,
    ...arrows,
    ...greek,
    ...logical,
    ...misc,
    ...relational,
  ];


  const sampleData = {
    blocks: [
      {
        type: "header",
        data: {
          text: "Get Started",
          level: 1,
        },
      },
      {
        type: "paragraph",
        data: {
          text: "This is your sample document. Start editing to get started!",
        },
      },
    ],
  };

  const initEditor = () => {
    if (ejInstance.current) {
      console.log("already initialized")
      return; // Prevent reinitialization
    }
  
    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
        math: {
          class: MathTool,
          config: {
            katex: {
              throwOnError: false,
            },
          },
        },
      },
      data: sampleData,
      minHeight: 0,
      onReady: () => {
        ejInstance.current = editor;
        new Undo({ editor });
      },
      autofocus: true,
      onChange: async () => {
        let content = await editor.saver.save();
        console.log(content);
      },
      placeholder: "Enter your text here!",
    });
  };

  // Ensures the editor loads once and destroys itself when it unmounts
  useEffect(() => {
    console.log("init triggered")
    if (!ejInstance.current && !init) {
      console.log("init started")
      initEditor();
    }

    return () => {
      setInit(true)
      console.log("destorying editor instance")
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  const insertMathBlock = () => {
    ejInstance.current.blocks.insert("math", {});
    setIsMathMode(true); // Enable math mode after inserting a block
  };

  // Function to toggle Symbol Picker visibility
  const toggleSymbolPicker = () => {
    setIsSymbolPickerOpen(!isSymbolPickerOpen);
  };

  // Exit math mode function
  const exitMathMode = () => {
    setIsMathMode(false); // Deactivate math mode
  };

  

    // Displays the editor
  return (
    <div className="pt-32 h-screen">
      <div id="editor-toolbar" className="">
        <div id="tool" className="basis-1/10">
          <button  data-tooltip-content="Sign In to Save" data-tooltip-id="save">
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
          <ReactTooltip id="save" />
        </div>

        <div id="tool" className="basis-1/10">
          <button data-tooltip-content="Sign In to Export" data-tooltip-id="export">
            <FontAwesomeIcon icon={faFileExport} />
          </button>
          <ReactTooltip id="export" />
        </div>
        <div id="tool" className="basis-1/10">
          <button onClick={insertMathBlock} data-tooltip-content="Insert Math Block" data-tooltip-id="mathblock">
            <FontAwesomeIcon icon={faSquareRootVariable} />
          </button>
          <ReactTooltip id="mathblock" />
        </div>
        <div id="tool" className="basis-1/10">
          {/* Button to open/close Symbol Picker */}
          <button onClick={toggleSymbolPicker} data-tooltip-content="Symbol Selector" data-tooltip-id="symbol">
            <FontAwesomeIcon icon={isSymbolPickerOpen ? faMinus : faPlus} />
          </button>
          <ReactTooltip id="symbol" />
        </div>
      </div>

      <div id="filename" className="">
        <input
          className="filename-text"
          type="text"
          name="filename"
          value="Get Started"
        ></input>
      </div>

      <div id="editorjs" className="rounded-lg"></div>

      {/* Render Symbol Picker if it's open */}
      {isSymbolPickerOpen && <SymbolPicker />}
    </div>
  );
};

export default React.memo(TextEditorStarted);
