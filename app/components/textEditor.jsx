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
  const [loading, setLoading] = useState(true);
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

  const fetchFile = async () => {
    console.log("fileId", fileId);
    if (isFetching) return;
    isFetching = true;
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
    } finally {
      isFetching = false;
    }
  };

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

  useEffect(() => {
    if (!loading && fileId) return; // Prevent additional fetch calls if not loading
    if (user && fileId) {
      fetchFile().finally(() => setLoading(false));
    } else if (!user) {
      setLoading(false);
    }
  }, [fileId, user]);

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

  const replaceLatexWithSymbols = (content) => {
    content = content.replace(/equation:(?=\S)/g, "equation: ");
    // Split content by spaces to identify potential LaTeX expressions
    const tokens = content.split(/(\s+)/);

    // Map each token to its corresponding symbol or keep it as-is
    return tokens
      .map((token) => {
        const match = combinedSymbols.find((s) => s.latex === token);
        return match ? match.symbol : token; // Replace with symbol if found
      })
      .join(""); // Join the tokens back into a single string
  };

  const [fontData, setFontData] = useState(null);
  const loadFont = async () => {
    const response = await fetch("/fonts/notoMathString.json");
    const data = await response.json();
    setFontData(data.fontBase64);
  };
  const exportToPDF = async () => {
    if (!ejInstance.current) return;

    // Load the Base64 font data asynchronously

    loadFont();

    if (!fontData) {
      return <div>Loading font...</div>; // Display a loading state
    }

    const notoMathBase64 = fontData;

    try {
      const content = await ejInstance.current.save();
      const doc = new jsPDF();

      // Add the Base64 encoded font to jsPDF
      doc.addFileToVFS("NotoMath.ttf", notoMathBase64); // Add the TTF font as Base64
      doc.addFont("NotoMath.ttf", "NotoMath", "normal"); // Add the font to jsPDF
      doc.setFont("NotoMath"); // Set the font

      let y = 10;

      content.blocks.forEach((block) => {
        switch (block.type) {
          case "header":
            doc.setFontSize(16);
            doc.text(block.data.text, 10, y);
            y += 10;
            break;
          case "paragraph":
            doc.setFontSize(12);
            doc.text(block.data.text, 10, y);
            y += 10;
            break;
          case "math":
            doc.setFontSize(14);
            // Replace LaTeX symbols in the math block
            const replacedContent = replaceLatexWithSymbols(block.data.text);
            doc.text(`${replacedContent}`, 10, y);
            y += 10;
            break;
          default:
            doc.setFontSize(10);
            doc.text(`[Unsupported block type: ${block.type}]`, 10, y);
            y += 10;
            break;
        }
      });

      const fileName = `${file.name}`;
      doc.save(fileName)
      window.open(
        doc.output("bloburl"),
        "_blank"
      );
    } catch (error) {
      console.error("Error exporting to PDF:", error);
    }
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
          <button onClick={saveEditor} data-tooltip-content="Save" data-tooltip-id="save">
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
          <ReactTooltip id="save" />
        </div>

        <div id="tool" className="basis-1/10">
          <button onClick={exportToPDF} data-tooltip-content="Export" data-tooltip-id="export">
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
