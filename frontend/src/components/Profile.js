import React, { useEffect, useState } from "react";
import Header from './Header';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaEdit, FaFilePdf } from "react-icons/fa";
import { handleError, handleResponse } from "../utils"; 


const API_BASE_URL = process.env.BACKEND;
 

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('id');
        
        // Fetch user profile
        const userResponse = await fetch(`${API_BASE_URL}/auth/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ userId })
        });
        
        handleResponse(userResponse);
        const userData = await userResponse.json();
        setUser(userData.data);

        // Fetch user's notes
        const notesResponse = await fetch(`${API_BASE_URL}/action/card`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ userId })
        });

        handleResponse(notesResponse);
        const notesData = await notesResponse.json();
        setNotes(notesData.data || []);

      } catch (err) {
        setError(err.message);
        handleError(`Failed to load data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-red-600 text-center p-4 bg-red-50 rounded-lg">
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
        {/* User Profile Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="relative mb-6 sm:mb-0 sm:mr-8">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-full w-32 h-32 flex items-center justify-center">
                  <FaUser className="text-blue-500 text-5xl" />
                </div>
                <button className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition shadow-md">
                  <FaEdit size={14} />
                </button>
              </div>
              
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-gray-800">{user?.name}</h1>
                <p className="text-gray-600 mt-2">{user?.email}</p>
                
                {user?.createdAt && (
                  <p className="text-gray-500 mt-1">
                    Member since {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* User's Notes Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Uploaded Notes</h2>
          
          {notes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <FaFilePdf className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{note.code}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-700 mb-4">
                      <p><span className="font-medium">Semester:</span> {note.semester}</p>
                      <p><span className="font-medium">Branch:</span> {note.branch}</p>
                      <p><span className="font-medium">Teacher:</span> {note.teacherName}</p>
                      <p className="text-gray-500 text-xs">
                        Uploaded on {new Date(note.uploadedOn).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <a
                      href={note.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      <FaFilePdf className="mr-2" />
                      View PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="text-gray-400 mb-4 text-5xl">📭</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No Notes Uploaded Yet</h3>
              <p className="text-gray-500">You haven't uploaded any study materials yet.</p>
              <a
                href="/addNotes"
                className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Upload Your First Notes
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;