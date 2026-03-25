import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { fetchHomeContent } from "./api/content";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AchievementsPage from "./pages/AchievementsPage";
import AlumniPage from "./pages/AlumniPage";
import ContactPage from "./pages/ContactPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import HomePage from "./pages/HomePage";
import SponsorshipPage from "./pages/SponsorshipPage";

export default function App() {
  const [homeContent, setHomeContent] = useState(null);

  useEffect(() => {
    const loadFooterContent = async () => {
      try {
        const data = await fetchHomeContent();
        setHomeContent(data);
      } catch (_error) {
        setHomeContent(null);
      }
    };

    loadFooterContent();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto my-6 w-[92vw] max-w-6xl">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/sponsorship" element={<SponsorshipPage />} />
          <Route path="/alumni" element={<AlumniPage />} />
          <Route path="/contact" element={<ContactPage homeContent={homeContent} />} />
        </Routes>
      </main>
      <Footer homeContent={homeContent} />
    </div>
  );
}
