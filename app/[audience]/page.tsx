import Link from 'next/link';

const content: Record<string, { eyebrow: string; title: string; body: string }> = {
  idosos: { eyebrow: 'UMA ROTINA MAIS TRANQUILA', title: 'Planeje suas refeições com leveza.', body: 'Um cardápio claro, receitas relacionadas e uma lista de compras para organizar a semana sem complicação.' },
  'para-familias': { eyebrow: 'PARA TODA A FAMÍLIA', title: 'Mais organização para a mesa de todos.', body: 'Tenha uma visão simples da semana e transforme o momento de planejar as refeições em algo mais leve.' },
  'para-marmitas': { eyebrow: 'PARA QUEM VENDE MARMITAS', title: 'Uma semana de ideias para vender.', body: 'Cardápios e receitas para você planejar melhor a produção e trabalhar com mais consistência.' }
};

export function generateStaticParams() { return Object.keys(content).map(audience => ({ audience })); }
export default async function AudiencePage({ params }: { params: Promise<{ audience: string }> }) { const { audience } = await params; const item = content[audience] ?? content.idosos; return <main className="audience-page"><header className="nav"><Link href="/" className="logo"><span>✳</span> CLUBE DO<br/><b>CARDÁPIO</b></Link><Link href="/" className="button">Voltar ao início</Link></header><section className="audience-hero"><p className="eyebrow">{item.eyebrow}</p><h1>{item.title}</h1><p>{item.body}</p><Link href="/#comprar" className="button">Quero meu Cardápio 7 Dias <span>→</span></Link></section></main> }
