import { Link } from "react-router";

export const RestaurantCard = ({ restaurant }) => {
  // Determine status text and color
  const statusText = restaurant.openNow ? "Open" : "Closed";
  const statusColor = restaurant.openNow
    ? "text-green-600 bg-green-100"
    : "text-red-600 bg-red-100";

  // Format phone number and URL links
  const phoneNumber =
    restaurant.phone && restaurant.phone !== "Not available" ? (
      <a
        href={`tel:${restaurant.phone}`}
        className="text-blue-500 hover:text-blue-700"
      >
        {restaurant.phone}
      </a>
    ) : (
      <span className="text-gray-400">Not available</span>
    );

  const websiteUrl =
    restaurant.url && restaurant.url !== "Not available" ? (
      <a
        href={restaurant.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700 truncate"
      >
        {restaurant.url.replace(/(^\w+:|^)\/\//, "")}
      </a>
    ) : (
      <span className="text-gray-400">Not available</span>
    );

  const price =
    restaurant.startingPrice && restaurant.startingPrice !== "Not available"
      ? `₹${restaurant.startingPrice} onwards`
      : "Price N/A";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col h-full">
      {/* Header: Name, Rating, and Status */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800 leading-tight pr-2">
          {restaurant.name}
        </h3>
        <div
          className={`py-1.5 px-3 rounded-full text-xs font-semibold uppercase ${statusColor}`}
        >
          {statusText}
        </div>
      </div>
  
      <div className="space-y-3 flex-grow pt-2">
        {/* Rating and Reviews */}
        <div className="flex items-center">
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="font-bold text-gray-800 text-base">{restaurant.rating}</span>
          </div>
          <span className="text-gray-500 text-sm ml-2">
            ({restaurant.userRatingsTotal?.toLocaleString() || 0} reviews)
          </span>
        </div>
  
        {/* Price and Address */}
        <div className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-gray-700">
            <span className="font-medium text-green-700">Cost: </span>
            {price}
          </p>
        </div>
          
        <div className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm text-gray-600">{restaurant.address}</p>
        </div>
  
        {/* Contact and Website */}
        <div className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <div className="text-sm text-gray-700">
            <span className="font-medium text-gray-700">Call: </span>
            {phoneNumber}
          </div>
        </div>
          
        <div className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <div className="text-sm text-gray-700">
            <span className="font-medium text-gray-700">Web: </span>
            {websiteUrl}
          </div>
        </div>
      </div>
  
      {/* Footer: Map Link */}
      <div className="mt-5 flex gap-3 pt-4 border-t border-gray-100">
        <a
          href={restaurant.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center inline-block px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-indigo-600 transition duration-200 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          View on Map
        </a>
  
        <Link to="/research" state={restaurant} className="flex-1 text-center inline-block px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium rounded-lg hover:from-emerald-600 hover:to-teal-600 transition duration-200 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Analysis
        </Link>
      </div>
    </div>
  );
};