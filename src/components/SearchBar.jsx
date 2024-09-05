import React from 'react';
import { FavWebsitesDropdown } from './FavWebsitesDropdown';
import { Tooltip } from 'react-tooltip';

export function SearchBar({
    searchText,
    setSearchText,
    handleSearch,
    sortOrder,
    setSortOrder,
    websites,
    searchWebsite,
    setSearchWebsite,
    clearAllFilters,
}) {
    return (
        <div className="mb-4 flex flex-col items-center">
            <div className="relative w-full max-w-2xl">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full py-2 px-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="absolute right-0 top-0 mt-2 mr-2 text-blue-500 hover:text-blue-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </button>
            </div>
            <div className="mt-4 flex justify-between items-center w-full max-w-2xl space-x-3">
                <div className="w-1/4 relative">
                    <FavWebsitesDropdown
                        websites={websites}
                        onSelectWebsite={setSearchWebsite}
                        selectedWebsite={searchWebsite}
                    />
                </div>
                <div className="w-1/4 relative">
                    {sortOrder && (
                        <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">
                            Sort Order
                        </label>
                    )}
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full py-2 px-4 border border-gray-300 rounded-full shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="newFirst">New First</option>
                        <option value="oldFirst">Old First</option>
                    </select>
                </div>
                <div className="w-1/5 relative">
                    <button
                        onClick={clearAllFilters}
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                        data-tooltip-id="clearAllTooltip"
                        data-tooltip-content="Clear All Filters"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <Tooltip id="clearAllTooltip" />
                </div>
            </div>
        </div>
    );
}
