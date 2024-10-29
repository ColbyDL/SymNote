import Link from "next/link";
import Image from "next/image";
import RandomSymbols from '../effects/randomSymbols';

const heroWelcome = () => {
  return (
    <>
    <div className="hero-menu flex h-full w-full flex-col min-[1170px]:flex-row">
      <div className="flex flex-col justify-center gap-4 p-4 m-auto">
        <h1 className="self-center text-9xl font-mono max-[515px]:text-7xl animate-fade-down animate-once animate-ease-out">SymNote</h1>
        <Link href="/getStarted" className="btn-primary self-center animate-fade-up animate-once animate-ease-out"><h1>Get Started</h1></Link>
      </div>
      <div className="relative max-[1170px]:left-[1.25rem] min-[1170px]:my-auto min-[1170px]:mr-auto max-[515px]:mx-auto font-mono  text-4xl min-[515px]:text-5xl max-[1170px]:place-items-center">
        <h2 className="relative max-[1170px]:right-[1.25rem] animate-fade-right animate-once animate-delay-1000">Notes</h2>
        <h2 className="relative min-[1170px]:left-[6.75rem] animate-fade-left animate-once animate-delay-[1700ms]">Made Simple.</h2>
      </div>
    </div>
    <div id="gradient-div"></div>
    <div className="symbol-backdrop flex flex-row place-items-end justify-around">
        <RandomSymbols />
    </div>
    </>
  )
}

export default heroWelcome;