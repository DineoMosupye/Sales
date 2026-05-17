import styles from "./HomePage.module.css";
import Navbar from "../components/home/Navbar";
import HeroSection from "../components/home/HeroSection";
import ServicesSection from "../components/home/ServicesSection";
import CallToActionSection from "../components/home/CallToActionSection";
import FooterSection from "../components/home/FooterSection";

function HomePage() {
  return (
    <div className={styles.homePage}>
      <Navbar />
      <HeroSection />
      <CallToActionSection />
      <ServicesSection />
      <FooterSection />
    </div>
  );
}

export default HomePage;
