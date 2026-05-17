import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "./AnimatedSection";
import styles from "../../pages/HomePage.module.css";

const textIn = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut", delay },
  }),
};

const cardIn = {
  hidden: { opacity: 0, y: 36 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.12 * index },
  }),
};

function ServicesSection() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const systemsY = useTransform(scrollYProgress, [0, 1], [42, -42]);

  return (
    <AnimatedSection className={styles.servicesSection} ref={sectionRef}>
      <motion.div className={styles.quickBar}>
        <motion.div
          className={styles.quickBarTrack}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 16, ease: "linear", repeat: Infinity }}
        >
          <span>Quick Seal Support</span>
          <span>•</span>
          <span>Quick Seal Support</span>
          <span>•</span>
          <span>Quick Seal Support</span>
          <span>•</span>
          <span>Quick Seal Support</span>
          <span>•</span>
          <span>Quick Seal Support</span>
          <span>•</span>
          <span>Quick Seal Support</span>
          <span>•</span>
          <span>Quick Seal Support</span>
          <span>•</span>
          <span>Quick Seal Support</span>
          <span>•</span>
          <span>Quick Seal Support</span>
          <span>•</span>
          <span>Quick Seal Support</span>
          <span>•</span>
          <span>Quick Seal Support</span>
          <span>•</span>
          <span>Quick Seal Support</span>
          <span>•</span>
          <span>Quick Seal Support</span>
          <span>•</span>
          <span>Quick Seal Support</span>
        </motion.div>
      </motion.div>
      <motion.img
        src="/images/systems.jpg.avif"
        alt="Industrial systems"
        className={styles.systemsImage}
        initial={{ opacity: 0, scale: 0.9, y: 46 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, amount: 0.35 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: systemsY }}
      />
      <div className={styles.servicesContent}>
        <motion.h2
          variants={textIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          custom={0}
        >
          Services
        </motion.h2>
        <motion.p
          className={styles.smallTitle}
          variants={textIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          custom={0.08}
        >
        </motion.p>
        <div className={styles.serviceCards}>
          <motion.article
            className={styles.serviceCard}
            variants={cardIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            custom={0}
          >
            <h3>Seal Support</h3>
            <p>R 850</p>
            <button type="button" onClick={() => navigate("/BookTechnicianPage")}>
              Book Now
            </button>
          </motion.article>
          <motion.article
            className={styles.serviceCard}
            variants={cardIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            custom={1}
          >
            <h3>Seal Quote</h3>
            <p>R 850</p>
            <button type="button" onClick={() => navigate("/request-quote")}>
              Book Now
            </button>
          </motion.article>
          <motion.article
            className={styles.serviceCard}
            variants={cardIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            custom={2}
          >
            <h3>Seal Technician</h3>
            <p>R 850</p>
            <button type="button" onClick={() => navigate("/book-technician")}>
              Book Now
            </button>
          </motion.article>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default ServicesSection;
