import React from 'react'
import Heading from './Heading'

function Projects() {
  return (
    <div className="w-full h-fit">
      <Heading heading="Projects"/>
    <div className="bg-[#1b1b1b] h-full   border-2 border-neutral-800 mt-5 rounded-xl p-6  text-white relative">
      {/* Card Title */}
      <div>
        <h2 className="text-xl font-semibold">AI Music product</h2>
        <p className="text-gray-400 mt-1">UX Case study</p>
      </div>
      {/* Arrow Icon */}
      <div className="absolute top-6 right-6">
        <div className="flex items-center justify-center bg-red-600 p-2 rounded-full">

          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.7088 1.51516L14.3823 12.8096M13.7088 1.51516L2.41434 2.18869M13.7088 1.51516L1.31773 15.4778" stroke="#FDFDFD" stroke-width="2.40017" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
      {/* Image Display */}
      <div className="mt-8 flex justify-center">
        <div className="h-44 w-full">
          <img
            src="https://www.imgacademy.com/sites/default/files/ncsa-homepage-row-2022.jpg"
            alt="AI Music product"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
    <div className="bg-[#1b1b1b]  h-full border-2 border-neutral-800 mt-5 rounded-xl p-6  text-white relative">
      {/* Card Title */}
      <div>
        <h2 className="text-xl font-semibold">AI Music product</h2>
        <p className="text-gray-400 mt-1">UX Case study</p>
      </div>
      {/* Arrow Icon */}
      <div className="absolute top-6 right-6">
        <div className="flex items-center justify-center bg-red-600 p-2 rounded-full">
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.7088 1.51516L14.3823 12.8096M13.7088 1.51516L2.41434 2.18869M13.7088 1.51516L1.31773 15.4778" stroke="#FDFDFD" stroke-width="2.40017" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
      {/* Image Display */}
      <div className="mt-8 flex justify-center">
        <div className="h-44 w-full">
          <img
            src="https://www.imgacademy.com/sites/default/files/ncsa-homepage-row-2022.jpg"
            alt="AI Music product"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  </div>
  )
}

export default Projects