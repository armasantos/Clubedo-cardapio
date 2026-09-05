import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clube do Cardápio | Ideias que viram vendas",
  description: "Cardápios, fichas técnicas e estratégias para negócios de alimentação criarem com mais clareza e venderem com mais consistência.",
  openGraph: { title: "Clube do Cardápio", description: "Seu próximo cardápio começa com uma boa ideia.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
