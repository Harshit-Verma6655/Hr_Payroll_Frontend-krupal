import React from 'react'
import Navbar from './Navbar'

const RootLayout = ({children}) => {
  return (
    <div className="w-full overflow-hidden bg-white">
     <Navbar/>
    <div>{children}</div>
  </div>
  )
}

export default RootLayout