import Image from "next/image"
import TempPreview from '../public/images/TempPreview.jpg'

const previewCard = () => {
  return (
    <div className="card glass w-96 flex-col">
        <figure>
            <Image
            src={TempPreview}
            alt="TempPreview" />
        </figure>
        <div className="card-body">
            <h2 className="card-title justify-center">Utilizing Latex</h2>
            <p>Write Complex Expressions with Ease!</p>
            <div className="card-actions justify-end">
            <button className="btn btn-primary" href="/">Sign Up!</button>
            </div>
        </div>
    </div>
  )
}

export default previewCard