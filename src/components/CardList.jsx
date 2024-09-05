import React from 'react';
import { Card } from './Card'; // Ensure the path is correct for your project

export function CardList({ items, refreshCards }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
                <Card key={item.id} item={item} refreshCards={refreshCards} />
            ))}
        </div>
    );
}
