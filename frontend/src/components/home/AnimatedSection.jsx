import { motion, useAnimation, useInView } from "framer-motion";
import { forwardRef, useEffect, useRef } from "react";

const AnimatedSection = forwardRef(function AnimatedSection({ children, className = "" }, ref) {
  const innerRef = useRef(null);
  const targetRef = ref || innerRef;
  const controls = useAnimation();
  const isInView = useInView(targetRef, { amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <motion.section
      ref={targetRef}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 34 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
});

export default AnimatedSection;
