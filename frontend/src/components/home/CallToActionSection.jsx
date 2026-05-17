import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "./AnimatedSection";
import styles from "../../pages/HomePage.module.css";

function CallToActionSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [42, -42]);
  const overlayY = useTransform(scrollYProgress, [0, 1], [22, -22]);

  return (
    <AnimatedSection className={styles.ctaSection} ref={sectionRef}>
      <motion.div className={styles.ctaOverlay} style={{ y: overlayY, zIndex: 3 }}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        >
          Team Resources
        </motion.h2>
        <motion.p
          className={styles.smallTitle}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
        >
          Our Partners
        </motion.p>
        <div className={styles.ctaLinks}>
          <motion.button
            type="button"
            onClick={() => window.open("https://virtuedev.wixsite.com/sealing-services-por", "_blank")}
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
          >
            Price List &amp; Stock Notes →
          </motion.button>
          <motion.button
            type="button"
            onClick={() => window.open("https://virtuedev.wixsite.com/sealing-services-por", "_blank")}
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            Sales Kit (Brochures &amp; Spec Sheets) →
          </motion.button>
          <motion.button
            type="button"
            onClick={() => window.open("https://virtuedev.wixsite.com/sealing-services-por", "_blank")}
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.38 }}
          >
            Announcements → (price updates, outages, cut-offs)
          </motion.button>
        </div>
      </motion.div>
      <motion.img
        src="/images/mantablet.jpg"
        alt="Industrial engineer with tablet"
        className={styles.ctaImage}
        initial={{ opacity: 0, scale: 0.9, y: 46 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: imageY, zIndex: 1 }}
      />
    </AnimatedSection>
  );
}

export default CallToActionSection;
