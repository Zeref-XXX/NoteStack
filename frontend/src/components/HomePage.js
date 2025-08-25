import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-blue-600 flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-800">
            Campus<span className="text-blue-600">Notes</span> <span className="text-xs text-blue-400 font-semibold">Pro</span>
          </span>
        </div>
        <div className="flex space-x-6 items-center">
          <a href="#home" className="text-gray-600 hover:text-blue-600 font-medium">Home</a>
          <a href="#about" className="text-gray-600 hover:text-blue-600 font-medium">About</a>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
            Sign in
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-grow text-center px-4">
        <h1 className="text-white text-4xl md:text-5xl font-extrabold mb-4">
          Share & Discover <br />
          <span className="text-yellow-400">Academic Notes</span> Easily!
        </h1>
        <p className="text-blue-100 text-lg mb-8 max-w-xl">
          Your go-to platform to upload, download, and share academic notes across multiple colleges and courses!
        </p>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-md">
            Upload Notes
          </button>
          <button className="border-2 border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-blue-600 transition">
            Browse Notes
          </button>
        </div>
      </div>
    </div>
  );
};


