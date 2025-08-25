import { useEffect, useState } from "react";
import Header from "./Header";
import PDFUploader from '../Utility/Utils';
import { useNavigate } from "react-router"; 

const BACKEND_URL =  process.env.BACKEND;


const initialFormState = {
  title: "",
  code: "",
  teacherName: "",
  semester: "",
  branch: "",
  content: "",
};

// Define semester options for the dropdown to avoid repetition
const semesterOptions = [
  "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"
];

export default function AddNotes({ notes, setNotes }) {
  // Consolidated state for form data, the selected file, and loading status
  const [formData, setFormData] = useState(initialFormState);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();

  // Effect to check for user authentication on component mount
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      alert("Please log in to add notes.");
      setTimeout(() => navigate("/login"), 1000);
    }
  }, [navigate]);

  // Generic handler for all text and select input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for file input changes
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Handler for form submission
  const handleAddNote = async () => {
    // Validate that all fields and a file are provided
    const { title, content, code, branch, semester, teacherName } = formData;
    if (!title || !content || !code || !branch || !semester || !teacherName || !file) {
      alert("Please fill in all fields and select a PDF file.");
      return;
    }

    const userId = localStorage.getItem("id");
    const loggedUser = localStorage.getItem("loggedInUser");
    
    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }
    
    setIsUploading(true);

    try {
      // 1. Upload the PDF and get its URL
      const fileUrl = await PDFUploader(file);
      if (!fileUrl) {
        throw new Error("PDF upload failed. Please try again.");
      }
      
      // 2. Prepare the new note object with all necessary data
      const newNote = {
        ...formData,
        id: userId,
        uploadedOn: new Date().toISOString(),
        url: fileUrl,
        uploadedBy: loggedUser
      };

      // 3. Send the note data to the backend API
      const response = await fetch(`${BACKEND_URL}/action/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || result.message || "Failed to save the note.");
      }

      // 4. Update parent state, show success, and reset the form
      setNotes([...notes, newNote]);
      alert("Note added successfully!");
      setFormData(initialFormState);
      setFile(null);
      document.getElementById('file-input').value = null; // Reset file input

    } catch (err) {
      console.log("Error adding note:", err);
      alert(err.message || "An unexpected error occurred.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 relative">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
            Add a New Note
          </h1>
          
          {/* Form Overlay for Loading State */}
          {isUploading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center rounded-lg z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="title"
              type="text"
              placeholder="Title"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
              value={formData.title}
              onChange={handleInputChange}
              disabled={isUploading}
            />
            <input
              name="code"
              type="text"
              placeholder="Subject Code"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
              value={formData.code}
              onChange={handleInputChange}
              disabled={isUploading}
            />
            <select
              name="semester"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
              value={formData.semester}
              onChange={handleInputChange}
              disabled={isUploading}
            >
              <option value="">Select Semester</option>
              {semesterOptions.map((sem) => (
                <option key={sem} value={sem}>{sem} Semester</option>
              ))}
            </select>
            <input
              name="branch"
              type="text"
              placeholder="Branch"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
              value={formData.branch}
              onChange={handleInputChange}
              disabled={isUploading}
            />
            <input
              name="teacherName"
              type="text"
              placeholder="Teacher's Name"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 md:col-span-2 disabled:bg-gray-100"
              value={formData.teacherName}
              onChange={handleInputChange}
              disabled={isUploading}
            />
          </div>

          <div className="mt-6">
            <textarea
              name="content"
              placeholder="Brief description or content..."
              rows="4"
              className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none disabled:bg-gray-100"
              value={formData.content}
              onChange={handleInputChange}
              disabled={isUploading}
            />
          </div>

          <div className="mt-4">
            <input
              id="file-input"
              type="file"
              accept="application/pdf"
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleAddNote}
              className="bg-gradient-to-r from-blue-700 to-purple-700 text-white px-8 py-3 rounded-full text-lg hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Add Note"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}