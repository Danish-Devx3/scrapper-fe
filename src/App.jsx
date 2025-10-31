import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Analysis from "./Analysis";

function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  // const apiKey = import.meta.env.VITE_PERPLEXITY_API_KEY;
  const port = import.meta.env.VITE_PORT;


  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const type = form.type.value;
    const location = form.location.value;
    const limit = form.limit.value;

    try {
      const response = await fetch(`${port}/scrape`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search: type,
          location,
          limit: parseInt(limit),
        }),
      });

      const places = await response.json();
      setData(places.data || []);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  return (
    <div className="grid grid-cols-2">
      {/* LEFT: Form */}
      <div className="flex flex-col items-center justify-center p-10 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen border-r border-gray-200">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6 border border-gray-100"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Data Scraper
            </h2>
            <p className="text-gray-500 text-sm">
              Configure your scraping parameters
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Type
              </label>
              <input
                type="text"
                name="type"
                placeholder="Enter type..."
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter location..."
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Limit
              </label>
              <input
                type="number"
                name="limit"
                defaultValue={10}
                min="1"
                max="100"
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-gray-700"
              />
            </div>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            Start Scraping
          </button>
        </form>
      </div>

      {/* RIGHT: Results */}
      <div className="overflow-y-scroll h-screen grid grid-cols-1 space-y-4 p-4 bg-gray-50">
        {data.length > 0 ? (
          data.map((place, index) => (
            <RestaurantCard
              key={index}
              restaurant={place}
              navigate={navigate}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <h2 className="text-2xl font-semibold text-gray-600 text-center">
              No data available. Please submit the form to start scraping.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

const RestaurantCard = ({ restaurant, navigate }) => {
  const {
    name,
    rating,
    address,
    type,
    source,
    link,
    startingPrice,
    phone,
    url,
    openNow,
  } = restaurant;

  const statusText = openNow ? "Open" : "Closed";
  const statusColor = openNow
    ? "text-green-600 bg-green-100"
    : "text-red-600 bg-red-100";

  const handleAnalysis = () => {
    const markdown = `
### ${name}
**Rating:** ${rating ?? "N/A"}  
**Cost:** ₹${startingPrice ?? "N/A"}  
**Address:** ${address ?? "Not available"}  
**Phone:** ${phone ?? "N/A"}  
**Website:** ${url ?? "N/A"}
    `;
    navigate("/analysis", { state: { analysisData: markdown } });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold text-gray-800 leading-tight pr-4">
          {name}
        </h3>
        <div
          className={`py-1 px-3 rounded-full text-xs font-semibold uppercase ${statusColor}`}
        >
          {statusText}
        </div>
      </div>

      <div className="space-y-3 flex-grow">
        <div className="flex items-center text-sm">
          <span className="text-yellow-500 text-lg mr-2">⭐</span>
          <span className="font-bold text-gray-700">{rating ?? "N/A"}</span>
        </div>
        <p className="text-md text-gray-700">
          <span className="font-semibold text-indigo-700 mr-2">Type:</span>
          {type ?? "N/A"}
        </p>
        <p className="text-sm text-gray-600 italic">
          {address ?? "Not available"}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-700 mr-2">Source:</span>
          {source ?? "N/A"}
        </p>
      </div>

      <div className="mt-4 flex gap-3 pt-4 border-t border-gray-100">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition duration-150"
        >
          View Source
        </a>

        <button
          onClick={handleAnalysis}
          className="cursor-pointer inline-block px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-lg hover:bg-indigo-600 transition duration-150"
        >
          Analysis
        </button>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/analysis" element={<Analysis />} />
    </Routes>
  </Router>
);

export default App;
