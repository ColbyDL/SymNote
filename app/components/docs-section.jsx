import Link from "next/link";
import styles from "../docs/docs-section.css";

const DocSection = () => {
  return (
    <>
      <section>
        <details>
          <summary className="doc-bar">
            <h2>Description</h2>
          </summary>
          <p className="pb-5">SymNote is designed to help with your Math Editing needs. Make a quick account to save all of your files for easy access. Our Editor utilizes Latex so your files fit the standard for Scientific related Papers/Notes</p>
        </details>
      </section>

      <section>
        <details>
          <summary className="doc-bar">
            <h2>Quick Start</h2>
          </summary>
          <p className="pb-5">
            1. Create an account <br />
            2. Click on the &quot;New File&quot; or &quot;New Folder&quot; button <br />
            3. Start typing your notes <br />
            4. Add Symbols or Equations utilizing Latex using the buttons in the upper Left Hand Corner. <br />
            5. Text Can be converted to different types within the editor such as a Header <br />
            6. Highlight text to add Bold, Italics or Hyperlinks <br />
            7. Click on the &quot;Save&quot; button in the upper left hand corner to save your notes <br />
            8. Click on the &quot;Export&quot; button in the upper left hand corner to export your notes <br />
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
    </>
  );
};

export default DocSection;
