import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "../../pages/HomePage.module.css";
import { useAuthContext } from "../../state/AuthContext";

const riseIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay },
  }),
};

function HeroSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();

  const handleLogin = () => {
    if (isAuthenticated) {
      navigate("/request-quote");
      return;
    }
    navigate("/login");
  };

  return (
    <div className={styles.heroSection}>
      <div className={styles.heroInner}>
        <motion.p
          className={styles.heroBrand}
          variants={riseIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.6 }}
          custom={0}
        >
          EagleBurgmann
        </motion.p>
        <motion.p
          className={styles.heroSubBrand}
          variants={riseIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.6 }}
          custom={0.08}
        >
          a member of EKK and FREUDENBERG
        </motion.p>
        <motion.h1
          variants={riseIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          custom={0.14}
        >
          EB Sales Portal
        </motion.h1>
        <motion.p
          className={styles.heroTag}
          variants={riseIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          custom={0.2}
        >
          Short. Clear. Internal.
        </motion.p>
        <motion.button
          type="button"
          className={styles.loginButton}
          onClick={handleLogin}
          variants={riseIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          custom={0.28}
        >
          Get started
        </motion.button>
      </div>
    </div>
  );
}

export default HeroSection;
