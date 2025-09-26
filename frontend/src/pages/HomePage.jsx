import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

function HomePage() {
  return (
    <MainLayout>
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to the POS System</h1>
        <p className="text-lg text-gray-600">For more enquiries, contact: <span className="font-medium text-black">9500409520</span></p>
        <Link to="/pos ">
          <button className="px-6 py-2 mt-12 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition">
            Start POS
          </button>
        </Link>
      </div>
    </MainLayout>
  );
}

export default HomePage;
