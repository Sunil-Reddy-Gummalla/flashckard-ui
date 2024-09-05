import React from 'react';

export function FavWebsitesDropdown({ websites, onSelectWebsite, selectedWebsite }) {
    return (
        <div className="relative">
            {selectedWebsite && (
                <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-gray-600">
                    Website
                </label>
            )}
            <select
                value={selectedWebsite}
                onChange={(e) => onSelectWebsite(e.target.value)}
                className="w-full py-2 px-4 border border-gray-300 rounded-full shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Fav Websites</option>
                {websites.map((website, index) => (
                    <option key={index} value={website.url}>
                        {website.display}
                    </option>
                ))}
            </select>
        </div>
    );
}
