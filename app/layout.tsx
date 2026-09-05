import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Clube do Cardápio | Uma semana organizada começa aqui', description: 'Cardápios práticos, listas de compras e receitas para deixar sua rotina mais leve.', openGraph: { title: 'Clube do Cardápio', description: 'Planeje melhor. Compre certo. Cozinhe com tranquilidade.' } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body>{children}</body></html>; }
