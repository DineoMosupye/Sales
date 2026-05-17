import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import styles from "../../pages/HomePage.module.css";

function FooterSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setMessage("Please enter a valid email.");
      return;
    }
    localStorage.setItem("eb-newsletter-email", email);
    setMessage("Subscribed successfully.");
    setEmail("");
  };

  return (
    <AnimatedSection className={styles.footerSection}>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.7 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        EagleBurgmann SA - Sales Portal
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.7 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
      >
        011 457 9000
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.7 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
      >
        info@eagleburgmann.co.za
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.7 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
      >
        South Africa
      </motion.p>
      <motion.form
        className={styles.subscribeForm}
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
      >
        <label htmlFor="home-email">Stay Connected</label>
        <input
          id="home-email"
          type="email"
          value={email}
          placeholder="Email*"
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit">Subscribe</button>
      </motion.form>
      {message ? (
        <motion.p
          className={styles.subscribeMessage}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {message}
        </motion.p>
      ) : null}
    </AnimatedSection>
  );
}

export default FooterSection;
