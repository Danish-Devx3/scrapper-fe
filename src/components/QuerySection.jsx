import React, { useState, useRef, useEffect } from "react";
// import copyIcon from "../assets/copyIcon.svg";

const QuerySection = ({ data }) => {
  const [query, setQuery] = useState(JSON.stringify(data || {}, null, 2));
  const textareaRef = useRef(null);

  useEffect(() => {
    setQuery(JSON.stringify(data || {}, null, 2));
  }, [data]);

  const handleCopy = () => {
    navigator.clipboard.writeText(query);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [query]);

  if (!data || data.name.trim() == "") {
    return (
      <div className="w-screen bg-white flex flex-col items-center">
        <div className="w-[95%] mt-6 bg-[#F4F4F4] rounded-2xl shadow-sm border border-[#8EF477] px-8 py-6 relative">
          No Data Found in inputs
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-6xl mt-6 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Query Preview
          </h2>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy JSON
          </button>
        </div>

        <textarea
          ref={textareaRef}
          value={query}
          readOnly
          className="w-full font-mono text-sm text-gray-800 bg-gray-50 border border-gray-300 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 overflow-auto"
        />
      </div>
    </div>
  );
};

export default QuerySection;
