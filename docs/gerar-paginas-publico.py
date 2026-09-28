import re
base=open('familias/index.html').read()
def sub_between(s,a,b,new):
    i=s.index(a); j=s.index(b,i)+len(b); return s[:i]+new+s[j:]
def rep(s,a,b):
    assert a in s,a[:80]; return s.replace(a,b)

chk='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
ic=lambda d:f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{d}</svg>'
I={'chef':ic('<path d="M7 17.5h10V21H7z"/><path d="M7 17.5v-4.2A4 4 0 0 1 6.5 5.6 4.5 4.5 0 0 1 12 3.5a4.5 4.5 0 0 1 5.5 2.1A4 4 0 0 1 17 13.3v4.2"/>'),
 'cart':ic('<path d="M3 4h2.2l2.3 10.5a1.5 1.5 0 0 0 1.5 1.2h8.3a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6.2"/><circle cx="9.5" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/>'),
 'gift':ic('<rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12M12 8c-2-4-6-4-6-1.5S10 8 12 8zm0 0c2-4 6-4 6-1.5S14 8 12 8z"/>'),
 'box':ic('<rect x="3" y="8" width="18" height="12" rx="2.5"/><path d="M2 8h20M9 4h6l1 4H8z"/><path d="M12 11v9"/>'),
 'wallet':ic('<path d="M3 7a2 2 0 0 1 2-2h13v4"/><rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M16 13.5h2"/>')}

P={
'idosos':dict(
 corpo='publico-idosos leitura-ampliada', nome='Para Idosos', titulo='Cardápio para Idosos',
 desc='Cardápio da semana para quem tem mais de 60 anos e para quem cuida: café da manhã, almoço e jantar planejados, receitas fáceis e lista de compras. Pela nutricionista Rita Magalhães. A partir de R$ 19,90.',
 ogdesc='Refeições simples e gostosas, sem precisar pensar no que fazer. Cardápio da semana, receitas fáceis e lista de compras.',
 foto=('idosa-preparando-salada','Senhora sorrindo enquanto prepara uma salada na mesa da cozinha',1067,1600,'50% 22%'),
 h1='Refeições simples e gostosas, <span class="destaque">sem precisar pensar</span> no que fazer.',
 lead='Café da manhã, almoço e jantar da semana planejados, com receitas fáceis de preparar e lista de compras. Para quem tem mais de 60 anos e para quem cuida. Feito pela nutricionista Rita Magalhães.',
 dor_h2='Com o tempo, cozinhar todo dia <span class="destaque">pesa mais.</span>',
 dores=['Pensar todo dia no que fazer para comer cansa.','Cozinhar para uma ou duas pessoas parece não valer a pena.','Acabar comendo pão, lanche ou a mesma coisa todos os dias.','Receitas complicadas, com muitos passos e ingredientes difíceis.','Ir ao mercado e esquecer o que precisava comprar.','Os filhos se preocupam se os pais estão se alimentando bem.'],
 causa='Não é falta de cuidado. É que decidir e planejar todo dia gasta energia. Com o cardápio <strong>pronto</strong>, basta seguir o dia, com calma.',
 sol_foto=('casal-idoso-cozinhando','Casal de idosos sorrindo enquanto prepara uma salada'),
 sol_h2='Um cardápio pensado para a <span class="destaque">rotina depois dos 60</span>.',
 bens=[('chef','Receitas fáceis, passo a passo','Preparos simples, com ingredientes conhecidos e explicados sem complicação.'),
       ('cart','Uma lista de compras só','Leve impressa ou no celular. Tudo o que precisa para a semana, organizado por setor.'),
       ('gift','Um cuidado para quem você ama','Dá para comprar para os seus pais: o acesso chega por e-mail e o PDF pode ser impresso.')],
 r7='Uma semana de refeições simples, fáceis de preparar, com receitas explicadas passo a passo.',
 r30='Um cardápio novo a cada semana para manter a rotina organizada o mês todo, sem repetir.',
 of_p='Experimente uma semana ou mantenha as refeições em dia o mês todo.',
 garantia='Se o cardápio não for para você, peça o reembolso dentro do prazo pela própria Eduzz.',
 faq_h2='Dúvidas de quem tem mais de 60 ou cuida de alguém',
 faq=[('Posso comprar para os meus pais?','Pode. Na compra, use o e-mail de quem vai receber o cardápio, ou receba no seu e envie o PDF para eles. O material também pode ser impresso.'),
      ('O material pode ser impresso?','Sim. É um PDF que pode ser lido no celular, no tablet ou no computador, ou impresso para deixar na cozinha.'),
      ('Serve para quem tem diabetes, pressão alta ou outra condição de saúde?','O cardápio é um planejamento geral e não substitui orientação individual. Em caso de condições de saúde, alergias ou restrições, procure um nutricionista ou médico para adaptar a alimentação.'),
      ('As receitas são difíceis?','Não. São preparos simples do dia a dia, explicados passo a passo.'),
      ('Serve para quantas pessoas?','Cada receita informa quanto rende, e as orientações de uso explicam como ajustar as quantidades para uma ou duas pessoas.'),
      ('Qual a diferença entre 7 e 30 dias?','O de 7 dias é uma semana completa, ideal para começar, com pagamento único. O de 30 dias é a assinatura mensal: um cardápio novo a cada semana, 4 no mês.'),
      ('Como funciona a renovação e o cancelamento?','<span data-cc="assinatura.renovacao"></span> <span data-cc="assinatura.cancelamento"></span>'),
      ('E se eu não gostar?','Você tem 7 dias de garantia. Se o cardápio não for para você, peça o reembolso pela própria Eduzz dentro desse prazo.')],
 final_h2='Refeições em dia, com mais tranquilidade.',
 final_p='Receba agora o cardápio, as receitas e a lista de compras. Menos de R$ 3 por dia.',
 whats='Cardápio para Idosos'),
'voce':dict(
 corpo='publico-voce', nome='Para Você', titulo='Cardápio Para Você',
 desc='Cardápio da semana para quem cozinha para 1 pessoa e tem a rotina corrida: café da manhã, almoço e jantar, receitas simples e lista de compras, em casa ou na marmita. A partir de R$ 19,90.',
 ogdesc='Comida de verdade na sua rotina corrida, em casa ou na marmita. Cardápio da semana, receitas e lista de compras.',
 foto=('mulher-preparando-marmita','Mulher na cozinha fechando a bolsa térmica da marmita',1200,800,'52% 35%'),
 h1='Comida de verdade na sua rotina corrida, <span class="destaque">em casa ou na marmita.</span>',
 lead='Café da manhã, almoço e jantar da semana planejados para quem cozinha para 1 pessoa, com receitas simples e uma lista de compras só. Feito pela nutricionista Rita Magalhães.',
 dor_h2='Sem planejamento, a semana vira <span class="destaque">delivery e lanche.</span>',
 dores=['Chegar em casa sem energia e sem ideia do que fazer.','Comprar ingredientes que estragam porque é só você.','Gastar mais do que devia com delivery e comida na rua.','Levar marmita parece dar trabalho demais.','Repetir o mesmo prato a semana inteira.','Comer qualquer coisa no meio da correria.'],
 causa='Cozinhar para uma pessoa pede outro tipo de <strong>planejamento</strong>: comprar a quantidade certa e saber de antemão o que fazer em cada dia.',
 sol_foto=('mulher-comendo-marmita','Mulher sorrindo enquanto come a marmita'),
 sol_h2='Um plano para a semana de <span class="destaque">quem cozinha para si</span>.',
 bens=[('cart','Compre só o necessário','A lista vem pronta para a semana, para você não comprar demais nem deixar faltar.'),
       ('box','Marmita sem complicação','Pratos simples do dia a dia, que você pode preparar em casa e levar para o trabalho.'),
       ('wallet','Mais controle dos gastos','Com a semana planejada, fica mais fácil cozinhar em casa e depender menos do delivery.')],
 r7='Uma semana planejada para quem cozinha só para si, em casa ou na marmita.',
 r30='Um cardápio novo a cada semana para quem cozinha para 1 pessoa e não tem tempo a perder.',
 of_p='Experimente uma semana ou deixe o mês todo planejado.',
 garantia='Se o cardápio não for para você, peça o reembolso dentro do prazo pela própria Eduzz.',
 faq_h2='Dúvidas de quem cozinha para si',
 faq=[('As receitas servem para 1 pessoa?','Cada receita informa quanto rende, e as orientações de uso explicam como ajustar as quantidades para 1 pessoa ou preparar a mais para a marmita.'),
      ('Dá para levar na marmita?','Sim. Os pratos são preparos simples do dia a dia, que você pode fazer em casa e levar para o trabalho.'),
      ('Tenho pouco tempo para cozinhar. Serve para mim?','Serve. O cardápio já resolve a parte mais cansativa, que é decidir o que fazer e o que comprar. As receitas são simples e explicadas passo a passo.'),
      ('Preciso saber cozinhar bem?','Não. As receitas são explicadas passo a passo, com ingredientes fáceis de encontrar.'),
      ('Como recebo o cardápio?','Assim que o pagamento é aprovado, a Eduzz envia o acesso ao PDF no seu e-mail. Dá para abrir no celular, inclusive no mercado.'),
      ('Qual a diferença entre 7 e 30 dias?','O de 7 dias é uma semana completa, ideal para começar, com pagamento único. O de 30 dias é a assinatura mensal: um cardápio novo a cada semana, 4 no mês.'),
      ('Como funciona a renovação e o cancelamento?','<span data-cc="assinatura.renovacao"></span> <span data-cc="assinatura.cancelamento"></span>'),
      ('E se eu não gostar?','Você tem 7 dias de garantia. Se o cardápio não for para você, peça o reembolso pela própria Eduzz dentro desse prazo.')],
 final_h2='Sua semana organizada, do café da manhã à marmita.',
 final_p='Receba agora o cardápio, as receitas e a lista de compras. Menos de R$ 3 por dia.',
 whats='Cardápio Para Você'),
}
dest={'idosos':'idosos','voce':'para-voce'}
for k,c in P.items():
    s=base
    s=rep(s,'<body class="publico-familias">',f'<body class="{c["corpo"]}">')
    s=s.replace('Cardápio para Famílias · Clube do Cardápio',f'{c["titulo"]} · Clube do Cardápio')
    s=re.sub(r'<meta name="description" content="[^"]*">',f'<meta name="description" content="{c["desc"]}">',s)
    s=re.sub(r'<meta property="og:description" content="[^"]*">',f'<meta property="og:description" content="{c["ogdesc"]}">',s)
    s=s.replace('clubedocardapio.com.br/familias/',f'clubedocardapio.com.br/{dest[k]}/')
    s=rep(s,'<span class="chamada">Cardápio para Famílias</span>',f'<span class="chamada">{c["titulo"]}</span>')
    s=re.sub(r'<h1>.*?</h1>',f'<h1>{c["h1"]}</h1>',s,count=1,flags=re.S)
    s=re.sub(r'(<div class="hv__texto">.*?<p class="lead">).*?(</p>)',lambda m:m.group(1)+c['lead']+m.group(2),s,count=1,flags=re.S)
    f,alt,w,h,pos=c['foto']
    s=sub_between(s,'<picture class="hv__foto">','</picture>',f'''<picture class="hv__foto">
          <source srcset="../images/publicos/{f}-760.webp 760w, ../images/publicos/{f}-1200.webp 1200w" sizes="(min-width: 900px) 560px, 100vw" type="image/webp">
          <img src="../images/publicos/{f}-1200.jpg" alt="{alt}" width="{w}" height="{h}" fetchpriority="high" style="object-position:{pos}">
        </picture>''')
    s=re.sub(r'<h2>Na correria, a comida da família <span class="destaque">vira improviso.</span></h2>',f'<h2>{c["dor_h2"]}</h2>',s)
    dores='\n'.join(f'          <div class="dor" data-anima><p>{d}</p></div>' for d in c['dores'])
    s=re.sub(r'(<div class="grade grade--2">\n).*?(\n        </div>\n        <p class="causa")',lambda m:m.group(1)+dores+m.group(2),s,count=1,flags=re.S)
    s=re.sub(r'<p class="causa" data-anima>.*?</p>',f'<p class="causa" data-anima>{c["causa"]}</p>',s,count=1,flags=re.S)
    sf,salt=c['sol_foto']
    s=sub_between(s,'<picture class="solucao__foto">','</picture>',f'''<picture class="solucao__foto">
          <source srcset="../images/publicos/{sf}-1000.webp" type="image/webp">
          <img src="../images/publicos/{sf}-1000.jpg" alt="{salt}" width="1000" height="750" loading="lazy">
        </picture>''')
    s=re.sub(r'(<span class="chamada">A solução</span>\n\s*<h2>).*?(</h2>)',lambda m:m.group(1)+c['sol_h2']+m.group(2),s,count=1,flags=re.S)
    bens='\n'.join(f'            <li><span class="beneficios__icone">{I[i]}</span><div><h3>{t}</h3><p>{d}</p></div></li>' for i,t,d in c['bens'])
    s=re.sub(r'(<ul class="beneficios" role="list">\n).*?(\n          </ul>)',lambda m:m.group(1)+bens+m.group(2),s,count=1,flags=re.S)
    s=rep(s,'<h2>Cardápio para Famílias</h2>',f'<h2>{c["titulo"]}</h2>')
    s=rep(s,'<p>Experimente uma semana ou mantenha a família organizada o mês todo.</p>',f'<p>{c["of_p"]}</p>')
    s=rep(s,'Uma semana inteira planejada para a família, do café da manhã ao jantar.',c['r7'])
    s=rep(s,'Um cardápio novo a cada semana para a família comer bem o mês todo, sem improviso.',c['r30'])
    s=s.replace('familias-7',f'{k}-7').replace('familias-30',f'{k}-30')
    s=rep(s,'Se o cardápio não for para a sua família, peça o reembolso dentro do prazo pela própria Eduzz.',c['garantia'])
    s=rep(s,'<h2>Dúvidas de quem cozinha para a família</h2>',f'<h2>{c["faq_h2"]}</h2>')
    faqh='\n'.join(f'          <details{" open" if i==0 else ""}><summary>{q}</summary><div><p>{a}</p></div></details>' for i,(q,a) in enumerate(c['faq']))
    s=re.sub(r'(<div class="faq">\n).*?(\n        </div>)',lambda m:m.group(1)+faqh+m.group(2),s,count=1,flags=re.S)
    s=rep(s,'<h2>A semana da sua família organizada, a partir de hoje.</h2>',f'<h2>{c["final_h2"]}</h2>')
    s=rep(s,'<p class="lead">Receba agora o cardápio, as receitas e a lista de compras. Menos de R$ 3 por dia.</p>',f'<p class="lead">{c["final_p"]}</p>')
    s=s.replace('Cardápio para Famílias.',c['whats']+'.').replace('data-whats-origem="familias-final"',f'data-whats-origem="{k}-final"').replace('data-whats-origem="familias-flutuante"',f'data-whats-origem="{k}-flutuante"')
    s=s.replace('Vim pela página de Famílias',f'Vim pela página {c["whats"]}')
    s=rep(s,'<b>Cardápio para Famílias</b>',f'<b>{c["titulo"]}</b>')
    assert 'Famílias</b>' not in s and 'família toda' not in s, k
    open(f'{dest[k]}/index.html','w').write(s)
    print(k, s.count('familia'), [m for m in re.findall(r'[^\n]*[Ff]amíli[^\n]*',s)][:6])
