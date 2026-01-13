import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Analysis = () => {
  const navigate = useNavigate();
  const location = useLocation();
    const port = import.meta.env.VITE_PORT_MARKDOWN;

  const { analysisData } = location.state || {
    analysisData: "No data available",
  };

  const handleProceedMarkdown = () => {
    const encodedData = encodeURIComponent(analysisData);
    // Open a new tab with the markdown data as a query parameter
    window.open(`${port}/?data=${encodedData}`, "_blank");
  };
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <button
        onClick={() => navigate(-1)}
        className=" cursor-pointer mb-4 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600"
      >
        ← Back
      </button>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Analysis Result
        </h2>
        <pre className="bg-gray-100 p-4 rounded-lg text-gray-800 whitespace-pre-wrap">
          {analysisData || "No analysis data available."}
        </pre>
        <button
          onClick={handleProceedMarkdown}
          className="cursor-pointer inline-block px-4 py-2 mt-2 bg-indigo-500 text-white text-sm font-medium rounded-lg hover:bg-indigo-600 transition duration-150"
        >
          Proceed for Markdown
        </button>
      </div>
    </div>
  );
};
export default Analysis;
