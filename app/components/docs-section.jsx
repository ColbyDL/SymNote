import Link from "next/link";
import styles from "../docs/docs-section.css";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { faPlus, faMinus, faSquareRootVariable } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';

const DocSection = () => {
  return (
    <>
      <div className="w-full pt-32 px-4">
      <div className="doc-bar mx-auto w-full max-w-lg divide-y rounded-xl">
        <Disclosure as="div" className="p-6" defaultOpen={false}>
          <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="doc-header text-sm/6 font-medium">
              What is Symnote?
            </span>
            <FontAwesomeIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" icon={faChevronDown}/>
          </DisclosureButton>
          <DisclosurePanel transition className="mt-2 text-sm/5 doc-body transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0">
            SymNote is a web application designed to help with your Math Editing needs. Make a quick account to save all of your files for easy access. Our Editor utilizes Latex so your files fit the standard for Scientific related Papers/Notes
          </DisclosurePanel>
        </Disclosure>
        <Disclosure as="div" className="p-6" defaultOpen={false}>
          <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="doc-header text-sm/6 font-medium">
              Getting Started
            </span>
            <FontAwesomeIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" icon={faChevronDown}/>
          </DisclosureButton>
          <DisclosurePanel transition className="mt-2 text-sm/5 doc-body transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0">
            Clicking the Getting Started button will take you to a empty text editor. <br/><br/>
            This text editor provides you with almost every function within the application. <br/><br/>
            Only features such as file saving and file navigation are exempt, as you need to be signed into an account. <br/><br/>
            The toolbar located at the top consists of the following tools:
            <ul>
              <li id="doc-item">
                <div id="tool-example" className="basis-1/10">
                  <button>
                    <FontAwesomeIcon icon={faSquareRootVariable} />
                  </button>
                </div>
                Insert Math Block: Adds a line to the text editor that allows you to add complex symbols such as integrals.
              </li>
              <li id="doc-item">
                <div id="tool-example" className="basis-1/10">
                  <button>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                Symbol Picker: Opens/Closes the Symbol Picker menu to select, copy, and paste various symbols.
              </li>
              <li id="doc-item">
                <div id="tool-example" className="basis-1/10">
                  <button>
                    <FontAwesomeIcon icon={faFileExport} />
                  </button>
                </div>
                Export: Will export the file in PDF form upon clicking.
              </li>
            </ul>
            The Getting Started page is designed for those who wish to quickly type and export their notes without having to make an account. For longer projects, signing in to save files is required.
          </DisclosurePanel>
        </Disclosure>
        <Disclosure as="div" className="p-6">
          <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="doc-header text-sm/6 font-medium">
              Making an Account
            </span>
            <FontAwesomeIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" icon={faChevronDown}/>
          </DisclosureButton>
          <DisclosurePanel transition className="mt-2 text-sm/5 doc-body transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0">
            1. Click on the Log In/Sign Up button on the navigation bar.<br /><br />
            2. Create an account using a email and password, or use your Google/GitHub account.<br /><br />
            3. Upon creating your account you will see your name in the navigation bar.<br /><br />
          </DisclosurePanel>
        </Disclosure>
        <Disclosure as="div" className="p-6">
          <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="doc-header text-sm/6 font-medium">
              Accessing Your Files
            </span>
            <FontAwesomeIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" icon={faChevronDown}/>
          </DisclosureButton>
          <DisclosurePanel transition className="mt-2 text-sm/5 doc-body transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0">
            1. Upon creating an account, click your name in the navigation bar and click Files.<br /><br />
            2. You will see a view of your root folder, displaying all files and folders you have created thus far.<br /><br />
            3. Here you are able to:
            <ul>
              <li id="doc-item">
                <div id="tool-example" className="basis-1/10">
                  <button>
                    <FontAwesomeIcon icon={faFileCirclePlus} />
                  </button>
                </div>
                Create a new file.
              </li>
              <li id="doc-item">
                <div id="tool-example" className="basis-1/10">
                  <button>
                    <FontAwesomeIcon icon={faFolderPlus} />
                  </button>
                </div>
                Create a new folder.
              </li>
              <li id="doc-item">
                <div id="tool-example" className="basis-1/10">
                  <button>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
                Move a file between folders.
              </li>
              <li id="doc-item">
                <div id="tool-example" className="basis-1/10">
                  <button>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
                Delete your files and folders.
              </li>
              <li id="doc-item">
                <div id="tool-example" className="basis-1/10">
                  <button>
                    <FontAwesomeIcon icon={faFile} />
                  </button>
                </div>
                /
                <div id="tool-example" className="basis-1/10">
                  <button>
                    <FontAwesomeIcon icon={faFolder} />
                  </button>
                </div>
                Click on a file/folder to access it.
              </li>
            </ul>
          </DisclosurePanel>
        </Disclosure>
        <Disclosure as="div" className="p-6" defaultOpen={false}>
          <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="doc-header text-sm/6 font-medium">
              Saved Files/Folders
            </span>
            <FontAwesomeIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" icon={faChevronDown}/>
          </DisclosureButton>
          <DisclosurePanel transition className="mt-2 text-sm/5 doc-body transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0">
            Saved files and folders within your account our stored within our MongoDB database where you will be able to access and use it at any time.<br/><br/>
            Additionally, using the text editor provides two new features that aren't available otherwise:
            <ul>
              <li id="doc-item">
                <div id="tool-example" className="basis-1/10">
                  <button>
                    <FontAwesomeIcon icon={faFloppyDisk} />
                  </button>
                </div>
                Saving your file at any time.<br/>
                Additionally, your file will autosave occassionally.
              </li>
              <li id="doc-item">
                <div id="nav-tab" className="basis-1/10">
                  <button>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
                A tab that displays your current folder to allow you to easily switch between files within that folder.<br/>
                Clicking the arrow will open/close the tab.
              </li>
            </ul>
          </DisclosurePanel>
        </Disclosure>
        <Disclosure as="div" className="p-6" defaultOpen={false}>
          <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="doc-header text-sm/6 font-medium">
              Exporting Files
            </span>
            <FontAwesomeIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" icon={faChevronDown}/>
          </DisclosureButton>
          <DisclosurePanel transition className="mt-2 text-sm/5 doc-body transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0">
            <div id="doc-item">
              <FontAwesomeIcon id="tool-example" className="basis-1/10" icon={faFileExport} />
              Upon clicking the export button, a PDF file containing all text within your notes will be saved to your PC.<br/><br/>
              You will then be able to do as you please with this file.
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
    </>
  );
};

export default DocSection;

/*
      <section>
        <details>
          <summary className="doc-bar">
            <h2>Description</h2>
          </summary>
          <p className="pb-5">SymNote is a web application designed to help with your Math Editing needs. Make a quick account to save all of your files for easy access. Our Editor utilizes Latex so your files fit the standard for Scientific related Papers/Notes</p>
        </details>
      </section>

      <section>
        <details>
          <summary className="doc-bar">
            <h2>Quick Start</h2>
          </summary>
          <p className="pb-5">
            1. Create an account <br />
            2. Click on the "New File" or "New Folder" button <br />
            3. Start typing your notes <br />
            4. Add Symbols or Equations utilizing Latex using the buttons in the upper Left Hand Corner. <br />
            5. Text Can be converted to different types within the editor such as a Header <br />
            6. Highlight text to add Bold, Italics or Hyperlinks <br />
            7. Click on the "Save" button in the upper left hand corner to save your notes <br />
            8. Click on the "Export" button in the upper left hand corner to export your notes <br />
          </p>
        </details>
      </section>

      <section>
        <details>
          <summary className="doc-bar">
            <h2>Mathmetical Expressions & Symbols</h2>
          </summary>
          <p className="pb-5">
            Our Editor utilizes Latex Syntax to help guide you through Editing your math Notes. Our Editor will do all the formatting. <br />
              Use the buttons to in the upper left hand corner to see a cheat sheet for different symbols that Can be added to the Notes. <br />
              The Editor will automatically change the text Block to a fit Equations or Symbols
          </p>
        </details>
      </section>

      <section>
        <details>
          <summary className="doc-bar">
            <h2>Export</h2>
          </summary>
          <p className="pb-5">After Completing your notes, click the right-most button in the upper left hand corner to automatically download in PDF what is within the Editor. <br />
          The new PDF will download and display within a new Tab.</p>
        </details>
      </section>
      */