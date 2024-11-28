import React from 'react'

export default function NotFound() {
  return (
    <div>
      <h1 className='text-9xl text-center mt-11 font-extrabold '>404</h1>
      <h3 className='text-center text-gray-500 mt-4' >File not found</h3>
      <h3 className='text-center text-gray-500 mt-4' >The site configured at this address does not contain the requested file.</h3>
      <h3 className='text-center text-gray-500 mt-4' >If this is your site, make sure that the filename case matches the URL as well as any file permissions.</h3>
      <h3 className='text-center text-gray-500 mt-4' >For root URLs (like http://example.com/) you must provide an index.html file.</h3>
      
    </div>
  )
}
