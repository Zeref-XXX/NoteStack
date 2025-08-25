import { useState, useEffect } from "react";
import Header from "./Header";
import { Link } from "react-router";
import { ClipLoader } from "react-spinners";


const API_BASE_URL = process.env.BACKEND;

const API_URL = `${API_BASE_URL}/action/find`;
 

export default function StudyMaterialHome() {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [filters, setFilters] = useState({
    semester: "",
    branch: "",
    code: ""
  });

  // Extract unique values for filters
  const uniqueSemesters = [...new Set(notes.map(note => note.semester))].sort();
  const uniqueBranches = [...new Set(notes.map(note => note.branch))].sort();
  const uniqueCodes = [...new Set(notes.map(note => note.code))].sort();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch notes");
        const data = await response.json();
        setNotes(data);
      } catch (err) {
        alert(err)
        console.log("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      semester: "",
      branch: "",
      code: ""
    });
  };

  const filteredNotes = notes.filter(note => {
    return (
      (filters.semester === "" || note.semester === filters.semester) &&
      (filters.branch === "" || note.branch === filters.branch) &&
      (filters.code === "" || note.code === filters.code)
    );
  });

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2">
            📚 Study Material
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Access and organize your study resources
          </p>
          <Link
            to="/addNotes"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-3 rounded-full transition duration-300 shadow-md hover:shadow-lg"
          >
            + Add New Notes
          </Link>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto mb-10">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Notes</h2>
            <div className="flex flex-wrap gap-4 items-center">
              <select
                name="semester"
                value={filters.semester}
                onChange={handleFilterChange}
                className="flex-1 min-w-[200px] border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Semesters</option>
                {uniqueSemesters.map((sem, idx) => (
                  <option key={idx} value={sem}>{sem}</option>
                ))}
              </select>

              <select
                name="branch"
                value={filters.branch}
                onChange={handleFilterChange}
                className="flex-1 min-w-[200px] border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Branches</option>
                {uniqueBranches.map((branch, idx) => (
                  <option key={idx} value={branch}>{branch}</option>
                ))}
              </select>

              <select
                name="code"
                value={filters.code}
                onChange={handleFilterChange}
                className="flex-1 min-w-[200px] border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Subjects</option>
                {uniqueCodes.map((code, idx) => (
                  <option key={idx} value={code}>{code}</option>
                ))}
              </select>

              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition duration-300"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Notes Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <ClipLoader color="#3b82f6" size={50} />
            <span className="ml-4 text-gray-600">Loading notes...</span>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            {filteredNotes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map((note, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col border border-gray-100 hover:border-blue-200"
                  >
                    <div className="flex-grow">
                      <h2 className="text-xl font-bold text-blue-800 mb-2 line-clamp-2">
                        {note.title}
                      </h2>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {note.content}
                      </p>

                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex items-start">
                          <span className="text-gray-500 w-24 flex-shrink-0">Subject Code:</span>
                          <span>{note.code}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-gray-500 w-24 flex-shrink-0">Semester:</span>
                          <span>{note.semester}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-gray-500 w-24 flex-shrink-0">Branch:</span>
                          <span>{note.branch}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-gray-500 w-24 flex-shrink-0">Teacher:</span>
                          <span>{note.teacherName}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-gray-500 w-24 flex-shrink-0">Uploaded By:</span>
                          <span>{note.uploadedBy || "Unknown"}</span>
                        </div>
                      </div>
                    </div>

                    {note.url && (
                      <div className="mt-6">
                        <a
                          href={note.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block text-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg font-medium transition shadow-sm hover:shadow-md"
                        >
                          📥 View PDF
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="text-gray-400 mb-4 text-6xl">📭</div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No notes found</h3>
                <p className="text-gray-500">
                  {Object.values(filters).some(f => f) 
                    ? "Try adjusting your filters" 
                    : "No notes available yet"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}