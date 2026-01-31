import { Link } from "react-router-dom";
import images from "../../constant/images";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] text-center">
      <img
        src={images?.notFound2}
        alt="Page Not Found"
        className="md:w-70 w-40 h-auto"
      />
      <h1 className="md:text-3xl text-1xl font-bold mt-4">Oops! Page Not Found</h1>
      <p className="text-gray-500 mt-2">The page you are looking for doesn’t exist.</p>
      <Link
        to="/"
        className="twoD-style-button-three"      >

          <p className="">  Go Home</p>
       
      </Link>
    </div>
  );
}
