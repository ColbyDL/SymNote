import PreviewCard from "./previewCard"

const titleHome = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center flex flex-row gap-20">
            <div className="max-w-md">
                <h1 className="text-7xl font-bold">SymNote</h1>
            </div>
            <PreviewCard />
        </div>
    </div>
  )
}

export default titleHome