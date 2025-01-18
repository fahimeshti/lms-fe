import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import CoursesSection from "@/components/molecules/CoursesSection";
import HomepageHero from "@/components/molecules/HomepageHero";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomepageHero />
      <CoursesSection />
      <Footer />
    </>
  );
}
