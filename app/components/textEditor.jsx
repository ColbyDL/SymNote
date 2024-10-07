"use client";

import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";

const textEditor = () => {
  // Stores reference to an Editor.js instance
  const ejInstance = useRef();

  const initEditor= () => {
    // Create editor
    const editor = new EditorJS({
      // ID for the editor dom
      holder: 'editorjs',
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
  
  // Displays the editor
    return (
    <div id="editorjs"></div>
  )
}

export default textEditor