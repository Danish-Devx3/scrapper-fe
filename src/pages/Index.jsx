import React from 'react'
import { useState } from 'react';
import {RestaurantCard} from '../components/RestaurentCard.jsx';
import { useAppContext } from '../context/ContextProvider.jsx';

const Index = () => {
  const {data, setData} = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const type = form.type.value;
    const location = form.location.value;
    const limit = form.limit.value;

    const response = await fetch("http://localhost:8000/scrap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type, location, limit: parseInt(limit) }),
    });

    const places = await response.json();
    setData(places.results);
  };
  console.log(data);
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex flex-col items-center justify-center p-6 md:p-10 w-full md:w-1/2 bg-white">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-lg space-y-6 border border-gray-100"
          >
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Business Data Scraper
              </h2>
              <p className="text-gray-500 text-base">
                Enter your search parameters to find businesses
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Business Type
                </label>
                <input
                  type="text"
                  name="type"
                  placeholder="e.g., restaurants, hotels, cafes"
                  className="px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 text-gray-700 bg-gray-50 focus:bg-white"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g., New York, London"
                  className="px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 text-gray-700 bg-gray-50 focus:bg-white"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Limit Results
                </label>
                <input
                  type="number"
                  name="limit"
                  defaultValue={10}
                  min="1"
                  max="100"
                  className="px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 text-gray-700 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Start Scraping
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Data sourced from Google Places API</p>
          </div>
        </div>

        <div className="overflow-y-auto w-full md:w-1/2 bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Results ({data?.length || 0})</h2>
            {data?.length > 0 && (
              <button 
                onClick={() => setData([])}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Clear Results
              </button>
            )}
          </div>
          
          {data?.length > 0 ? (
            <div className="space-y-4 max-h-[calc(100vh-150px)] overflow-y-auto pr-2">
              {data.map((place) => (
                <RestaurantCard key={place.id} restaurant={place} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-150px)] text-center px-4">
              <div className="mb-6 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                No Results Yet
              </h2>
              <p className="text-gray-500 max-w-md">
                Fill out the form and click "Start Scraping" to find businesses in your area
              </p>
            </div>
          )}
        </div>
      </div>
  )
}

export default Index
