import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const SignUpPage = () => {
  return (
    <main className="flex items-center justify-center min-h-screen relative sign-bg">
 {/* <Link href={'/'} className="absolute top-0 gap-2 left-0 p-6 flex justify-center items-center group">
        <div className="d">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.5" d="M39.9903 0.270225L30.2035 36.8334C30.1538 36.9993 29.9547 37.0491 29.8386 36.9329L23.2864 30.3771L28.1964 12.0541C28.2462 11.8881 28.0969 11.7387 27.931 11.7885L9.61815 16.7012L3.09917 10.1786C2.98306 10.0624 3.03282 9.86327 3.1987 9.81348L39.7249 0.00467392C39.8907 -0.02852 40.04 0.120853 39.9903 0.270225Z" fill="#fa0053" />
            <path opacity="0.5" d="M23.2861 30.3768L20.7648 39.8371C20.715 40.0031 20.516 40.0529 20.3998 39.9367L0.0632817 19.6054C-0.0528324 19.4892 -0.00306943 19.2901 0.162808 19.2403L9.61781 16.7009L23.2861 30.3768Z" fill="#fa0053" />
            <path d="M28.1957 12.0538L23.2857 30.3768L9.61743 16.7009L27.9303 11.7882C28.0962 11.7384 28.2454 11.8878 28.1957 12.0538Z" fill="#fa0053" />
          </svg>
        </div>
        <div className="font-bold text-2xl mt-1 ClashDisplay-Bold group-hover:tracking-wider transition-all duration-300 tracking-wide ">Curate</div>
      </Link> */}
      <SignUp />
    </main>
  );
};

export default SignUpPage;
