"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false); const [open, setOpen] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 16); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}><a className="logo" href="#top"><span>✦</span><b>CLUBE DO<br />CARDÁPIO</b></a><button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Abrir menu">{open ? <X /> : <Menu />}</button><nav className={open ? "nav-open" : ""}>{["benefícios", "como funciona", "conteúdos", "depoimentos", "faq"].map(item => <a key={item} href={`#${item.replace(" ", "-")}`} onClick={() => setOpen(false)}>{item}</a>)}<a className="nav-button" href="#entrar">Entrar agora <ArrowUpRight size={15} /></a></nav></header>;
}
