import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ItemCard from '../ItemCard/ItemCard';

const ItemSection = ({section, itemlist}) => {

    const [title, setTitle] = useState(section == 'letters' ? 'Upcoming Letters' : 'Upcoming Goals');

  return (
    <>
        <div className="mb-8">
        <h3 className="text-2xl font-bold text-cyberYellow mb-4">{title}</h3>
        <ul className="space-y-4">
            {itemlist.map((item) => (
                <ItemCard key={item.id} content={item.content} date={item.date} />
            ))}  
        </ul>
        {section == 'letters' ? (
            <Link to="/all-letters" className="text-neonPink hover:underline mt-4 inline-block">
                View All Letters
            </Link>
        ) : (
            <Link to="/all-goals" className="text-neonPink hover:underline mt-4 inline-block">
                View All Goals
            </Link>
        )}
        
        </div>
    </>
  )
}

export default ItemSection
