"use client";
import { motion, type Variants } from "framer-motion";

const variants: Record<string, Variants> = {
  up: { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 28 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: .94 }, show: { opacity: 1, scale: 1 } },
};

export default function Reveal({ children, direction = "up", delay = 0, className = "" }: { children: React.ReactNode; direction?: keyof typeof variants; delay?: number; className?: string }) {
  return <motion.div className={className} variants={variants[direction]} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} transition={{ duration: .65, delay, ease: [0.22, 1, .36, 1] }}>{children}</motion.div>;
}
