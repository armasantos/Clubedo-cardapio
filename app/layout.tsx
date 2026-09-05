import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clube do Cardápio | Venda mais com planejamento",
  description: "Cardápios prontos, receitas testadas e materiais para transformar sua cozinha em um negócio mais organizado.",
  openGraph: { title: "Clube do Cardápio", description: "Planeje melhor. Venda mais.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
