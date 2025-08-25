import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import { FaUserCircle, FaTimes, FaBars } from "react-icons/fa";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const handleLogout = () => {
    handleSuccess("You have been successfully logged out.");
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/");
    setShowMenu(false);
    setMobileMenuOpen(false);
  };

  const toggleMenu = () => {
    setShowMenu(prev => !prev);
  };

  const closeAllMenus = () => {
    setShowMenu(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 to-blue-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className="text-white text-2xl md:text-3xl font-bold hover:text-yellow-300 transition-colors"
              onClick={closeAllMenus}
            >
              Note<span className="text-yellow-300">Stack</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              onClick={closeAllMenus}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              onClick={closeAllMenus}
            >
              About
            </Link>
            <Link 
              to="/studyMaterial" 
              className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              onClick={closeAllMenus}
            >
              Browse Notes
            </Link>

            {/* Profile Dropdown */}
            <div className="relative ml-4">
              <button
                onClick={toggleMenu}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-haspopup="true"
                aria-expanded={showMenu}
              >
                <span className="sr-only">Open user menu</span>
                <FaUserCircle className="h-8 w-8 text-white hover:text-yellow-300 transition-colors" />
                {loggedInUser && (
                  <span className="ml-2 text-white font-medium hidden lg:inline">
                    {loggedInUser}
                  </span>
                )}
              </button>

              {showMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {!loggedInUser ? (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeAllMenus}
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeAllMenus}
                      >
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeAllMenus}
                      >
                        Your Profile
                      </Link>
                      <Link
                        to="/addNotes"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeAllMenus}
                      >
                        Upload Notes
                      </Link>
                      <div className="border-t border-gray-200 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-300 focus:outline-none"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
              onClick={closeAllMenus}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
              onClick={closeAllMenus}
            >
              About
            </Link>
            <Link
              to="/studyMaterial"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
              onClick={closeAllMenus}
            >
              Browse Notes
            </Link>
            {loggedInUser && (
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
                onClick={closeAllMenus}
              >
                Your Profile
              </Link>
            )}
            {loggedInUser && (
              <Link
                to="/addNotes"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
                onClick={closeAllMenus}
              >
                Upload Notes
              </Link>
            )}
            {loggedInUser ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
                  onClick={closeAllMenus}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
                  onClick={closeAllMenus}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <ToastContainer 
        position="top-center" 
        autoClose={2000}
        toastClassName="rounded-lg"
        progressClassName="bg-yellow-400"
      />
    </header>
  );
};

export default Header;