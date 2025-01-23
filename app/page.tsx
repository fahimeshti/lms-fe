import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import CoursesSection from "@/components/molecules/CoursesSection";
import HomepageHero from "@/components/molecules/HomepageHero";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <Navbar />
      <HomepageHero />
      <CoursesSection />
      <Footer />
    </Suspense>
  );
}
