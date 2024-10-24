"use client";

import React, { useEffect, useRef, useState } from "react"
import EditorJS from "@editorjs/editorjs"
import Header from "@editorjs/header"
import MathTool from 'editorjs-math';
import SymbolPicker from './SymbolPicker';

const textEditor = () => {
  // Stores reference to an Editor.js instance
  const ejInstance = useRef();
  const [isMathMode, setIsMathMode] = useState(false);
  const [currentMathBlockIndex, setCurrentMathBlockIndex] = useState(null);

  const initEditor= () => {
    // Create editor
    const editor = new EditorJS({
      // ID for the editor dom
      holder: 'editorjs',
      tools: {
        header:{
          class: Header,
          inlineToolbar: true
        },
        math:{
          class: MathTool,
          config:{
            katex:{ //Katex Rendering Configuration
              throwOnError: false, //Will not crash the entire site if katex fails to render
            }
          }
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
  }

  // Ensures the editor loads once and destroys itself when it unmounts
  useEffect(() => {
    if(ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    }
  }, []);
  

  const insertMathBlock = () => {
    ejInstance.current.blocks.insert('math', {});
    setIsMathMode(true);  // Activate math mode
  };

  const exitMathMode = () => {
    setIsMathMode(false);  // Deactivate math mode
  };
  

  // Displays the editor
    return (
    <>
      <h1 className="text-4xl font-bold text-center mb-10">Your Document</h1>

      <div className="flex justify-center mb-10">
        {!isMathMode && (
          <button
            className="p-2 bg-blue-500 text-white rounded"
            onClick={insertMathBlock}
          >
            Insert Math Block
          </button>
        )}
        {isMathMode && (
          <button
            className="p-2 bg-red-500 text-white rounded"
            onClick={exitMathMode}
          >
            Exit Math Mode
          </button>
        )}
      </div>

      <div id="editorjs" className="rounded-lg"></div>

      {isMathMode && <SymbolPicker/>}
    </>
  )
}

export default textEditor