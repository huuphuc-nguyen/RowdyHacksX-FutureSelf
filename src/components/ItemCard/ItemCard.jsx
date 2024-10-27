import React from 'react'

const ItemCard = ({content, delivery_date, section}) => {
  return (
      <li className="flex items-center justify-between bg-darkCharcoal/80 rounded-lg p-3 border-l-4 border-electricBlue">
                <span className='text-metallicSilver'>{content}</span>
              <span className="text-electricBlue">{section=='letters' ? 'Delivery' : 'Target'} Date: {delivery_date}</span>
      </li>
  )
}

export default ItemCard
