import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import MathTool from "editorjs-math";
import SymbolPicker from "./SymbolPicker";
import Undo from "editorjs-undo";



import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";

import { useParams } from "next/navigation";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faSquareRootVariable } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';

import { jsPDF } from "jspdf";
import katex from "katex";
import html2canvas from "html2canvas";
import "katex/dist/katex.min.css";



const textEditorStarted = () => {
  // Stores reference to an Editor.js instance
  const ejInstance = useRef(null);
  const [isMathMode, setIsMathMode] = useState(false);

  const [isSymbolPickerOpen, setIsSymbolPickerOpen] = useState(false);


  const [currentMathBlockIndex, setCurrentMathBlockIndex] = useState(null);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(true);
  const [fileName, setFileName] = useState("");


  


  

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [loading]);



  const initEditor = () => {
    // Create editor
    const editor = new EditorJS({
      // ID for the editor dom
      holder: "editorjs1",
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
        blocks: [],
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
      setFileName("Get Started");
    }

    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };


  }, []);
 

  const insertMathBlock = () => {
    ejInstance.current.blocks.insert("math", {});
    setIsMathMode(true);  // Enable math mode after inserting a block
  };

  // Function to toggle Symbol Picker visibility
  const toggleSymbolPicker = () => {
    setIsSymbolPickerOpen(!isSymbolPickerOpen);

  };

  // Exit math mode function
  const exitMathMode = () => {

    setIsMathMode(false); // Deactivate math mode
  };

  

  

  const handleChange = (event) => {
    setFileName(event.target.value);
  };

  useEffect(() => {
    if (file) {
      updateFileName();
    }
  }, [fileName]);

  useEffect(() => {
    if (file) {
      setLoading(false);
    }
  }, [file]);

  

  if (loading) {
    return (

      <div className="flex">
        <div id="editor-toolbar" className="">
          <div id="tool" className="basis-1/10">
            <button>
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


        <div id="editorjs1" className="rounded-lg"></div>

        {isMathMode && <SymbolPicker />}
      </div>
    );
  }

  // Displays the editor
  return (

    <div className="pt-32">
      <div id="editor-toolbar" className="">
        <div id="tool" className="basis-1/10">
          <button>
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
        </div>
        <div id="tool" className="basis-1/10">

          
            <button
              onClick={insertMathBlock}
            >
              <FontAwesomeIcon icon={faSquareRootVariable} />
            </button>
        </div>
        <div id="tool" className="basis-1/10">
          {/* Button to open/close Symbol Picker */}
          <button
            onClick={toggleSymbolPicker}
          >
          <FontAwesomeIcon icon={isSymbolPickerOpen ? faMinus : faPlus} />
          </button>


        </div>
        
        <div id="tool" className="basis-1/10">
          <button >
            <FontAwesomeIcon icon={faFileExport} />
          </button>
        </div>
      </div>

      <div id="filename" className="">
        <form>
          <input
            className="filename-text"
            type="text"
            name="filename"
            value={fileName}
          ></input>
        </form>
      </div>

      <div id="editorjs1" className="rounded-lg"></div>


      {/* Render Symbol Picker if it's open */}
      {isSymbolPickerOpen && <SymbolPicker />}
  </div>

  );
};

export default textEditorStarted;
