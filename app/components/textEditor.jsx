import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import MathTool from 'editorjs-math';
import SymbolPicker from './SymbolPicker';
import Undo from 'editorjs-undo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareRootVariable } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

import { useParams } from "next/navigation";


const textEditor = () => {
  // Stores reference to an Editor.js instance
  const ejInstance = useRef();
  const [isMathMode, setIsMathMode] = useState(false);
  const [currentMathBlockIndex, setCurrentMathBlockIndex] = useState(null);
  const { fileId } = useParams();
  const [file, setFile] = useState()
  const [loading, setLoading] = useState(true)
  const [ fileName, setFileName ] = useState("")

  
  console.log("textEditor", fileId)


  const fetchFile = async () => {
    console.log("fileId", fileId)
    if (!fileId) return;

    try {
      const res = await fetch(`/api/files/${fileId}`,{
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log("Fetching File...")

      if (res.ok) {
        console.log("res.ok for file fetching")
        const data = await res.json();

        setFile(data)
        
        console.log("file contents", data.content)

      } else {
        throw new Error("Error fetching file for document")
      }


    } catch (error) {
      console.error("Error fetching document", error)

    }
  }

  useEffect(() => {
    if (fileId && loading) {
      fetchFile();
      setLoading(false)
    }
  }, [fileId, loading])

  const initEditor = () => {
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
      data: {
        blocks: file.content
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
      placeholder: 'Enter your text here!'
    });
  }

  // Ensures the editor loads once and destroys itself when it unmounts
  useEffect(() => {
    if(ejInstance.current === null && file) {
      initEditor();
      setFileName(file.name)
    }

    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    }
  }, [file]);
  
  const insertMathBlock = () => {
    ejInstance.current.blocks.insert('math', {});
    setIsMathMode(true);  // Activate math mode
  };

  const exitMathMode = () => {
    setIsMathMode(false);  // Deactivate math mode
  };

  const saveEditor = async () => {
    try {
    const outputData = await ejInstance.current.save();
    console.log('Article data: ', outputData);
    const res = await fetch (`/api/files/${fileId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: file?.name,
        content: outputData.blocks,
      })
    });

    if (res.ok) {
      const data = await res.json()
      setFile(data)
      console.log("updated content", data)
    } else {
      throw new Error("Error updating content")
    }
    } catch (error) {
      console.log('Saving failed: ', error)
    }
  };

  const updateFileName = async () => {
    try {
      const res = await fetch(`/api/files/${fileId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fileName,
          content: file.content 
        })
      });
      if (res.ok) {
        const data = await res.json()
        setFile(data)
        console.log("updated content", data)
      } else {
        throw new Error("Error updating name")
      }

    } catch (error) {
      console.error("error saving Name", error)

    }

  }

  const handleChange = (event) => {
    setFileName(event.target.value)
  }

  useEffect(() => {
    if (file) {
      updateFileName()
    }
  }, [fileName])





  useEffect(() => {
    if (file) {
      setLoading(false)
    }
  }, [file])


  if (loading) {
    return (
    <div>
      <div id="editor-toolbar" className="">
        <div id="tool" className="basis-1/10">
          <button
            onClick={file ? saveEditor: null}
          >
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
        </div>
        <div id="tool" className="basis-1/10">
          {!isMathMode && (
            <button
              onClick={insertMathBlock}
            >
              <FontAwesomeIcon icon={faSquareRootVariable} />
            </button>
          )}
          {isMathMode && (
            <button
              onClick={exitMathMode}
            >
              <FontAwesomeIcon icon={faX} />
            </button>
          )}
        </div>
        <div id="tool" className="basis-1/10">
          <p>T2</p>
        </div>
      </div>

      <div id="filename" className="">
          <form><input className="filename-text" onChange={(e) => {setFileName(e)}} type="text" name="filename" value="Loading Document" ></input></form>
      </div>

      <div id="editorjs" className="rounded-lg"></div>

      {isMathMode && <SymbolPicker/>}
    </div>

    )
  }



  

  // Displays the editor
    return (
    <div>
      <div id="editor-toolbar" className="">
        <div id="tool" className="basis-1/10">
          <button
            onClick={saveEditor}
          >
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
        </div>
        <div id="tool" className="basis-1/10">
          {!isMathMode && (
            <button
              onClick={insertMathBlock}
            >
              <FontAwesomeIcon icon={faSquareRootVariable} />
            </button>
          )}
          {isMathMode && (
            <button
              onClick={exitMathMode}
            >
              <FontAwesomeIcon icon={faX} />
            </button>
          )}
        </div>
        <div id="tool" className="basis-1/10">
          <p>T2</p>
        </div>
      </div>

      <div id="filename" className="">
          <form><input className="filename-text"  onChange={handleChange} type="text" name="filename" value={fileName} ></input></form>
      </div>

      <div id="editorjs" className="rounded-lg"></div>

      {isMathMode && <SymbolPicker/>}
    </div>
  )
}

export default textEditor;