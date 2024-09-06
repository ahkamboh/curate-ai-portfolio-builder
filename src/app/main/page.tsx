import Header from "@/components/Header";
import CallToAction from "@/sections/CallToAction";
import FeaturesSection from "@/sections/Features";

export default function Main() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <CallToAction />
      <FeaturesSection />
    </div>
  );
}
