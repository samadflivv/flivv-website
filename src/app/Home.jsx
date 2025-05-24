import Aboutsection from "@/components/Aboutsection";
import CTAHome from "@/components/CTAHome";
import Exclusiveprojects from "@/components/Exclusiveprojects";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import FourthSection from "@/components/FourthSection";
import Herosection from "@/components/Herosection";
import ProjectAccordion from "@/components/ProjectAccordion";
import StatisticsSection from "@/components/StatisticsSection";

export default function Home() {
  return (
    <main>
      <Herosection />
      <Aboutsection/>
      <Exclusiveprojects/>
      <FourthSection/>
      <StatisticsSection/>
      <CTAHome/>
      <FaqSection/>
      <Footer/>
    </main>
  );
}  