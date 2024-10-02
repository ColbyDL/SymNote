const folders = () => {
  return (
    <div>
      <div className="card bg-neutral text-neutral-content card-compact min-w-60">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Folder</h2>
          <p className="">This is some text</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Open</button>
            <button className="btn btn-ghost">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default folders;
