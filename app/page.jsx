import Image from "next/image";
import TempPreviewImage from "./public/images/TempPreview.jpg";

const HomePage = () => {
  return (
    <div className="flex h-full w-full p-2 pt-10 bg-base-200">
      <div className="hero bg-base-200 min-h-fit">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image
            src={TempPreviewImage} className="max-w-xs rounded-lg shadow-2xl"
          ></Image>
          <div>
            <h1 className="text-5xl font-bold">SymNote Text Editor</h1>
            <p className="py-6">
              Some text
            </p>
            <button className="btn btn-primary">Sign Up!</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
