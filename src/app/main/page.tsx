import Header from "@/components/Header";
import CallToAction from "@/sections/CallToAction";
import FeaturesSection from "@/sections/Features";
import StepsSection from "@/sections/Steps";

export default function Main() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <CallToAction />
      <FeaturesSection />
      <StepsSection/>
    </div>
  );
}
