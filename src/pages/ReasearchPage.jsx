import React, { useEffect, useState } from "react";
import QuerySection from "../components/QuerySection";
import ResultSection from "../components/ResultSection";
import { useLocation } from "react-router";

/**
 * POST /research
 * Body: {
 *   "name": "Peter Luger Steak House",
 *   "location": "255 Northern Boulevard, Great Neck",
 *   "rating": 4.5,
 *   "userRatingsTotal": 3725,
 *   "placeId": "ChIJKXFLL-uJwokREGE5L-3oRxc"
 * }
 */
const ResearchPage = () => {
  const { state: place } = useLocation();

  console.log(place);
  const backendOrigin = import.meta.env.VITE_BACKEND_ORIGIN;
  const [showResultSection, setShowResultSection] = useState(false);
  const [resultData, setResultData] = useState([]);

  useEffect(() => {
    const data = { results: [place] };
    fetch(`${backendOrigin}/research`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (!response.ok) {
          console.error(`Something went wrong at the server ${response}`);
        }
        const responseJSON = await response.json();
        console.log("i am here.");
        console.log(responseJSON);
        setResultData(responseJSON.response);
        // Now we make to make the section block.
        setShowResultSection(true);
      })
      .catch((error) => {
        console.error(`ERROR: Failed to do research ${error}`);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Business Intelligence Report</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Detailed analysis and insights for {place?.name || 'selected business'}
          </p>
        </div>
        
        {showResultSection && <ResultSection data={resultData} />}
        
        {!showResultSection && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-6"></div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Analyzing data...</h2>
            <p className="text-gray-500 max-w-md">
              Processing information about {place?.name || 'the business'}. This may take a moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchPage;
