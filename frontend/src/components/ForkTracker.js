import React, { useState, useEffect } from 'react';
import { FaGithub, FaStar, FaCodeBranch, FaEye, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const ForkTracker = () => {
  const [forkData, setForkData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchForkData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/action/forks`);
        const data = await response.json();
        
        if (data.success) {
          setForkData(data.data);
          if (data.message) {
            setMessage(data.message);
          }
        } else {
          setError(data.message || 'Failed to fetch fork data');
        }
      } catch (err) {
        setError('Unable to connect to the server');
        console.error('Fork data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchForkData();
  }, [API_BASE_URL]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">Loading fork information...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <FaExclamationTriangle className="text-yellow-500 mr-2" />
          <span className="text-yellow-700">Unable to load fork information: {error}</span>
        </div>
        <div className="mt-2 text-sm text-yellow-600">
          <a 
            href="https://github.com/Zeref-XXX/NoteStack" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-yellow-800"
          >
            Visit the repository on GitHub to see current fork information
          </a>
        </div>
      </div>
    );
  }

  if (!forkData) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
        <FaGithub className="mr-3" />
        GitHub Community Stats
      </h2>
      
      {message && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            <FaInfoCircle className="text-blue-500 mr-2" />
            <span className="text-blue-700 text-sm">{message}</span>
          </div>
        </div>
      )}

      {/* Repository Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <FaCodeBranch className="text-blue-600 text-2xl mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-700">{forkData.totalForks}</div>
          <div className="text-sm text-gray-600">Forks</div>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <FaStar className="text-yellow-600 text-2xl mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-700">{forkData.stargazersCount}</div>
          <div className="text-sm text-gray-600">Stars</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <FaEye className="text-green-600 text-2xl mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-700">{forkData.watchersCount}</div>
          <div className="text-sm text-gray-600">Watchers</div>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <FaExclamationTriangle className="text-red-600 text-2xl mx-auto mb-2" />
          <div className="text-2xl font-bold text-red-700">{forkData.openIssuesCount}</div>
          <div className="text-sm text-gray-600">Open Issues</div>
        </div>
      </div>

      {/* Fork Details */}
      {forkData.forksDetails && forkData.forksDetails.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Forks ({Math.min(forkData.forksDetails.length, 6)} of {forkData.totalForks})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {forkData.forksDetails.slice(0, 6).map((fork, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  <img 
                    src={fork.ownerAvatarUrl} 
                    alt={fork.owner} 
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <a 
                    href={fork.forkUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {fork.owner}
                  </a>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-500 text-xs mr-1" />
                    <span>{fork.stargazersCount} stars</span>
                    <FaCodeBranch className="text-blue-500 text-xs ml-3 mr-1" />
                    <span>{fork.forksCount} forks</span>
                  </div>
                  {fork.language && fork.language !== 'Not specified' && (
                    <div className="text-xs text-gray-500">Language: {fork.language}</div>
                  )}
                  <div className="text-xs text-gray-500">
                    Created: {new Date(fork.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Community section */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-700 mb-2">Join Our Community!</h3>
        <p className="text-gray-700 text-sm mb-3">
          Help us improve NoteStack by contributing to our open-source project. Whether it's bug fixes, 
          new features, or documentation improvements, every contribution matters!
        </p>
        <div className="flex flex-wrap gap-3">
          <a 
            href="https://github.com/Zeref-XXX/NoteStack" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
          >
            <FaGithub className="mr-2" />
            View on GitHub
          </a>
          <a 
            href="https://github.com/Zeref-XXX/NoteStack/fork" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <FaCodeBranch className="mr-2" />
            Fork Project
          </a>
          <a 
            href="https://github.com/Zeref-XXX/NoteStack/issues" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            <FaExclamationTriangle className="mr-2" />
            Report Issues
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForkTracker;