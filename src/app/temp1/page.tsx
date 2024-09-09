import React from 'react'

function page() {
  return (
    <div>
         <div className="h-full  bg-slate-300 w-full space-y-4">
            <div className=" bg-slate-400 h-60 w-full sm:flex-row flex-col  flex">
                <div className="w-full h-60  bg-slate-900"></div>
                <div className="w-full h-60 bg-red-600"></div>
            </div>
            <div className=" bg-slate-500  h-60 flex sm:flex-row flex-col-reverse w-full ">
            <div className="w-full  h-60 bg-slate-900"></div>
            <div className="w-full h-60 bg-red-600"></div>
            </div>
         </div>
    </div>
  )
}

export default page