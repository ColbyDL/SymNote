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

const textEditor = () => {
  // Stores reference to an Editor.js instance
  const ejInstance = useRef();
  const [isMathMode, setIsMathMode] = useState(false);

  const [isSymbolPickerOpen, setIsSymbolPickerOpen] = useState(false);

  const [currentMathBlockIndex, setCurrentMathBlockIndex] = useState(null);
  const { fileId } = useParams();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const { user } = useUser();

  const combinedSymbols = [
    ...arithmetic,
    ...arrows,
    ...greek,
    ...logical,
    ...misc,
    ...relational,
  ];

  console.log("textEditor", fileId);

  let isFetching = false;

  /*
  useEffect(() => {
    if ( user && fileId && loading) {
      fetchFile();
      setLoading(false);
    } else if ( !user ) {
      setLoading(false);
    }
  }, [fileId, loading, user]);
  */

  const initEditor = () => {
    // Create editor
    const editor = new EditorJS({
      // ID for the editor dom
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
              //Katex Rendering Configuration
              throwOnError: false, //Will not crash the entire site if katex fails to render
            },
          },
        },
      },
      data: {
        blocks: [
          {
            type: "paragraph",
            data: {
              text: "", // Empty paragraph block as the first block
            },
          },
        ], // You can pre-load some default content here
      },

      // Prevents editor border from extending down, creating unused space
      minHeight: 0,
      // When the editor is loaded and ready, the reference now refers to the editor
      onReady: () => {
        ejInstance.current = editor;
        new Undo({ editor });
      },
      // Autofocuses on the editor after loading.
      autofocus: true,

      // Gets the editors data within content.
      onChange: async () => {
        let content = await editor.saver.save();
        console.log(content);
      },
      // Initial text within the editor.
      placeholder: "Enter your text here!",
    });
  };

  // Ensures the editor loads once and destroys itself when it unmounts
  useEffect(() => {
    if (ejInstance.current === null ) {
      initEditor();
    }

    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, [file]);

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

   

  if (loading) {
    return (
      <div className="flex">
        <div id="editor-toolbar" className="">
          <div id="tool" className="basis-1/10">
            <button onClick={file ? saveEditor : null}>
              <FontAwesomeIcon icon={faFloppyDisk} />
            </button>
          </div>
          <div id="tool" className="basis-1/10">
            {!isMathMode && (
              <button onClick={insertMathBlock}>
                <FontAwesomeIcon icon={faSquareRootVariable} />
              </button>
            )}
            {isMathMode && (
              <button onClick={exitMathMode}>
                <FontAwesomeIcon icon={faX} />
              </button>
            )}
          </div>
        </div>
        <div id="filename" className="">
          <form>
            <input
              className="filename-text"
              onChange={(e) => {
                setFileName(e);
              }}
              type="text"
              name="filename"
              value="Loading Document"
            ></input>
          </form>
        </div>

        <div id="editorjs" className="rounded-lg"></div>

        {isMathMode && <SymbolPicker />}
      </div>
    );
  }

  // Displays the editor
  return (
    <div className="pt-32">
      <div id="editor-toolbar" className="">
        <div id="tool" className="basis-1/10">
          <button data-tooltip-id="getstarted-save" data-tooltip-content="Sign In to Save">
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
          <ReactTooltip id="getstarted-save"/>
        </div>

        <div id="tool" className="basis-1/10">
          <button data-tooltip-id="getstarted-export" data-tooltip-content="Sign In to Export">
            <FontAwesomeIcon icon={faFileExport} />
          </button>
          <ReactTooltip id="getstarted-export"/>
        </div>
        <div id="tool" className="basis-1/10">
          <button onClick={insertMathBlock} data-tooltip-id="getstarted-mathblock" data-tooltip-content="Insert Math Block">
            <FontAwesomeIcon icon={faSquareRootVariable} />
          </button>
          <ReactTooltip id="getstarted-mathblock" />
        </div>
        <div id="tool" className="basis-1/10">
          {/* Button to open/close Symbol Picker */}
          <button onClick={toggleSymbolPicker} data-tooltip-id="getstarted-symbol" data-tooltip-content="Symbol Picker">
            <FontAwesomeIcon icon={isSymbolPickerOpen ? faMinus : faPlus} />
          </button>
          <ReactTooltip id="getstarted-symbol" />
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

export default textEditor;
