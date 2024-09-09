import React from 'react';
import Navbar from '../../temp1Live/Navbar';
import About from '../../temp1Live/About';
import Experience from '../../temp1Live/Experience';
import Education from '../../temp1Live/Education';
import Projects from '../../temp1Live/Projects';
import Heading from '../../temp1Live/Heading';
import ExpandingImages from '../../temp1Live/ExpandingImages';

import Footer from '../../temp1Live/Footer';
import Contact from '../../temp1Live/Contact';

function Page() {
  return (
    <div className=" bg-[#171717] px-4">
      <div className="container mx-auto">
        <Navbar />
        <About />
        <div className="md:flex grid mt-5 w-full gap-5">
          <div className="w-full space-y-5">
            <Experience />
            <Education />
          </div>
          <Projects />
        </div>
        <Heading heading="Hachathons" />
        <ExpandingImages />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default Page;
