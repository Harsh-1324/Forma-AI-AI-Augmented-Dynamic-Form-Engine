import { AnimatePresence, motion } from "framer-motion";

// Wraps a section of fields that should animate in/out as branching
// logic evaluates to true/false (Week 4 polish item).
export default function ConditionalSection({ visible, title, children }) {
  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          className="conditional-section-enter"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {title && <h3 style={{ margin: "20px 0 8px" }}>{title}</h3>}
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
