"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const programAxes = [
  ["01", "DIAGNÓSTICO E DIREÇÃO", "CLAREZA / PRIORIDADES", "Leitura do projeto atual, objetivos, travas e prioridades."],
  ["02", "POSICIONAMENTO E IDENTIDADE", "POSICIONAMENTO / IMAGEM", "Proposta artística, diferenciação, narrativa e coerência de imagem."],
  ["03", "RELAÇÕES E PRESENÇA NA CENA", "RELAÇÕES / PRESENÇA", "Networking, comportamento, trocas e construção de confiança."],
  ["04", "COMUNICAÇÃO E MOVIMENTO", "COMUNICAÇÃO / CONTEÚDO", "Presença digital e comunicação antes e depois do set."],
  ["05", "BOOKING E PROFISSIONALISMO", "BOOKING / NEGOCIAÇÃO", "Abordagem, timing, cachê, negociação, processo e entrega."],
  ["06", "PLANO DE 90 DIAS", "DIREÇÃO / CONTINUIDADE", "Decisões, metas e ações para dar continuidade ao projeto."],
];

const courseModules = [
  "Diagnóstico e Direção",
  "Fundamentos do DJ",
  "Pesquisa Musical e Repertório",
  "Identidade Musical",
  "Construção de Set",
  "As 5 Primeiras Músicas",
  "Feeling e Leitura de Pista",
  "Diferenciação",
  "Primeiras Oportunidades",
  "Posicionamento na Cena",
  "Networking",
  "Primeira Impressão e Presença",
  "Comportamento Profissional",
  "Como Agregar Valor à Festa",
  "Movimentação de Público",
  "Transformar Festa em Evento",
  "Marketing Pré-Evento",
  "Marketing Durante o Evento",
  "Marketing Pós-Evento",
  "Instagram de DJ",
  "Parecer Profissional Antes de Ser Grande",
  "Conteúdo sem Ter Datas",
  "Comunidade e Apoio entre DJs",
  "Agência e Management",
  "O Lado do Contratante",
  "Cachê e Cobrança",
  "Quando Tocar de Graça",
  "Como Aumentar o Cachê",
  "Ser Chamado Novamente",
  "Transformar 1 Oportunidade em 5",
  "Se Manter na Cena",
  "Carreira Estratégica",
  "Plano de 90 Dias",
];

const moduleCoverImages = [
  "/module-cover-01.webp",
  "/module-cover-02.webp",
  "/module-cover-03.webp",
  "/module-cover-04.webp",
  "/module-cover-05.webp",
];

const questions = [
  ["Preciso já saber tocar?", "Não. O programa também apresenta os fundamentos práticos da mixagem, embora o foco principal esteja no desenvolvimento da carreira e do projeto artístico."],
  ["O programa ensina discotecagem?", "Sim. A mixagem entra como uma base prática do percurso; a maior parte do programa é dedicada a posicionamento, oportunidades e construção de carreira."],
  ["É presencial?", "Sim. A primeira edição será realizada presencialmente na Grande Vitória."],
  ["Existe garantia de tocar no The Bank?", "Não. Alguns participantes poderão ser selecionados de acordo com seu desenvolvimento ao longo do programa."],
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [moduleStep, setModuleStep] = useState(0);
  const modulesSliderRef = useRef<HTMLDivElement>(null);
  const moduleStepCount = 6;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("in-view")),
      { threshold: 0.14, rootMargin: "0px 0px -7% 0px" },
    );
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  const closeMenu = () => setMenuOpen(false);
  const scrollModulesTo = (step: number) => {
    const slider = modulesSliderRef.current;
    if (!slider) return;
    const nextStep = Math.max(0, Math.min(moduleStepCount - 1, step));
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    slider.scrollTo({ left: maxScroll * (nextStep / (moduleStepCount - 1)), behavior: "smooth" });
    setModuleStep(nextStep);
  };
  const moveModules = (direction: number) => scrollModulesTo(moduleStep + direction);
  const updateModuleStep = () => {
    const slider = modulesSliderRef.current;
    if (!slider) return;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    setModuleStep(maxScroll > 0 ? Math.round((slider.scrollLeft / maxScroll) * (moduleStepCount - 1)) : 0);
  };

  return (
    <main>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "menu-active" : ""}`}>
        <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Código da Cena — início"><img className="header-brand-logo" src="/codigo-da-cena-profile-white.png" alt="" aria-hidden="true" /></a>
        <nav aria-label="Navegação principal">
          <a href="#codigo">O Código</a><a href="#programa">Programa</a><a href="#experiencia">Experiência</a><a href="#contato">Contato</a>
          <a className="nav-cta" href="#codigo">Conhecer <i className="ui-arrow ui-arrow-se" aria-hidden="true" /></a>
        </nav>
        <button className="menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-nav">
          <span>{menuOpen ? "Fechar" : "Menu"}</span><i aria-hidden="true" />
        </button>
      </header>

      <div className={`mobile-nav ${menuOpen ? "is-open" : ""}`} id="mobile-nav" aria-hidden={!menuOpen}>
        <a href="#codigo" onClick={closeMenu}>O Código <span>01</span></a>
        <a href="#programa" onClick={closeMenu}>Programa <span>02</span></a>
        <a href="#experiencia" onClick={closeMenu}>Experiência <span>03</span></a>
        <a href="#contato" onClick={closeMenu}>Contato <span>04</span></a>
      </div>

      <section className="hero" id="top">
        <picture className="hero-photo" aria-hidden="true">
          <source media="(max-width: 760px)" srcSet="/sttef-hero-mobile.webp" />
          <img src="/sttef-hero.webp" alt="" fetchPriority="high" decoding="async" />
        </picture>
        <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="/sttef-hero-mobile.webp" aria-hidden="true" tabIndex={-1}>
          <source src="/sttef-hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-index" aria-hidden="true">CD.C / 001</div>
        <div className="hero-copy reveal in-view">
          <p className="eyebrow">DESENVOLVIMENTO DE CARREIRA PARA DJS · GRANDE VITÓRIA</p>
          <h1>O que vem depois<br />é o que define<br />sua carreira.</h1>
          <p className="hero-statement">Mixar é técnica. Carreira é construção.</p>
        </div>
        <a className="hero-cta" href="#codigo">Conhecer <i className="ui-arrow ui-arrow-down" aria-hidden="true" /></a>
        <div className="hero-side" aria-hidden="true">PRESENCIAL · GRANDE VITÓRIA</div>
        <div className="scroll-note" aria-hidden="true">SCROLL TO DECODE <i className="ui-arrow ui-arrow-down" /></div>
      </section>

      <section className="intro section-pad" id="codigo">
        <p className="section-label reveal">01 / O CÓDIGO</p>
        <div className="intro-copy">
          <p className="intro-text reveal">Um programa presencial para DJs com foco em desenvolver sua carreira, <em>como se posicionar e criar oportunidades.</em></p>
          <p className="intro-tech-note reveal">A mixagem entra apenas como base prática.</p>
        </div>
        <div className="modules-showcase reveal">
          <div className="modules-head">
            <div><span>CONTEÚDO DO PROGRAMA</span><strong>33 MÓDULOS</strong></div>
            <div className="modules-controls">
              <button type="button" onClick={() => moveModules(-1)} aria-label="Ver módulos anteriores"><i className="ui-arrow ui-arrow-left" aria-hidden="true" /></button>
              <button type="button" onClick={() => moveModules(1)} aria-label="Ver próximos módulos"><i className="ui-arrow ui-arrow-right" aria-hidden="true" /></button>
            </div>
          </div>
          <div className="modules-slider" ref={modulesSliderRef} onScroll={updateModuleStep} tabIndex={0} aria-label="33 módulos do programa" role="list">
            {courseModules.map((module, index) => {
              const cover = moduleCoverImages[index];
              const moduleNumber = String(index + 1).padStart(2, "0");
              return <article className={`module-card ${cover ? "has-cover" : ""}`} data-module-number={moduleNumber} role="listitem" tabIndex={0} key={module}>{cover && <img className="module-card-cover" src={cover} alt="" loading="lazy" decoding="async" />}<span>{moduleNumber}</span><div className="module-card-copy"><h3>{module}</h3><small>FORMAÇÃO PRESENCIAL · MÓDULO {moduleNumber}</small></div></article>;
            })}
          </div>
          <div className="modules-pagination" aria-label="Posição na lista de módulos">
            {Array.from({ length: moduleStepCount }, (_, index) => <button className={moduleStep === index ? "is-active" : ""} type="button" aria-label={`Ir para o grupo ${index + 1} de módulos`} aria-current={moduleStep === index ? "true" : undefined} onClick={() => scrollModulesTo(index)} key={index} />)}
          </div>
        </div>
      </section>

      <section className="manifesto section-pad">
        <p className="section-label reveal">02 / MANIFESTO</p>
        <p className="manifesto-question reveal">Aprendi a tocar, e agora?</p>
        <h2 className="manifesto-lead reveal">Existe uma parte da carreira que não está no set.</h2>
        <div className="manifesto-lines">
          <p className="reveal">Está em como você se posiciona.</p>
          <p className="reveal">Nas relações que constrói.</p>
          <p className="reveal">Na maneira como comunica o seu trabalho.</p>
          <p className="reveal">Em reconhecer uma oportunidade — e o que fazer depois dela.</p>
        </div>
        <p className="manifesto-end reveal">É sobre essa parte<br />que estamos falando.</p>
      </section>

      <section className="question section-pad">
        <p className="section-label dark reveal">03 / A PERGUNTA</p>
        <blockquote className="reveal">“Como você conseguiu chegar até aqui tão rápido?”</blockquote>
        <div className="question-copy reveal">
          <p>Essa pergunta começou a aparecer com frequência.</p>
          <p>A resposta não estava em uma fórmula.</p>
          <p>Estava em uma sequência de decisões, experiências, erros e movimentos feitos dentro e fora da cena.</p>
        </div>
      </section>

      <section className="trajectory section-pad">
        <div className="trajectory-head">
          <p className="section-label reveal">04 / A TRAJETÓRIA</p>
          <div className="duration reveal"><strong>18</strong><span>MESES.</span></div>
          <p className="duration-note reveal">Em cerca de um ano e meio de projeto,<br />muita coisa aconteceu.</p>
        </div>
        <div className="timeline">
          <article className="timeline-row reveal">
            <span className="timeline-year">INÍCIO</span>
            <div className="origin-gallery">
              <figure className="timeline-photo"><img src="/sttef-small-event-05.webp" alt="Sttef tocando em um evento pequeno e diurno, próximo ao público" loading="lazy" decoding="async" /><figcaption>ROTINA / PRESENÇA</figcaption></figure>
              <figure className="timeline-photo"><img src="/sttef-small-event-01.webp" alt="Sttef tocando em um evento menor com iluminação vermelha" loading="lazy" decoding="async" /><figcaption>PROXIMIDADE / PISTA</figcaption></figure>
              <figure className="timeline-photo"><img src="/sttef-small-event-02.webp" alt="Sttef tocando com fones em um espaço intimista" loading="lazy" decoding="async" /><figcaption>PRÁTICA / PRESENÇA</figcaption></figure>
              <figure className="timeline-photo"><img src="/sttef-small-event-03.webp" alt="Sttef tocando em um evento diurno de menor escala" loading="lazy" decoding="async" /><figcaption>BASE / CONSTÂNCIA</figcaption></figure>
            </div>
            <div className="timeline-copy"><span>00 / A BASE</span><h3>CONSTRUINDO</h3><p>OS PRIMEIROS ESPAÇOS ONDE A PRESENÇA GANHOU FORMA</p></div>
          </article>
          <article className="timeline-row showcase-row reveal">
            <span className="timeline-year">MOVIMENTO</span>
            <div className="timeline-copy"><span>01 / A ESCALA</span><h3>SOLIDIFICANDO</h3><p>PALCO / PÚBLICO / CONSISTÊNCIA</p></div>
            <div className="trajectory-gallery">
              <figure className="timeline-photo"><img src="/sttef-large-event-04.webp" alt="Sttef tocando em um grande evento diurno diante de um palco colorido" loading="lazy" decoding="async" /><figcaption>PALCO / PRESENÇA</figcaption></figure>
              <figure className="timeline-photo"><img src="/sttef-large-event-03.webp" alt="Sttef interagindo com o público diante da cabine" loading="lazy" decoding="async" /><figcaption>CONEXÃO / PÚBLICO</figcaption></figure>
              <figure className="timeline-photo"><img src="/sttef-live-crowd.webp" alt="Sttef tocando diante de uma grande pista" loading="lazy" decoding="async" /><figcaption>ESCALA / MOVIMENTO</figcaption></figure>
              <figure className="timeline-photo"><img src="/sttef-large-event-02.webp" alt="Sttef tocando em meio a fachos de luz dourada" loading="lazy" decoding="async" /><figcaption>IMERSÃO / ENTREGA</figcaption></figure>
              <figure className="timeline-photo"><img src="/sttef-large-energy.webp" alt="Sttef conduzindo o público com os braços levantados" loading="lazy" decoding="async" /><figcaption>ENERGIA / CONEXÃO</figcaption></figure>
            </div>
          </article>
          <article className="timeline-row reveal">
            <span className="timeline-year">EXPANSÃO</span>
            <div className="sp-gallery">
              <figure className="timeline-photo landscape sp-photo"><img src="/sttef-live-sao-paulo.webp" alt="Apresentação em São Paulo vista de trás da cabine" loading="lazy" decoding="async" /><figcaption>SÃO PAULO</figcaption></figure>
              <figure className="timeline-photo portrait sp-photo"><img src="/sttef-large-event-01.webp" alt="Sttef tocando em um grande palco durante o dia em São Paulo" loading="lazy" decoding="async" /><figcaption>SÃO PAULO / PALCO</figcaption></figure>
            </div>
            <div className="timeline-copy"><span>02 / NOVOS TERRITÓRIOS</span><h3>EXPANDINDO</h3><p>SÃO PAULO / NOVAS CENAS</p></div>
          </article>
          <article className="timeline-row dream-row reveal">
            <span className="timeline-year">MARCO</span>
            <div className="timeline-copy dream-copy"><span>03 / UM SONHO EM MOVIMENTO</span><h3>REALIZAÇÃO<br />DE UM SONHO</h3><p>DIVIDIR O LINE-UP COM REFERÊNCIAS DA CENA — E ENTENDER QUE O PROJETO JÁ ESTAVA OCUPANDO OUTRO LUGAR.</p></div>
            <div className="dream-gallery">
              <figure className="timeline-photo"><img src="/sttef-lineup-tech-house.webp" alt="Flyer do Tech House com Sttef no line-up ao lado de atrações nacionais" loading="lazy" decoding="async" /><figcaption>LINE-UP / TECH HOUSE</figcaption></figure>
              <figure className="timeline-photo"><img src="/sttef-lineup-almare.webp" alt="Flyer do Almare com Sttef no line-up ao lado de atrações nacionais" loading="lazy" decoding="async" /><figcaption>LINE-UP / ALMARE</figcaption></figure>
              <figure className="timeline-photo"><img src="/sttef-lineup-garden.webp" alt="Flyer do Garden com Sttef no line-up ao lado de Gustavo Mota" loading="lazy" decoding="async" /><figcaption>LINE-UP / GARDEN</figcaption></figure>
              <figure className="timeline-photo"><img src="/sttef-lineup-brava-stage.webp" alt="Flyer do Brava Stage Club com Sttef no line-up" loading="lazy" decoding="async" /><figcaption>LINE-UP / BRAVA STAGE</figcaption></figure>
            </div>
          </article>
        </div>
        <div className="sttef reveal"><span>O PROJETO POR TRÁS DO MOVIMENTO</span><img className="sttef-logo" src="/sttef-logo.png" alt="STTEF" loading="lazy" decoding="async" /></div>
      </section>

      <section className="behind section-pad">
        <p className="section-label reveal">05 / O QUE EXISTE POR TRÁS</p>
        <h2 className="display-title reveal">Não foi<br />uma coisa.</h2>
        <div className="word-field" aria-label="Elementos de uma carreira">
          {['POSICIONAMENTO','RELAÇÕES','TIMING','PROFISSIONALISMO','IMAGEM','CONTEÚDO','BOOKING','NEGOCIAÇÃO','PRESENÇA'].map((word, i) => <span className={`word w${i + 1} reveal`} key={word}>{word}</span>)}
        </div>
        <p className="behind-note reveal">Uma carreira não acontece apenas enquanto você está tocando.</p>
      </section>

      <section className="program section-pad" id="programa">
        <p className="section-label dark reveal">06 / O PROGRAMA</p>
        <div className="program-intro reveal">
          <h2>Código<br />da Cena</h2>
          <div><p className="program-kicker">Um programa presencial de desenvolvimento de carreira para DJs.</p><p>Um espaço para colocar projeto, posicionamento, relações, oportunidades e decisões reais na mesa.</p></div>
        </div>
        <div className="program-statement reveal">Entender onde você está hoje.<br />O que está te segurando.<br /><em>E o que precisa mudar para que o projeto avance.</em></div>
        <div className="program-facts reveal"><div><span>FORMATO</span><strong>PRESENCIAL</strong></div><div><span>LOCAL</span><strong>GRANDE VITÓRIA</strong></div></div>
        <div className="program-placeholders reveal">
          {[
            ['ENCONTROS', '2 DOMINGOS'],
            ['DURAÇÃO', '8 HORAS POR ENCONTRO'],
            ['EXPERIÊNCIA', 'CAFÉ DA MANHÃ + COFFEE BREAK'],
            ['PARTICIPAÇÕES', 'ARTISTAS NACIONAIS'],
            ['TURMA', 'ATÉ 50 DJs'],
            ['GRAVAÇÕES', 'PRODUÇÃO PROFISSIONAL · ACESSO EXCLUSIVO AOS ALUNOS'],
          ].map(([item, value], i) => <div key={item}><span>0{i + 1}</span><p>{item}</p><b>{value}</b></div>)}
        </div>
        <div className="program-investment reveal">
          <div>
            <span>INVESTIMENTO / TURMA INAUGURAL</span>
            <h3>R$ 1.497</h3>
          </div>
          <div className="program-investment-copy">
            <p>O valor considera dois domingos de imersão presencial, com 8 horas por encontro, participação de artistas nacionais, café da manhã e coffee break.</p>
            <p>As aulas serão gravadas com produção profissional e ficarão disponíveis em acesso exclusivo para os alunos reassistirem.</p>
            <p>A entrada acontece depois de uma conversa breve, para entender se o momento e a proposta fazem sentido para os dois lados.</p>
          </div>
        </div>
      </section>

      <section className="codes section-pad">
        <p className="section-label reveal">07 / OS EIXOS</p>
        <div className="codes-head reveal"><h2>UM PERCURSO.<br />NÃO UMA FÓRMULA.</h2><p>Seis eixos organizam os 33 módulos distribuídos ao longo dos dois domingos.</p></div>
        <div className="principle-list">
          {programAxes.map(([number, title, codes, copy]) => <article className="principle reveal" key={number}><span>{number}</span><h3>{title}</h3><div className="encounter-copy"><small>{codes}</small><p>{copy}</p></div><i aria-hidden="true" /></article>)}
        </div>
        <p className="codes-closing reveal">O plano de 90 dias transforma essa leitura em decisões, prioridades e movimento.</p>
      </section>

      <section className="experience section-pad" id="experiencia">
        <p className="section-label reveal">08 / EXPERIÊNCIA — THE BANK</p>
        <div className="experience-visual reveal"><img className="experience-photo" src="/the-bank-industrial-club.webp" alt="Interior de um club underground com arquitetura industrial" loading="lazy" decoding="async" /><img className="bank-logo" src="/the-bank-logo.svg" alt="The Bank" loading="lazy" decoding="async" /><span>EXPERIÊNCIA / CLUB UNDERGROUND</span></div>
        <div className="experience-copy reveal">
          <h2>A cena não termina<br />na conversa.</h2>
          <div><p>O desenvolvimento também acontece quando o artista começa a ocupar os espaços que busca.</p><p>Participantes que se destacarem ao longo do processo poderão ser selecionados para oportunidades de apresentação no The Bank.</p><small>A seleção acontece a partir do desenvolvimento e desempenho durante o programa. Não se trata de uma garantia de booking.</small></div>
        </div>
      </section>

      <section className="interest section-pad" id="contato">
        <p className="section-label dark reveal">09 / INTERESSE</p>
        <div className="interest-head reveal"><h2>Quer entender se o Código da Cena faz sentido para o seu momento?</h2><p>Conte um pouco sobre o seu projeto.</p></div>
        {sent ? (
          <div className="form-success" role="status"><span>✓</span><h3>Recebemos seu contato.</h3><p>Falamos em breve.</p><button type="button" onClick={() => setSent(false)}>Enviar outro contato</button></div>
        ) : (
          <form className="interest-form reveal" onSubmit={submitForm}>
            <label><span>Nome</span><input name="name" autoComplete="name" required /></label>
            <label><span>Nome artístico</span><input name="artistName" required /></label>
            <label><span>Instagram</span><input name="instagram" placeholder="@" required /></label>
            <label><span>WhatsApp</span><input name="whatsapp" inputMode="tel" autoComplete="tel" required /></label>
            <label><span>Há quanto tempo você toca?</span><input name="experience" required /></label>
            <label><span>Onde costuma tocar?</span><input name="venues" required /></label>
            <label className="wide-field"><span>Qual é o seu momento atual como DJ?</span><textarea name="currentMoment" rows={3} required /></label>
            <label className="wide-field"><span>O que você sente que falta hoje para sua carreira avançar?</span><textarea name="missing" rows={4} required /></label>
            <button className="submit-button" type="submit">Enviar <i className="ui-arrow ui-arrow-ne" aria-hidden="true" /></button>
          </form>
        )}
      </section>

      <section className="faq section-pad">
        <p className="section-label reveal">10 / FAQ</p>
        <div className="faq-layout"><h2 className="reveal">PERGUNTAS<br />FREQUENTES</h2><div className="faq-list">{questions.map(([question, answer], i) => <details className="reveal" key={question}><summary><span>{String(i + 1).padStart(2, '0')}</span>{question}<i>+</i></summary><p>{answer}</p></details>)}</div></div>
      </section>

      <footer>
        <div className="footer-top"><a className="footer-brand" href="#top" aria-label="Código da Cena — voltar ao início"><img className="footer-brand-logo" src="/codigo-da-cena-profile-white.png" alt="" aria-hidden="true" loading="lazy" decoding="async" /></a><div><span>LOCAL</span><p>Grande Vitória · ES</p></div><div><span>ENCONTRE</span><a href="#">Instagram <i className="ui-arrow ui-arrow-ne" aria-hidden="true" /></a><a href="mailto:contato@codigodacena.com">Contato <i className="ui-arrow ui-arrow-ne" aria-hidden="true" /></a></div></div>
        <div className="footer-bottom"><span>© 2026 CÓDIGO DA CENA</span><span>DESENVOLVIMENTO DE CARREIRA PARA DJS</span><a href="#top">VOLTAR AO TOPO <i className="ui-arrow ui-arrow-up" aria-hidden="true" /></a></div>
      </footer>
    </main>
  );
}
