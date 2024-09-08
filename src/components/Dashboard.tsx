import React from 'react'

function Dashboard() {
  return (
    <>
      <div className="bg-[#2c2c2c] w-full space-y-5 text-center py-6">
        <div className="ClashDisplay-Medium text-2xl">What section of your portfolio do you want to enhance today?</div>
        <form className="max-w-2xl mx-auto">
          <label htmlFor="portfolio-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="portfolio-search" className="w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Portfolio Sections, Templates..." required />
          </div>
        </form>
        <div className="ClashDisplay-Light text-sm">Tip: Be specific! The AI will assist better with more detail.</div>
      </div>

      <div className="py-8 bg-[#1e1e1e] relative overflow-hidden hide-scroll">
        <div className="ClashDisplay-Medium text-2xl pl-9">Choose Portfolio Section</div>
        <div className="flex gap-4 overflow-x-auto w-full p-3 px-9 relative">
          <div className="bg-gradient-to-r from-[#139EBC] to-[#AA1ECD] p-[2px] min-w-[370px] rounded-xl">
            <div className="h-[180px] w-full bg-neutral-700 rounded-[10px] p-3 space-y-1">
              <img src="/portfolio.svg" alt="" />
              <div className="ClashDisplay-Semibold text-lg tracking-wider">Introduction</div>
              <div className='ClashDisplay-Reguler text-base'>Craft a compelling introduction to hook potential clients and employers.</div>
            </div>
          </div>

          <div className="h-[184px] min-w-[374px] bg-neutral-700 rounded-[10px] border-2 border-[#575757] p-3 space-y-1">
            <img src="/portfolio.svg" alt="" />
            <div className="ClashDisplay-Semibold text-lg tracking-wider">Experience</div>
            <div className='ClashDisplay-Reguler text-base'>Highlight your relevant work experience with AI-powered recommendations for better impact.</div>
          </div>

          <div className="h-[184px] min-w-[374px] bg-neutral-700 rounded-[10px] border-2 border-[#575757] p-3 space-y-1">
            <img src="/portfolio.svg" alt="" />
            <div className="ClashDisplay-Semibold text-lg tracking-wider">Skills</div>
            <div className='ClashDisplay-Reguler text-base'>List your top skills, and let AI suggest additional ones that match your industry.</div>
          </div>

          <div className="h-[184px] min-w-[374px] bg-neutral-700 rounded-[10px] border-2 border-[#575757] p-3 space-y-1">
            <img src="/portfolio.svg" alt="" />
            <div className="ClashDisplay-Semibold text-lg tracking-wider">Projects</div>
            <div className='ClashDisplay-Reguler text-base'>Showcase your completed projects with suggested descriptions that highlight your achievements.</div>
          </div>

          <div className="h-[184px] min-w-[374px] bg-neutral-700 rounded-[10px] border-2 border-[#575757] p-3 space-y-1">
            <img src="/portfolio.svg" alt="" />
            <div className="ClashDisplay-Semibold text-lg tracking-wider">Testimonials</div>
            <div className='ClashDisplay-Reguler text-base'>Gather and display testimonials from previous clients to build trust and credibility.</div>
          </div>
        </div>

        <div className=''>
          <div className='ClashDisplay-Medium text-2xl pl-9 pt-9'>Projects</div>
          <div className="w-full text-center ClashDisplay-Reguler text-base mt-10">You don’t have any projects yet</div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
