'use client'
import DocSection from "../components/docs-section";
import RandomSymbols from "../effects/randomSymbols";

const docsPage = () => {
  return (
    <>
    <div className="text-center pb-11">
      <h1 className="text-6xl font-bold">Docs</h1>
    </div>
    <DocSection />
    <div className="symbol-backdrop flex flex-row place-items-end justify-around">
      <RandomSymbols />
    </div>
    </>
  )
}

export default docsPage;