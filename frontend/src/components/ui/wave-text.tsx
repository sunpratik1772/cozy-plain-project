import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface WaveTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  staggerDelay?: number;
  yOffset?: number;
  duration?: number;
}

const WaveText = ({
  text,
  className = "",
  as: Component = "span",
  staggerDelay = 0.03,
  yOffset = 20,
  duration = 0.4,
}: WaveTextProps) => {
  const isMobile = useIsMobile();
  
  // On mobile, animate words to prevent mid-word breaks
  // On desktop, animate characters for smoother effect
  const items = isMobile ? text.split(" ") : text.split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isMobile ? staggerDelay * 3 : staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: yOffset,
      opacity: 0,
      filter: "blur(8px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: duration,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <motion.span
      key={isMobile ? "mobile" : "desktop"}
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      aria-label={text}
    >
      {isMobile ? (
        // Word-based animation for mobile
        items.map((word, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
            aria-hidden="true"
          >
            {word}
            {index < items.length - 1 && "\u00A0"}
          </motion.span>
        ))
      ) : (
        // Character-based animation for desktop
        items.map((char, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            style={{ display: "inline-block" }}
            aria-hidden="true"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))
      )}
    </motion.span>
  );
};

export default WaveText;
