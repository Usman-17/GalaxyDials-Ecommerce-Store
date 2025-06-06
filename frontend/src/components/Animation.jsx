import { motion } from "framer-motion";

const Animation = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default Animation;
