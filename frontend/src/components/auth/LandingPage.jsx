import React from "react";
import { Link } from "react-router";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to Our App!</h1>
      <p className="text-xl mb-8 text-center max-w-lg">
        Manage your communications efficiently and never miss an important
        update again. Our application helps you stay on top of your schedule
        with ease.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/signup"
          className="bg-white text-blue-500 font-semibold py-2 px-4 rounded hover:bg-gray-200"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="bg-transparent border border-white font-semibold py-2 px-4 rounded hover:bg-white hover:text-blue-500"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
