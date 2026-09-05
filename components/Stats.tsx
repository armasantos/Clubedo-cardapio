"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Reveal from "./Reveal";
const stats = [[5000, "+", "receitas"], [1200, "+", "membros"], [300, "+", "cardápios"], [98, "%", "satisfação"]] as const;
export default function Stats() { const ref = useRef<HTMLElement>(null); const visible = useInView(ref, { once: true, margin: "-100px" }); const [values, setValues] = useState(stats.map(() => 0)); useEffect(() => { if (!visible) return; const started = performance.now(); let frame = 0; const tick = (now: number) => { const progress = Math.min((now - started) / 1100, 1); setValues(stats.map(([target]) => Math.round(target * (1 - Math.pow(1 - progress, 3))))); if (progress < 1) frame = requestAnimationFrame(tick); }; frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame); }, [visible]); return <section className="stats" ref={ref}><div className="container stats-grid">{stats.map(([, suffix, label], i) => <Reveal key={label} delay={i * .1}><div><strong>{values[i].toLocaleString("pt-BR")}{suffix}</strong><span>{label}</span></div></Reveal>)}</div></section>; }
