import React from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navigation */}
      <nav className="bg-blue-600 shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
          <Link to="/" className="text-white text-2xl font-bold hover:text-gray-200 transition">
            POS
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto mt-6 px-6 py-6 bg-white rounded-lg shadow space-y-6">
          {children}
        </div>
        <ToastContainer/>
      </main>
    </div>
  );
}

export default MainLayout;
