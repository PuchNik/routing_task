import React from 'react'

export const Btn = ({ children, onClick, className }) => {
  return (
    <button className={className} onClick={onClick} type="submit">
      {children}
    </button>
  )
}
