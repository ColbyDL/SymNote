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

import { useUser } from "@auth0/nextjs-auth0/client";


const textEditor = () => {
  // Stores reference to an Editor.js instance
  const ejInstance = useRef(null);
  const [isMathMode, setIsMathMode] = useState(false);

  const [isSymbolPickerOpen, setIsSymbolPickerOpen] = useState(false);


  const [currentMathBlockIndex, setCurrentMathBlockIndex] = useState(null);
  const { fileId } = useParams();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(true);
  const [fileName, setFileName] = useState("");

  const { user} = useUser();

  

  console.log("textEditor", fileId);

  const fetchFile = async () => {
    console.log("fileId", fileId);
    if (!fileId) return;

    try {
      const res = await fetch(`/api/files/${fileId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Fetching File...");

      if (res.ok) {
        console.log("res.ok for file fetching");
        const data = await res.json();

        setFile(data);

        console.log("file contents", data.content);
      } else {
        throw new Error("Error fetching file for document");
      }
    } catch (error) {
      console.error("Error fetching document", error);
    }
  };

  useEffect(() => {
    if ( user && fileId && loading) {
      fetchFile();
      setLoading(false);
    } else if ( !user ) {
      setLoading(false);
    }
  }, [fileId, loading, user]);


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
        blocks: file?.content || [],
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

    if (ejInstance.current === null && file) {

      initEditor();
      setFileName(file.name);
    }

    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };


  }, [file]);
 

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

  const saveEditor = async () => {
    try {
      const outputData = await ejInstance.current.save();
      console.log("Article data: ", outputData);
      const res = await fetch(`/api/files/${fileId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: file?.name,
          content: outputData.blocks,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setFile(data);
        console.log("updated content", data);
      } else {
        throw new Error("Error updating content");
      }
    } catch (error) {
      console.log("Saving failed: ", error);
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
          content: file.content,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setFile(data);
        console.log("updated content", data);
      } else {
        throw new Error("Error updating name");
      }
    } catch (error) {
      console.error("error saving Name", error);
    }
  };

  

  

  useEffect(() => {
    if (file) {
      setLoading(false);
    }
  }, [file]);

  const exportToPDF = async () => {
    try {
      const outputData = await ejInstance.current.save();
      const doc = new jsPDF();
      let yPosition = 30;
  
      for (const block of outputData.blocks) {
        if (block.type === "header") {
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");
          doc.text(block.data.text, 10, yPosition);
          yPosition += 10;
        } else if (block.type === "paragraph") {
          doc.setFontSize(12);
          yPosition = renderStyledText(doc, block.data.text, yPosition);
        } else if (block.type === "math") {
          // Await renderMathBlock to ensure asynchronous rendering
          yPosition = await renderMathBlock(doc, block.data.text, yPosition);
        }
        yPosition += 10;
      }
  
      doc.save(`${fileName || "document"}.pdf`);
    } catch (error) {
      console.error("Error exporting to PDF", error);
    }

  };

  const renderStyledText = (doc, text, yPosition) => {
    // Split text by bold tags, identifying <b> tags
    const segments = text.split(/(<b>|<\/b>)/);
    let xPosition = 10;
  
    segments.forEach((segment) => {
      if (segment === "<b>") {
        doc.setFont("helvetica", "bold"); // Set font to bold
      } else if (segment === "</b>") {
        doc.setFont("helvetica", "normal"); // Reset font to normal
      } else {
        doc.text(segment, xPosition, yPosition);
        xPosition += doc.getTextWidth(segment); // Adjust x-position for the next segment
      }
    });
  
    return yPosition + 10; // Return the updated y-position for the next line
  };

  const cleanLatex = (latex) => {
    // Regex to match unsupported color functions like 'oklch()'
    const colorRegex = /\\textcolor\{oklch\([^\}]+\)\}/g;
  
    // Replace all occurrences with a supported color
    return latex.replace(colorRegex, (match) => {
      // Replace with a generic color (e.g., 'red')
      return match.replace("oklch", "red");
    });
  };

  const renderMathBlock = async (doc, latex, yPosition) => {
    const cleanLatexString = cleanLatex(latex);
    // Create a temporary div for rendering LaTeX
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = "-9999px"; // Hide element offscreen
    div.style.color = "#000000"; // Set color to black to avoid unsupported colors
    div.style.backgroundColor = "#FFFFFF"; // Use a plain background
  
    document.body.appendChild(div);
  
    try {
      const latexString = String(latex || ""); // Ensure latex is a string
  
      // Render the LaTeX to SVG
      katex.render(latexString, div, {
        throwOnError: false,
        displayMode: true,
      });
  
      // Convert SVG to canvas using html2canvas with a white background
      const canvas = await html2canvas(div, { backgroundColor: "#FFFFFF" });
      const imgData = canvas.toDataURL("image/png");
  
      // Calculate dimensions for the PDF
      const imgWidth = 180;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      // Add image to the PDF
      doc.addImage(imgData, "PNG", 10, yPosition, imgWidth, imgHeight);
      yPosition += imgHeight;
    } catch (error) {
      console.error("Error rendering math block:", error);
    } finally {
      document.body.removeChild(div); // Clean up temporary div
    }
  
    return yPosition;
  };

  
  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  const handleFileNameSave = async () => {
    if (fileName !== file?.name) {
      try {
        const res = await fetch(`/api/files/${fileId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: fileName, content: file.content }),
        });
        if (res.ok) {
          const data = await res.json();
          setFile(data);
          console.log("Filename updated:", data);
        } else {
          throw new Error("Error updating name");
        }
      } catch (error) {
        console.error("Error saving filename:", error);
      }
    }
  };

  const handleFileNameKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleFileNameSave();
    }
  };

  const handleFileNameBlur = () => {
    handleFileNameSave();
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

    <div>
      <div id="editor-toolbar" className="">
        <div id="tool" className="basis-1/10">
          <button onClick={saveEditor}>
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
          <button onClick={exportToPDF} >
            <FontAwesomeIcon icon={faFileExport} />
          </button>
        </div>
      </div>

      <div id="filename" className="">
          <input
            className="filename-text"
            onChange={handleFileNameChange}
            onKeyDown={handleFileNameKeyDown}
            onBlur={handleFileNameBlur}
            type="text"
            name="filename"
            value={fileName}
          ></input>
      </div>

      <div id="editorjs" className="rounded-lg"></div>


      {/* Render Symbol Picker if it's open */}
      {isSymbolPickerOpen && <SymbolPicker />}
  </div>

  );
};

export default textEditor;