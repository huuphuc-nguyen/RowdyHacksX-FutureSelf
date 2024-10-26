import React from 'react'

const ItemCard = ({content, date}) => {
  return (
      <li className="flex items-center justify-between bg-darkCharcoal rounded-lg p-3 border-l-4 border-electricBlue">
                <span className='text-metallicSilver'>{content}</span>
                <span className="text-electricBlue">Delivery Date: {date}</span>
      </li>
  )
}

export default ItemCard
