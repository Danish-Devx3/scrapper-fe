import React, { useEffect, useState } from "react";

const ResultSection = ({ data }) => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    setResult(data);
  }, [data]);

  return (
    <>
      {result && result.length > 0 ? (
        <div className="w-full mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Business Analysis Report
            </h2>
            <p className="text-blue-100">
              Detailed insights and findings
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-[60px]">#</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Business</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Summary</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Key Highlights</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Market Popularity</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {result.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs">
                      <div className="line-clamp-3">{item.summary}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <ul className="space-y-1">
                        {item.highlights.slice(0, 3).map((highlight, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                        {item.highlights.length > 3 && (
                          <li className="text-xs text-gray-500">+{item.highlights.length - 3} more</li>
                        )}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-semibold text-gray-900">{item.popularity}</span>
                        <span className="ml-2 text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                          Score
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 text-sm text-gray-500 border-t border-gray-200">
            Showing {result.length} result{result.length !== 1 ? 's' : ''} • Updated just now
          </div>
        </div>
      ) : (
        <div className="w-full mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No Analysis Available</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            The analysis report will appear here once processing is complete.
          </p>
        </div>
      )}
    </>
  );
};

export default ResultSection;
