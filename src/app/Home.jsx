import Aboutsection from "@/components/Aboutsection";
import CTAHome from "@/components/CTAHome";
import Exclusiveprojects from "@/components/Exclusiveprojects";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import FourthSection from "@/components/FourthSection";
import Herosection from "@/components/Herosection";
import Navigation from "@/components/Navigation";
import ProjectAccordion from "@/components/ProjectAccordion";
import StatisticsSection from "@/components/StatisticsSection";

export default function Home() {
  return (
    <main>
      <Navigation/>
      <Herosection />
      <Aboutsection/>
      <Exclusiveprojects/>
      <FourthSection/>
      <StatisticsSection/>
      <CTAHome/>
      <ProjectAccordion/>
      <FaqSection/>
      <Footer/>
    </main>
  );
}  