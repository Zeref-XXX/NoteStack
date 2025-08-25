import { Link } from "react-router";

const Body = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center px-4">
      <h1 className="text-blue-800 text-6xl font-extrabold mb-4">
        Notes that Connect
      </h1>
      <h1 className="text-yellow-400  text-6xl font-extrabold mb-4">
        Knowledge that
        <span className="text-blue-800"> Empowers!</span>
      </h1>
      <p className="text-blue-400 text-lg mb-10 max-w-xl uppercase">
        The easiest way to upload, find, and share notes across myNotebook!
        Unlock Knowledge, Empower Your Peers!
      </p>

      {/* Buttons */}
      <div className="flex space-x-4">
        <Link to="/addNotes">
          <button className="bg-gradient-to-r from-blue-700 to-purple-700 hover:bg-yellow-500 text-white font-semibold px-6 py-3 rounded-md">
            Upload Notes
          </button>
        </Link>
        <Link to="/studyMaterial">
          <button className="border-2 border-white font-semibold px-6 py-3 rounded-md bg-white text-blue-600 transition">
            Browse Notes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Body;
