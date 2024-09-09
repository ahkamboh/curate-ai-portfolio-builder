import React from 'react'

function Contact() {
  return (
    <div className=" flex mt-5  justify-between h-[400px] relative  overflow-hidden bg-[#1b1b1b] border-2 p-5 border-neutral-800   rounded-xl">
    <div className="w-full flex  flex-col z-10 gap-8 justify-center items-center text-center ">
      <h1 className='text-white text-4xl font-semibold'>Have idea about project?</h1>
      <p className='text-[#c0c0c0] text-lg font-normal'>Write anything here something about yourself to showcase <br /> what actually you doing or targeting etc.</p>
      <button className='hover:bg-[#e63e21c6] shadow-[0px_1px_37px_0px_#e63e21af] bg-[#e63e21] border-2 border-[#171717] rounded-md flex justify-center items-center w-fit'>
        <span className='px-2 font-semibold'>Contact me</span>
        <div className="h-10 w-0.5 bg-[#171717]"></div>
        <div className="px-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 7.99854H8V12.9985C8 13.2638 7.89464 13.5181 7.70711 13.7056C7.51957 13.8932 7.26522 13.9985 7 13.9985C6.73478 13.9985 6.48043 13.8932 6.29289 13.7056C6.10536 13.5181 6 13.2638 6 12.9985V7.99854H1C0.734784 7.99854 0.48043 7.89318 0.292893 7.70564C0.105357 7.51811 0 7.26375 0 6.99854C0 6.73332 0.105357 6.47896 0.292893 6.29143C0.48043 6.10389 0.734784 5.99854 1 5.99854H6V0.998535C6 0.733319 6.10536 0.478964 6.29289 0.291428C6.48043 0.103892 6.73478 -0.00146484 7 -0.00146484C7.26522 -0.00146484 7.51957 0.103892 7.70711 0.291428C7.89464 0.478964 8 0.733319 8 0.998535V5.99854H13C13.2652 5.99854 13.5196 6.10389 13.7071 6.29143C13.8946 6.47896 14 6.73332 14 6.99854C14 7.26375 13.8946 7.51811 13.7071 7.70564C13.5196 7.89318 13.2652 7.99854 13 7.99854Z" fill="white" />
          </svg>
        </div>
      </button>
    </div>
    <div className="w-full h-full absolute  sm:opacity-55  opacity-25  flex justify-end pr-9 items-center">
      <svg viewBox="0 0 393 393" className='h-[400px]' fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="354.5" y1="392.021" x2="354.5" y2="9.15527e-05" stroke="#404040" />
        <line x1="274.5" y1="392.021" x2="274.5" y2="9.15527e-05" stroke="#404040" />
        <line x1="195.5" y1="392.021" x2="195.5" y2="9.15527e-05" stroke="#404040" />
        <line y1="290.5" x2="392.02" y2="290.5" stroke="#404040" />
        <line y1="203.5" x2="392.02" y2="203.5" stroke="#404040" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M195.5 219C195.469 210.45 188.541 203.529 180 203.529C188.56 203.529 195.5 196.576 195.5 188C195.531 196.55 202.459 203.471 211 203.471C202.439 203.471 195.5 210.424 195.5 219Z" fill="white" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M275.5 306C275.469 297.45 268.541 290.529 260 290.529C268.56 290.529 275.5 283.576 275.5 275C275.531 283.55 282.459 290.471 291 290.471C282.439 290.471 275.5 297.424 275.5 306Z" fill="white" />
      </svg>
    </div>
    <div className="w-full h-full absolute inset-0 sm:opacity-55  opacity-25  flex justify-end pr-9 items-center">
      <svg viewBox="0 0 393 393" className='h-[400px]' fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="354.5" y1="392.021" x2="354.5" y2="9.15527e-05" stroke="#404040" />
        <line x1="274.5" y1="392.021" x2="274.5" y2="9.15527e-05" stroke="#404040" />
        <line x1="195.5" y1="392.021" x2="195.5" y2="9.15527e-05" stroke="#404040" />
        <line y1="290.5" x2="392.02" y2="290.5" stroke="#404040" />
        <line y1="203.5" x2="392.02" y2="203.5" stroke="#404040" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M195.5 219C195.469 210.45 188.541 203.529 180 203.529C188.56 203.529 195.5 196.576 195.5 188C195.531 196.55 202.459 203.471 211 203.471C202.439 203.471 195.5 210.424 195.5 219Z" fill="white" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M275.5 306C275.469 297.45 268.541 290.529 260 290.529C268.56 290.529 275.5 283.576 275.5 275C275.531 283.55 282.459 290.471 291 290.471C282.439 290.471 275.5 297.424 275.5 306Z" fill="white" />
      </svg>
    </div>
  </div>
  )
}

export default Contact