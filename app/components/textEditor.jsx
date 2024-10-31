"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import MathTool from 'editorjs-math';
import SymbolPicker from './SymbolPicker';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareRootVariable } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';

const textEditor = () => {
  // Stores reference to an Editor.js instance
  const ejInstance = useRef();
  const [isMathMode, setIsMathMode] = useState(false);
  const [isSymbolPickerOpen, setIsSymbolPickerOpen] = useState(false);

  const initEditor = () => {
    // Create editor
    const editor = new EditorJS({
      // ID for the editor dom
      holder: 'editorjs',
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
      // Prevents editor border from extending down, creating unused space
      minHeight: 0,
      // When the editor is loaded and ready, the reference now refers to the editor
      onReady: () => {
        ejInstance.current = editor;
      },
      // Autofocuses on the editor after loading.
      autofocus: true,

      // Gets the editors data within content.
      onChange: async () => {
        let content = await editor.saver.save();
        console.log(content);
      },
      // Initial text within the editor.
      placeholder: 'Enter your text here!'
    });
  };

  // Ensures the editor loads once and destroys itself when it unmounts
  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
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
    setIsMathMode(false);
  };
  

  // Displays the editor
    return (
    
    <div>
      <div id="editor-toolbar" className="">
        <div id="filename" className="">
          <form><input type="text" name="filename" placeholder="New Document"></input></form>
        </div>
        <div id="tool" className="basis-1/10">
          {!isMathMode && (
            <button
              onClick={insertMathBlock}
            >
              <FontAwesomeIcon icon={faSquareRootVariable} />
            </button>
          )}
          {/* Button to open/close Symbol Picker */}
        <button
          className="p-2 bg-green-500 text-white rounded"
          onClick={toggleSymbolPicker}
        >
        {isSymbolPickerOpen ? "Close Symbol Picker" : "Open Symbol Picker"}
        </button>
        </div>
        <div id="tool" className="basis-1/10">
          <p>T2</p>
        </div>
      </div>

      <div id="editorjs" className="rounded-lg"></div>

      {/* Render Symbol Picker if it's open */}
      {isSymbolPickerOpen && <SymbolPicker />}
  </div>
  );
};

export default textEditor;
