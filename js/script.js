/* ==========================================================================
   KAYTOLABS — Interações (JavaScript puro, sem bibliotecas)
   Samuel Kayto Takiuchi | Front-End | FIAP
   --------------------------------------------------------------------------
   ÍNDICE
   01. Utilitários e dados
   02. Ícones pixel art
   03. Navegação: cabeçalho, menu mobile, âncoras, seção ativa, progresso
   04. Efeitos: revelar ao rolar, texto digitado, estrelinhas, relógio
   05. Projetos: detalhes expansíveis, modais, mockup da câmera
   06. Interesses: cartões, HOBBY SELECT
   07. Música: abas
   08. Inicialização
   ========================================================================== */
(function () {
  'use strict';

  /* 01. UTILITÁRIOS E DADOS ------------------------------------------------ */
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Jogos (HOBBY SELECT)
  const GAMES = {
    valorant: {
      name: 'VALORANT', icon: 'crosshair', mode: 'MODE: COMPETITIVO',
      desc: 'Estratégia, trabalho em equipe, precisão e partidas competitivas. Também é uma das inspirações da estética deste portfólio.',
      tags: ['ESTRATÉGIA', 'EQUIPE', 'PRECISÃO', 'COMPETITIVO']
    },
    fortnite: {
      name: 'FORTNITE', icon: 'bricks', mode: 'MODE: CRIATIVO',
      desc: 'Criatividade, construção, exploração e partidas dinâmicas.',
      tags: ['CRIATIVIDADE', 'CONSTRUÇÃO', 'EXPLORAÇÃO', 'DINÂMICO']
    },
    cs: {
      name: 'COUNTER-STRIKE (CS)', icon: 'headset', mode: 'MODE: TÁTICO',
      desc: 'Estratégia, comunicação e competitividade.',
      tags: ['ESTRATÉGIA', 'COMUNICAÇÃO', 'COMPETITIVO']
    },
    minecraft: {
      name: 'MINECRAFT', icon: 'cube', mode: 'MODE: SANDBOX',
      desc: 'Exploração, construção e liberdade para criar.',
      tags: ['EXPLORAÇÃO', 'CONSTRUÇÃO', 'LIBERDADE']
    },
    indie: {
      name: 'JOGOS INDIE', icon: 'ghost', mode: 'MODE: INDIE',
      desc: 'Experiências originais, propostas criativas e jogos que fogem do convencional.',
      tags: ['ORIGINAL', 'CRIATIVO', 'FORA DO COMUM']
    }
  };

  // Estilos musicais (abas)
  const MUSIC = {
    trap: {
      label: 'Trap',
      desc: 'Um dos estilos que gosto de ouvir, principalmente pela sonoridade, pelos beats e pela identidade de cada artista.',
      artists: ['Matuê', 'WIU', 'Veigh', 'Cabelinho', 'Alee', 'KayBlack', 'Neckklace', 'Iunk Vino', 'G.A.', 'Vulgo FK', 'Orochi']
    },
    sertanejo: {
      label: 'Sertanejo',
      desc: 'Para acompanhar diferentes momentos, gosto de ouvir sertanejo, desde músicas mais românticas até aquelas que combinam com uma viagem ou uma reunião entre amigos.',
      artists: ['Jorge & Mateus', 'Matheus & Kauan', 'Marília Mendonça', 'Cristiano Araújo', 'Henrique & Juliano', 'Zé Neto & Cristiano', 'Murilo Huff', 'Ícaro & Gilmar', 'Hugo & Guilherme', 'Zezé Di Camargo & Luciano', 'Jads & Jadson', 'Juan Marcos & Vinícius', 'Diego & Victor Hugo', 'Felipe & Rodrigo']
    },
    pagode: {
      label: 'Pagode',
      desc: 'O pagode também faz parte dos meus gostos musicais, com músicas que combinam com momentos descontraídos, encontros e boas conversas.',
      artists: ['Turma do Pagode', 'Menos é Mais', 'Renan Oliveira', 'Péricles', 'Sorriso Maroto', 'Ferrugem', 'Vitinho']
    },
    funk: {
      label: 'Funk',
      desc: 'Gosto de funk pela energia, pelos beats marcantes e pela presença do estilo em festas e momentos com os amigos.',
      artists: ['MC IG', 'DJ JAPA NK', 'MC Jacaré', 'DJ Oreia', 'MC Tutu', 'Joanzinho VT', 'Meno K', 'MC Lele']
    },
    internacionais: {
      label: 'Internacionais',
      desc: 'Também gosto de ouvir artistas internacionais, com músicas que passam por diferentes estilos, como pop, rock, R&B e hip-hop.',
      artists: ['Shawn Mendes', 'Justin Bieber', 'Skillet', 'The Neighbourhood', 'Chase Atlantic', 'James Arthur', 'Chris Brown', 'Charlie Puth', 'Maroon 5', 'Drake', 'One Direction']
    }
  };

  // Mockup conceitual da câmera (textos qualitativos, sem números inventados)
  const CAM_MODES = {
    paisagem: { icon: 'pin', tag: 'CENA DETECTADA: PAISAGEM', info: 'exposição equilibrada entre céu e solo; foco no horizonte.' },
    animal: { icon: 'paw', tag: 'CENA DETECTADA: ANIMAL', info: 'foco no sujeito, priorizando nitidez da imagem.' },
    objeto: { icon: 'cube', tag: 'CENA DETECTADA: OBJETO', info: 'foco no objeto central e cores fiéis à cena.' },
    noite: { icon: 'moon', tag: 'AMBIENTE NOTURNO DETECTADO', info: 'ajustes de pouca luz para melhorar a captura.' }
  };

  /* 02. ÍCONES PIXEL ART ---------------------------------------------------
     Cada ícone é um mapa 12x12. Letras = cores da paleta; "." = vazio.      */
  const PALETTE = { R: '#FF4655', O: '#FF7138', Y: '#FFC857', W: '#F4F4F5', G: '#B8B8C2', D: '#1B1B22' };

  const PIXEL_ICONS = {
    heart: ['..RRR..RRR..', '.RWRRRRRRRR.', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR', '.RRRRRRRRRR.', '..RRRRRRRR..', '...RRRRRR...', '....RRRR....', '.....RR.....'],
    player: ['....YYYY....', '...YYYYYY...', '...YYYYYY...', '...YYYYYY...', '....YYYY....', '............', '..RRRRRRRR..', '.RRRRRRRRRR.', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR'],
    crosshair: ['.....RR.....', '.....RR.....', '.....RR.....', '.....RR.....', '............', 'RRRR.YY.RRRR', 'RRRR.YY.RRRR', '............', '.....RR.....', '.....RR.....', '.....RR.....', '.....RR.....'],
    bricks: ['............', 'YYYYY.YYYYY.', 'YYYYY.YYYYY.', '............', '.OOOOO.OOOOO', '.OOOOO.OOOOO', '............', 'RRRRR.RRRRR.', 'RRRRR.RRRRR.', '............'],
    headset: ['...WWWWWW...', '..W......W..', '.W........W.', '.W........W.', '.WR......RW.', '.WR......RW.', '.WR......RW.', '.WW......WW.', '..........Y.', '.........YY.'],
    cube: ['RRRRRRRRRRRR', 'ROYOYOYOYOYR', 'RYOYOYOYOYOR', 'ROYOYOYOYOYR', 'RYOYOYOYOYOR', 'ROYOYOYOYOYR', 'RYOYOYOYOYOR', 'ROYOYOYOYOYR', 'RYOYOYOYOYOR', 'ROYOYOYOYOYR', 'RYOYOYOYOYOR', 'RRRRRRRRRRRR'],
    ghost: ['....YYYY....', '..YYYYYYYY..', '.YYYYYYYYYY.', '.YYWWYYWWYY.', '.YYWDYYWDYY.', '.YYYYYYYYYY.', '.YYYYYYYYYY.', '.YYYYYYYYYY.', '.YYYYYYYYYY.', '.YY.YYYY.YY.', '.Y...YY...Y.'],
    cup: ['........WW..', '.......WW...', '......WW....', '..YYYYYYYY..', '..YWWWWWWY..', '..YWWWWWWY..', '..YWWWWWWY..', '...YWWWWY...', '...YWWWWY...', '....YYYY....'],
    spark: ['.....YY.....', '.....YY.....', '....YYYY....', '...YYYYYY...', 'YYYYYWWYYYYY', 'YYYYYWWYYYYY', '...YYYYYY...', '....YYYY....', '.....YY.....', '.....YY.....'],
    pin: ['....RRRR....', '...RRRRRR...', '..RRRWWRRR..', '..RRRWWRRR..', '..RRRRRRRR..', '...RRRRRR...', '....RRRR....', '.....RR.....', '.....RR.....', '.....RR.....', '....OOOO....'],
    house: ['.....RR.....', '....RRRR....', '...RRRRRR...', '..RRRRRRRR..', '.RRRRRRRRRR.', 'RRRRRRRRRRRR', '.YYYYYYYYYY.', '.YYYYYYYYYY.', '.YYYYOOYYYY.', '.YYYYOOYYYY.', '.YYYYOOYYYY.', '.YYYYOOYYYY.'],
    mic: ['....RRRR....', '...RRRRRR...', '...RRGGRR...', '...RRRRRR...', '...RRGGRR...', '...RRRRRR...', '.W..RRRR..W.', '.W...WW...W.', '..WW....WW..', '...WWWWWW...', '.....WW.....', '....WWWW....'],
    hat: ['............', '....RRRR....', '...RRRRRR...', '...RRRRRR...', '...YYYYYY...', '..OOOOOOOO..', 'OOOOOOOOOOOO', 'OO.OOOOOO.OO'],
    drum: ['............', '.Y........Y.', '..Y......Y..', '...Y....Y...', '.OOOOOOOOOO.', 'OWWWWWWWWWWO', 'OWWWWWWWWWWO', 'OOOOOOOOOOOO', '.OYOYOYOYOY.', '..OOOOOOOO..'],
    speaker: ['..OOOOOOOO..', '..OYYYYYYO..', '..OYYYYYYO..', '..OOOOOOOO..', '..OOOOOOOO..', '..OOWWWWOO..', '..OWWDDWWO..', '..OWDDDDWO..', '..OWWDDWWO..', '..OOWWWWOO..', '..OOOOOOOO..'],
    globe: ['....OOOO....', '..OOYYYYOO..', '.OYYYOOYYYO.', '.OYYYOOYYYO.', 'OYYYYOOYYYYO', 'OOOOOOOOOOOO', 'OYYYYOOYYYYO', '.OYYYOOYYYO.', '.OYYYOOYYYO.', '..OOYYYYOO..', '....OOOO....'],
    paw: ['..YY....YY..', '.YYYY..YYYY.', '.YYYY..YYYY.', '..YY....YY..', '....YYYY....', '...YYYYYY...', '..YYYYYYYY..', '..YYYYYYYY..', '..YYY..YYY..', '...YY..YY...'],
    moon: ['....YYYY....', '..YYYY......', '.YYYY.......', '.YYY........', 'YYYY........', 'YYYY........', 'YYYY........', '.YYYY.......', '.YYYYY....Y.', '..YYYYYYYY..', '....YYYY....']
  };

  // Converte um mapa de pixels em SVG (agrupa pixels vizinhos da mesma cor)
  function buildIconSvg(rows) {
    let rects = '';
    rows.forEach((row, y) => {
      let x = 0;
      while (x < row.length) {
        const ch = row[x];
        if (ch === '.' || !PALETTE[ch]) { x += 1; continue; }
        let run = 1;
        while (row[x + run] === ch) run += 1;
        rects += `<rect x="${x}" y="${y}" width="${run}" height="1" fill="${PALETTE[ch]}"/>`;
        x += run;
      }
    });
    return `<svg viewBox="0 0 12 12" aria-hidden="true" focusable="false" shape-rendering="crispEdges">${rects}</svg>`;
  }

  function setIcon(element, name) {
    const rows = PIXEL_ICONS[name];
    if (!element || !rows) return;
    element.dataset.icon = name;
    element.innerHTML = buildIconSvg(rows);
  }

  function renderIcons(scope = document) {
    $$('[data-icon]', scope).forEach((el) => setIcon(el, el.dataset.icon));
  }

  /* 03. NAVEGAÇÃO ------------------------------------------------------------ */
  function setHeaderHeightVar() {
    const header = $('#site-header');
    if (!header) return;
    const apply = () => document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
    apply();
    if ('ResizeObserver' in window) new ResizeObserver(apply).observe(header);
    else window.addEventListener('resize', apply);
  }

  function initMobileMenu() {
    const toggle = $('.nav-toggle');
    const menu = $('#menu');
    if (!toggle || !menu) return;

    const setOpen = (open) => {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    };

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (event) => { if (event.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
    document.addEventListener('click', (event) => {
      if (!menu.classList.contains('is-open')) return;
      if (!event.target.closest('#menu') && !event.target.closest('.nav-toggle')) setOpen(false);
    });
    window.matchMedia('(min-width: 981px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
  }

  // Rolagem suave nos links internos + foco na seção de destino
  function initSmoothAnchors() {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link || link.getAttribute('href') === '#') return;
      const target = document.getElementById(link.getAttribute('href').slice(1));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', '#' + target.id);
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  }

  // Destaca no menu a seção que está no centro da tela
  function initScrollSpy() {
    const links = $$('.nav__link');
    const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
    const sections = Array.from(map.keys()).map((id) => document.getElementById(id)).filter(Boolean);
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => { a.classList.remove('is-active'); a.removeAttribute('aria-current'); });
        const active = map.get(entry.target.id);
        if (active) { active.classList.add('is-active'); active.setAttribute('aria-current', 'true'); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((section) => observer.observe(section));
  }

  // Barra de progresso de rolagem + botão "voltar ao topo"
  function initScrollUi() {
    const bar = $('#scroll-bar');
    const toTop = $('#to-top');
    let ticking = false;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (bar) bar.style.transform = `scaleX(${ratio})`;
      if (toTop) toTop.classList.toggle('is-visible', window.scrollY > 600);
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();

    if (toTop) {
      toTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
        history.replaceState(null, '', location.pathname);
      });
    }
  }

  /* 04. EFEITOS --------------------------------------------------------------- */
  function initReveal() {
    const items = $$('.reveal');
    if (reducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    items.forEach((el) => observer.observe(el));
  }

  // Frase do hero digitada letra por letra
  function initTyped() {
    const host = $('[data-typed]');
    const output = host && $('.typed', host);
    if (!output || reducedMotion) return;
    const text = host.dataset.typed;
    output.textContent = '';
    let index = 0;
    const type = () => {
      output.textContent = text.slice(0, ++index);
      if (index < text.length) window.setTimeout(type, 32);
    };
    window.setTimeout(type, 700);
  }

  // Estrelinhas pixel decorativas
  function initSparkles() {
    if (reducedMotion) return;
    [['.scene', 10], ['.hero', 12]].forEach(([selector, count]) => {
      const host = $(selector);
      if (!host) return;
      for (let i = 0; i < count; i += 1) {
        const star = document.createElement('span');
        star.className = 'sparkle';
        star.setAttribute('aria-hidden', 'true');
        star.style.left = (4 + Math.random() * 92) + '%';
        star.style.top = (4 + Math.random() * (selector === '.scene' ? 50 : 86)) + '%';
        star.style.animationDelay = (Math.random() * 2.8).toFixed(2) + 's';
        star.style.transform = `scale(${(0.6 + Math.random() * 0.9).toFixed(2)})`;
        host.appendChild(star);
      }
    });
  }

  function initClock() {
    const clock = $('#clock');
    if (!clock) return;
    const tick = () => { clock.textContent = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); };
    tick();
    window.setInterval(tick, 30000);
  }

  /* 05. PROJETOS --------------------------------------------------------------- */
  function initDetailsToggles() {
    $$('[data-toggle-details]').forEach((button) => {
      const panel = document.getElementById(button.dataset.toggleDetails);
      const original = button.textContent.trim();
      if (!panel) return;
      button.addEventListener('click', () => {
        const open = panel.classList.toggle('is-open');
        button.setAttribute('aria-expanded', String(open));
        button.textContent = open ? original.replace(/^VER/, 'OCULTAR') : original;
      });
    });
  }

  // Modais acessíveis (<dialog>): foco preso, Esc, botão fechar e clique fora
  function initModals() {
    let lastTrigger = null;

    $$('[data-modal-open]').forEach((button) => {
      button.addEventListener('click', () => {
        const dialog = document.getElementById(button.dataset.modalOpen);
        if (!dialog || typeof dialog.showModal !== 'function') return;
        lastTrigger = button;
        dialog.showModal();
        document.body.classList.add('modal-open');
        const closeBtn = $('[data-modal-close]', dialog);
        if (closeBtn) closeBtn.focus();
      });
    });

    $$('.modal').forEach((dialog) => {
      $$('[data-modal-close]', dialog).forEach((btn) => btn.addEventListener('click', () => dialog.close()));
      dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
      dialog.addEventListener('close', () => {
        document.body.classList.remove('modal-open');
        if (lastTrigger) lastTrigger.focus();
      });
    });
  }

  // Mockup da câmera: troca de modos de cena
  function initCamMock() {
    const phone = $('#cam-phone');
    if (!phone) return;
    const tag = $('#cam-tag');
    const info = $('#cam-info');
    const subject = $('#cam-subject');
    const buttons = $$('[data-cam]');

    const setMode = (mode) => {
      const data = CAM_MODES[mode];
      if (!data) return;
      phone.dataset.mode = mode;
      tag.textContent = data.tag;
      info.innerHTML = '<b>Exemplo da proposta:</b> ' + data.info;
      setIcon(subject, data.icon);
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cam === mode)));
    };

    buttons.forEach((b) => b.addEventListener('click', () => setMode(b.dataset.cam)));
    setMode('paisagem');
  }

  /* 06. INTERESSES --------------------------------------------------------------- */
  function initLifeCards() {
    $$('.life-card').forEach((card) => {
      const button = $('.life-card__more', card);
      if (!button) return;
      button.addEventListener('click', () => {
        const open = card.classList.toggle('is-open');
        button.setAttribute('aria-expanded', String(open));
        button.textContent = open ? '− FECHAR' : '+ LER MAIS';
      });
    });
  }

  function initHobbySelect() {
    const panel = $('#hobby-panel');
    const picks = $$('.pick');
    if (!panel || !picks.length) return;
    const name = $('#hobby-name');
    const mode = $('#hobby-mode');
    const desc = $('#hobby-desc');
    const tags = $('#hobby-tags');
    const icon = $('#hobby-icon');

    const select = (key) => {
      const game = GAMES[key];
      if (!game) return;
      picks.forEach((p) => p.setAttribute('aria-pressed', String(p.dataset.game === key)));
      name.textContent = game.name;
      mode.textContent = game.mode;
      desc.textContent = game.desc;
      tags.innerHTML = game.tags.map((t) => `<span class="chip">${t}</span>`).join('');
      setIcon(icon, game.icon);
      panel.classList.remove('is-swapping');
      void panel.offsetWidth; // reinicia a animação
      panel.classList.add('is-swapping');
    };

    picks.forEach((p) => p.addEventListener('click', () => select(p.dataset.game)));
  }

  /* 07. MÚSICA -------------------------------------------------------------------- */
  function initMusicTabs() {
    const tabs = $$('[data-tab]');
    const panel = $('#music-panel');
    if (!tabs.length || !panel) return;

    const render = (key) => {
      const data = MUSIC[key];
      if (!data) return;
      const artists = data.artists.map((artist, i) =>
        `<li class="artist" style="--i:${i}"><span class="artist__no" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><span class="artist__name"></span></li>`
      ).join('');
      panel.innerHTML =
        `<div class="tabpanel__head"><span class="chip chip--red">${data.label.toUpperCase()} · ${data.artists.length} ARTISTAS</span></div>` +
        `<p class="tabpanel__desc">${data.desc}</p>` +
        `<ul class="artists" style="margin-top:1.2rem" aria-label="Artistas de ${data.label}">${artists}</ul>`;
      // nomes inseridos como texto (seguro contra caracteres especiais como "&")
      $$('.artist__name', panel).forEach((el, i) => { el.textContent = data.artists[i]; });
      panel.classList.remove('tabpanel');
      void panel.offsetWidth;
      panel.classList.add('tabpanel');
    };

    const activate = (tab, moveFocus) => {
      tabs.forEach((t) => {
        const selected = t === tab;
        t.setAttribute('aria-selected', String(selected));
        t.tabIndex = selected ? 0 : -1;
      });
      panel.setAttribute('aria-labelledby', tab.id);
      render(tab.dataset.tab);
      if (moveFocus) tab.focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab, false));
      tab.addEventListener('keydown', (event) => {
        const keys = { ArrowRight: 1, ArrowLeft: -1 };
        let next = null;
        if (event.key in keys) next = tabs[(index + keys[event.key] + tabs.length) % tabs.length];
        if (event.key === 'Home') next = tabs[0];
        if (event.key === 'End') next = tabs[tabs.length - 1];
        if (next) { event.preventDefault(); activate(next, true); }
      });
    });

    activate(tabs[0], false);
  }

  /* 08. INICIALIZAÇÃO ---------------------------------------------------------------- */
  function init() {
    renderIcons();
    setHeaderHeightVar();
    initMobileMenu();
    initSmoothAnchors();
    initScrollSpy();
    initScrollUi();
    initReveal();
    initTyped();
    initSparkles();
    initClock();
    initDetailsToggles();
    initModals();
    initCamMock();
    initLifeCards();
    initHobbySelect();
    initMusicTabs();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
