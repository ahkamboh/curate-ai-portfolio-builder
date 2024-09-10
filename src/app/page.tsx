import Header from "@/components/Header";
import CallToAction from "@/sections/CallToAction";
import FeaturesSection from "@/sections/Features";
import StepsSection from "@/sections/Steps";
import DesignSection from "@/sections/Design";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Pricing from "@/components/Pricing";
import FaqAccordion from "@/components/FaqAccordion";

export default function Main() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <CallToAction />
      <FeaturesSection />
      <StepsSection />
       <Pricing/>
      <DesignSection />
      <Banner />
  < FaqAccordion/>
      <Footer />
    </div>
  );
}
