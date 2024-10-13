import Link from "next/link";
import img from "./img/mbg.jpg"; // Assuming the image is in the same folder

export default function Header() {
  return (
    <div className="flex h-[90vh] ">
      <div className="w-1/2 h-full fixed relative">
        <img
          src={img.src}
          alt="Person in the forest"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center p-10">
        <h1 className="text-5xl font-bold mb-6">Welcome Headline AI</h1>
        <p className="text-gray-600 mb-8">
          World First Ai based platform for news that talks about the news like humans do.
        </p>

        <div className="flex space-x-4">
          <Link href="./SignUp">
            <button className="bg-zinc-900 text-white px-6 py-3 rounded-md">Sign Up</button>
          </Link>

          <Link href="./Login">
            <button className="border border-black px-6 py-3 rounded-md">Log In</button>
          </Link>
        </div>
      </div>
    </div>
  ); 
}
