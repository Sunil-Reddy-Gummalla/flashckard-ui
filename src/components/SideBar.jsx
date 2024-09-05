import React from 'react';

export function Sidebar() {
    return (
        <div
            className={`fixed top-16 left-0 h-[calc(100%-64px)] bg-gray-800 text-white transition-transform duration-300`}
            style={{ width: '250px' }}
        >
            <div className="p-4">
                <h2 className="text-lg mb-4">Flash Sites</h2>
                <ul>
                    <li><a href="#" className="block py-2 px-4 hover:bg-gray-700">Item 1</a></li>
                    <li><a href="#" className="block py-2 px-4 hover:bg-gray-700">Item 2</a></li>
                    <li><a href="#" className="block py-2 px-4 hover:bg-gray-700">Item 3</a></li>
                </ul>
            </div>
        </div>
    );
}
