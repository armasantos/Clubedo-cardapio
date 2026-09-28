/* ============================================================
   CLUBE DO CARDÁPIO: COMPORTAMENTO DO SITE
   Lê js/config.js e aplica links, preços e contatos na página.
   ============================================================ */
(function () {
  'use strict';

  var CFG = window.CC_CONFIG || {};
  var faltando = [];

  /* ---------- utilitários ---------- */
  function pega(caminho) {
    return caminho.split('.').reduce(function (o, k) { return o && o[k] != null ? o[k] : ''; }, CFG);
  }
  function marcaFaltando(el, rotulo) {
    faltando.push(rotulo);
    el.innerHTML = '';
    var s = document.createElement('span');
    s.className = 'cc-faltando';
    s.textContent = '[PREENCHER: ' + rotulo + ']';
    el.appendChild(s);
  }
  var armazem = {
    ler: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    gravar: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sem armazenamento */ } }
  };
  var sessao = {
    ler: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    gravar: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* sem armazenamento */ } }
  };

  /* ---------- UTMs: guarda a origem da visita e repassa ao checkout ---------- */
  var CHAVES_UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var params = new URLSearchParams(location.search);
  if (CHAVES_UTM.some(function (k) { return params.has(k); })) {
    var origem = {};
    CHAVES_UTM.forEach(function (k) { if (params.get(k)) origem[k] = params.get(k); });
    sessao.gravar('cc-utm', JSON.stringify(origem));
  }
  function utmsGuardadas() {
    try { return JSON.parse(sessao.ler('cc-utm') || '{}'); } catch (e) { return {}; }
  }
  function comUtm(url) {
    try {
      var u = new URL(url);
      var utm = utmsGuardadas();
      Object.keys(utm).forEach(function (k) { if (!u.searchParams.has(k)) u.searchParams.set(k, utm[k]); });
      return u.toString();
    } catch (e) { return url; }
  }

  /* ---------- textos simples: data-cc="empresa.cnpj" ---------- */
  document.querySelectorAll('[data-cc]').forEach(function (el) {
    var chave = el.getAttribute('data-cc');
    var valor = pega(chave);
    if (valor) el.textContent = valor;
    else if (!el.hasAttribute('data-cc-opcional')) marcaFaltando(el, chave);
    else el.hidden = true;
  });

  /* ---------- produtos: links de checkout e preços ---------- */
  var produtos = CFG.produtos || {};
  document.querySelectorAll('[data-checkout]').forEach(function (a) {
    var id = a.getAttribute('data-checkout');
    var p = produtos[id] || {};
    if (p.checkout) {
      a.href = comUtm(p.checkout);
      a.removeAttribute('aria-disabled');
    } else {
      faltando.push('produtos.' + id + '.checkout');
      a.href = '#';
      a.setAttribute('aria-disabled', 'true');
      a.title = 'Link de compra ainda não configurado';
    }
    a.addEventListener('click', function () { registra('checkout', { produto: id, nome: p.nome || id, valor: p.preco || '' }); });
  });
  document.querySelectorAll('[data-preco]').forEach(function (el) {
    var p = produtos[el.getAttribute('data-preco')] || {};
    if (p.preco) el.textContent = p.preco;
    else marcaFaltando(el, 'produtos.' + el.getAttribute('data-preco') + '.preco');
  });
  [['data-preco-de', 'precoDe'], ['data-parcelas', 'parcelas']].forEach(function (par) {
    document.querySelectorAll('[' + par[0] + ']').forEach(function (el) {
      var p = produtos[el.getAttribute(par[0])] || {};
      if (p[par[1]]) el.textContent = p[par[1]]; else el.hidden = true;
    });
  });

  /* ---------- WhatsApp: data-whats="mensagem inicial" ---------- */
  var numero = (pega('empresa.whatsapp') || '').replace(/\D/g, '');
  document.querySelectorAll('[data-whats]').forEach(function (a) {
    if (!numero) {
      a.hidden = true;
      return;
    }
    var msg = a.getAttribute('data-whats') || 'Olá! Tenho uma dúvida sobre o Clube do Cardápio.';
    a.href = 'https://wa.me/' + numero + '?text=' + encodeURIComponent(msg);
    a.target = '_blank';
    a.rel = 'noopener';
    a.addEventListener('click', function () { registra('whatsapp', { origem: a.getAttribute('data-whats-origem') || '' }); });
  });
  if (!numero) faltando.push('empresa.whatsapp');

  /* ---------- Instagram: data-insta="empresa.instagram" ---------- */
  document.querySelectorAll('[data-insta]').forEach(function (a) {
    var user = (pega(a.getAttribute('data-insta')) || '').replace(/^@/, '');
    if (!user) { a.closest('li') ? a.closest('li').hidden = true : a.hidden = true; return; }
    a.href = 'https://www.instagram.com/' + user + '/';
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = '@' + user;
  });

  /* ---------- depoimentos (config.depoimentos) ---------- */
  var listaDep = document.querySelector('[data-depoimentos]');
  var deps = (CFG.depoimentos || []).filter(function (d) { return d && d.texto; });
  if (listaDep && deps.length) {
    deps.forEach(function (d) {
      var fig = document.createElement('figure');
      fig.className = 'depoimento';
      var bq = document.createElement('blockquote');
      var p = document.createElement('p');
      p.textContent = d.texto;
      bq.appendChild(p);
      var cap = document.createElement('figcaption');
      var box = document.createElement('div');
      var b = document.createElement('b');
      b.textContent = d.nome || '';
      var sp = document.createElement('span');
      sp.textContent = [d.cidade, d.publico].filter(Boolean).join(' · ');
      box.appendChild(b); box.appendChild(sp); cap.appendChild(box);
      fig.appendChild(bq); fig.appendChild(cap);
      listaDep.appendChild(fig);
    });
    var secDep = document.querySelector('[data-depoimentos-secao]');
    if (secDep) secDep.hidden = false;
  }

  /* ---------- ano no rodapé ---------- */
  document.querySelectorAll('[data-ano]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- cabeçalho ao rolar ---------- */
  var cabecalho = document.querySelector('.cabecalho');
  function aoRolar() { if (cabecalho) cabecalho.classList.toggle('is-rolado', window.scrollY > 8); }
  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();

  /* ---------- abas de público ---------- */
  document.querySelectorAll('[role="tablist"]').forEach(function (lista) {
    var abas = Array.prototype.slice.call(lista.querySelectorAll('[role="tab"]'));
    function ativa(aba, foco) {
      abas.forEach(function (a) {
        var sel = a === aba;
        a.setAttribute('aria-selected', sel ? 'true' : 'false');
        a.tabIndex = sel ? 0 : -1;
        var painel = document.getElementById(a.getAttribute('aria-controls'));
        if (painel) painel.hidden = !sel;
      });
      if (foco) aba.focus();
      registra('publico', { publico: aba.getAttribute('data-publico') || aba.textContent.trim() });
      document.dispatchEvent(new CustomEvent('cc:publico', { detail: aba.getAttribute('data-publico') }));
    }
    abas.forEach(function (aba, i) {
      aba.addEventListener('click', function () { ativa(aba); });
      aba.addEventListener('keydown', function (e) {
        var alvo = null;
        if (e.key === 'ArrowRight') alvo = abas[(i + 1) % abas.length];
        if (e.key === 'ArrowLeft') alvo = abas[(i - 1 + abas.length) % abas.length];
        if (e.key === 'Home') alvo = abas[0];
        if (e.key === 'End') alvo = abas[abas.length - 1];
        if (alvo) { e.preventDefault(); ativa(alvo, true); }
      });
    });
  });

  /* ---------- barra de compra fixa: aparece depois do HERO, some na oferta ---------- */
  var barra = document.querySelector('.barra-compra');
  var hero = document.querySelector('.hero');
  var oferta = document.getElementById('oferta');
  if (barra && hero && 'IntersectionObserver' in window) {
    var heroVisivel = true, ofertaVisivel = false;
    var atualiza = function () { barra.classList.toggle('is-visivel', !heroVisivel && !ofertaVisivel); };
    new IntersectionObserver(function (e) { heroVisivel = e[0].isIntersecting; atualiza(); }).observe(hero);
    if (oferta) new IntersectionObserver(function (e) { ofertaVisivel = e[0].isIntersecting; atualiza(); }, { threshold: .15 }).observe(oferta);
  }

  /* ---------- animação de entrada ---------- */
  var animaveis = document.querySelectorAll('[data-anima]');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (itens) {
      itens.forEach(function (i) { if (i.isIntersecting) { i.target.classList.add('is-visivel'); obs.unobserve(i.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    animaveis.forEach(function (el) { obs.observe(el); });
  } else {
    animaveis.forEach(function (el) { el.classList.add('is-visivel'); });
  }

  /* ---------- cookies e medição (LGPD: nada carrega sem consentimento) ---------- */
  var CONSENT = 'cc-cookies';
  var aviso = document.querySelector('.cookies');
  var medicaoAtiva = false;

  function carregaScript(src) {
    var s = document.createElement('script');
    s.async = true;
    s.src = src;
    document.head.appendChild(s);
  }
  function ativaMedicao() {
    if (medicaoAtiva) return;
    medicaoAtiva = true;
    var ga = pega('medicao.ga4');
    if (ga) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', ga, { anonymize_ip: true });
      carregaScript('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ga));
    }
    var px = pega('medicao.metaPixel');
    if (px) {
      /* eslint-disable */
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */
      window.fbq('init', px);
      window.fbq('track', 'PageView');
    }
  }
  function registra(evento, dados) {
    if (!medicaoAtiva) return;
    if (window.gtag) {
      var nomes = { checkout: 'begin_checkout', whatsapp: 'contato_whatsapp', publico: 'escolha_publico' };
      window.gtag('event', nomes[evento] || evento, dados);
    }
    if (window.fbq) {
      if (evento === 'checkout') window.fbq('track', 'InitiateCheckout', { content_name: dados.nome, content_ids: [dados.produto] });
      if (evento === 'whatsapp') window.fbq('track', 'Contact');
    }
  }
  function decide(valor) {
    armazem.gravar(CONSENT, valor);
    if (aviso) aviso.hidden = true;
    document.body.classList.remove('tem-cookies');
    if (valor === 'aceito') ativaMedicao();
  }
  var escolha = armazem.ler(CONSENT);
  if (escolha === 'aceito') ativaMedicao();
  if (aviso) {
    aviso.hidden = !!escolha;
    document.body.classList.toggle('tem-cookies', !escolha);
    var aceitar = aviso.querySelector('[data-cookies="aceitar"]');
    var recusar = aviso.querySelector('[data-cookies="recusar"]');
    if (aceitar) aceitar.addEventListener('click', function () { decide('aceito'); });
    if (recusar) recusar.addEventListener('click', function () { decide('recusado'); });
  }
  document.querySelectorAll('[data-cookies="abrir"]').forEach(function (b) {
    b.addEventListener('click', function (e) { e.preventDefault(); if (aviso) { aviso.hidden = false; document.body.classList.add('tem-cookies'); } });
  });

  /* ---------- relatório de campos pendentes ---------- */
  if (faltando.length && window.console) {
    console.warn('[Clube do Cardápio] Campos pendentes em js/config.js:\n- ' + faltando.filter(function (v, i, a) { return a.indexOf(v) === i; }).join('\n- '));
  }
})();
