import Link from "next/link";
import styles from "../docs/docs-section.css";

const DocSection = () => {
  return (
    <>
      <section>
        <details>
          <summary>
            <h2>Description</h2>
          </summary>
          <p className="pb-5">This is a description.</p>
        </details>
      </section>

      <section>
        <details>
          <summary>
            <h2>Quick Start</h2>
          </summary>
          <p className="pb-5">
            Here is a basic start on how to use this application.
          </p>
        </details>
      </section>

      <section>
        <details>
          <summary>
            <h2>Adding Symbols</h2>
          </summary>
          <p className="pb-5">Here is how to add symbols.</p>
        </details>
      </section>

      <section>
        <details>
          <summary>
            <h2>Mathmetical Expressions</h2>
          </summary>
          <p className="pb-5">
            Here is how to implement mathmetical expressions.
          </p>
        </details>
      </section>

      <section>
        <details>
          <summary>
            <h2>Export</h2>
          </summary>
          <p className="pb-5">Here is how to export your notes.</p>
        </details>
      </section>
    </>
  );
};

export default DocSection;
