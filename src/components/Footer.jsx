import React from "react";

const Footer = () => {
  return (
    <footer className="group  bottom-0 w-full">
      <div className="bg-blue-500 flex justify-between items-center  text-white p-3 sm:text-lg font-mono  sm:px-20">
        <a
          href="https://www.ccbp.in"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          NxtWave
        </a>
        <div className="w-0 h-8 border border-white"></div>
        <a
          href="https://in.linkedin.com/in/pranay-parikh-530331218"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          Pranay Parikh
        </a>
      </div>
      <div className="hidden group-hover:block absolute left-0 right-0 bg-gray-100 text-black p-4 mt-2 shadow-lg">
        <p className="mb-2">
          This project is a demonstration of React and Tailwind CSS integration.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://www.loom.com/share/your-video"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Loom
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
