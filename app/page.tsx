"use client";

import { FormEvent, useEffect, useState } from "react";

const principles = [
  ["01", "POSICIONAMENTO", "[COMO O PROJETO SE APRESENTA E OCUPA ESPAÇO]"],
  ["02", "RELAÇÕES", "[CONEXÕES, TROCAS E PRESENÇA NA CENA]"],
  ["03", "BOOKING", "[OPORTUNIDADES, ABORDAGEM E CONTINUIDADE]"],
  ["04", "IMAGEM", "[PERCEPÇÃO, IDENTIDADE E COERÊNCIA]"],
  ["05", "COMUNICAÇÃO", "[O QUE O PROJETO DIZ ANTES E DEPOIS DO SET]"],
  ["06", "PROFISSIONALISMO", "[PROCESSO, ENTREGA E CONFIANÇA]"],
  ["07", "CRESCIMENTO", "[DECISÕES QUE CRIAM O PRÓXIMO MOVIMENTO]"],
];

const questions = [
  ["Preciso já saber tocar?", "Sim. O Código da Cena parte do princípio de que a base técnica já existe. O foco está no desenvolvimento da carreira e do projeto artístico."],
  ["O programa ensina discotecagem?", "Não. O foco não está em ensinar a mixar, mas no que acontece em torno da construção de uma carreira."],
  ["É presencial?", "Sim. A primeira edição será realizada presencialmente na Grande Vitória."],
  ["Existe garantia de tocar no The Bank?", "Não. Alguns participantes poderão ser selecionados de acordo com seu desenvolvimento ao longo do programa."],
  ["[PERGUNTA ADICIONAL]", "[RESPOSTA A INSERIR]"],
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

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

  return (
    <main>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "menu-active" : ""}`}>
        <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Código da Cena — início">CÓDIGO DA CENA</a>
        <nav aria-label="Navegação principal">
          <a href="#codigo">O Código</a><a href="#programa">Programa</a><a href="#experiencia">Experiência</a><a href="#contato">Contato</a>
          <a className="nav-cta" href="#codigo">Conhecer ↘</a>
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
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-index" aria-hidden="true">CD.C / 001</div>
        <div className="hero-copy reveal in-view">
          <p className="eyebrow">DESENVOLVIMENTO DE CARREIRA PARA DJS · GRANDE VITÓRIA</p>
          <h1>O que vem depois<br />é o que define<br />sua carreira.</h1>
          <p className="hero-statement">Saber mixar é o de menos.</p>
        </div>
        <a className="hero-cta" href="#codigo">Conhecer <span>↓</span></a>
        <div className="hero-side" aria-hidden="true">PRESENCIAL · GRANDE VITÓRIA</div>
        <div className="scroll-note" aria-hidden="true">SCROLL TO DECODE <span>↓</span></div>
      </section>

      <section className="intro section-pad" id="codigo">
        <p className="section-label reveal">01 / O CÓDIGO</p>
        <p className="intro-text reveal">Um programa presencial para DJs que já sabem tocar e querem entender o que realmente constrói uma carreira <em>dentro e fora da cena.</em></p>
      </section>

      <section className="manifesto section-pad">
        <p className="section-label reveal">02 / MANIFESTO</p>
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
            <span className="timeline-year">INÍCIO</span><div className="media-placeholder portrait">[IMAGEM]</div>
            <div className="timeline-copy"><span>00 / ORIGEM</span><h3>[INÍCIO DO PROJETO]</h3><p>[LOCAL / DATA]</p></div>
          </article>
          <article className="timeline-row reverse reveal">
            <span className="timeline-year">MOVIMENTO</span><div className="media-placeholder landscape"><span className="play">▶</span>[VÍDEO]</div>
            <div className="timeline-copy"><span>01 / CENA LOCAL</span><h3>[EVENTO / LOCAL / DATA]</h3><p>[MOMENTO IMPORTANTE DA CARREIRA]</p></div>
          </article>
          <article className="timeline-row reveal">
            <span className="timeline-year">EXPANSÃO</span><div className="media-placeholder portrait">[IMAGEM]</div>
            <div className="timeline-copy"><span>02 / NOVOS ESPAÇOS</span><h3>[SÃO PAULO / EVENTO / DATA]</h3><p>[APRESENTAÇÃO / CONTEXTO]</p></div>
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
          {['QUANTIDADE DE ENCONTROS','DURAÇÃO','CALENDÁRIO','FORMATO','CONTEÚDO','INVESTIMENTO'].map((item, i) => <div key={item}><span>0{i + 1}</span><p>{item}</p><b>[A DEFINIR]</b></div>)}
        </div>
      </section>

      <section className="codes section-pad">
        <p className="section-label reveal">07 / OS CÓDIGOS</p>
        <div className="codes-head reveal"><h2>UM SISTEMA.<br />NÃO UMA FÓRMULA.</h2><p>Princípios para ler a cena, tomar decisões e mover o projeto com intenção.</p></div>
        <div className="principle-list">
          {principles.map(([number, title, copy]) => <article className="principle reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><i>↘</i></article>)}
        </div>
      </section>

      <section className="moment section-pad">
        <p className="section-label reveal">08 / MOMENT AGENCY</p>
        <h2 className="reveal">Antes de ouvirem você,<br /><em>já podem ter visto você.</em></h2>
        <div className="moment-grid">
          <div className="moment-copy reveal"><p className="lead">A forma como um artista se apresenta também constrói percepção.</p><p>Posicionamento, identidade, comunicação e conteúdo fazem parte da maneira como um projeto é percebido dentro e fora da cena.</p><p>Essa frente do Código da Cena é desenvolvida em conjunto com a Moment Agency.</p></div>
          <div className="moment-media reveal"><div className="media-placeholder wide"><span className="play">▶</span>[VÍDEO / MOTION / BRANDING]</div><div className="moment-sign"><strong>MOMENT AGENCY</strong><span>Brand · Image · Communication</span></div></div>
        </div>
      </section>

      <section className="experience section-pad" id="experiencia">
        <p className="section-label reveal">09 / EXPERIÊNCIA — THE BANK</p>
        <div className="experience-visual reveal"><div className="bank-mark">THE<br />BANK</div><span>[IMAGEM / VÍDEO NIGHTLIFE]</span></div>
        <div className="experience-copy reveal">
          <h2>A cena não termina<br />na conversa.</h2>
          <div><p>O desenvolvimento também acontece quando o artista começa a ocupar os espaços que busca.</p><p>Participantes que se destacarem ao longo do processo poderão ser selecionados para oportunidades de apresentação no The Bank.</p><small>A seleção acontece a partir do desenvolvimento e desempenho durante o programa. Não se trata de uma garantia de booking.</small></div>
        </div>
      </section>

      <section className="film section-pad">
        <p className="section-label reveal">10 / FILME</p>
        <div className="film-head reveal"><h2>CÓDIGO DA CENA — FILME</h2><span>[DURAÇÃO]</span></div>
        <button className="film-player reveal" type="button" aria-label="Reproduzir filme de apresentação — vídeo ainda não inserido"><span>▶</span><strong>PLAY</strong><i>[PLAYER / POSTER DO VÍDEO]</i></button>
      </section>

      <section className="interest section-pad" id="contato">
        <p className="section-label dark reveal">11 / INTERESSE</p>
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
            <button className="submit-button" type="submit">Enviar <span>↗</span></button>
          </form>
        )}
      </section>

      <section className="faq section-pad">
        <p className="section-label reveal">12 / FAQ</p>
        <div className="faq-layout"><h2 className="reveal">PERGUNTAS<br />FREQUENTES</h2><div className="faq-list">{questions.map(([question, answer], i) => <details className="reveal" key={question}><summary><span>{String(i + 1).padStart(2, '0')}</span>{question}<i>+</i></summary><p>{answer}</p></details>)}</div></div>
      </section>

      <footer>
        <div className="footer-top"><a className="footer-brand" href="#top">CÓDIGO<br />DA CENA</a><div><span>LOCAL</span><p>Grande Vitória · ES</p></div><div><span>ENCONTRE</span><a href="#">Instagram ↗</a><a href="mailto:contato@codigodacena.com">Contato ↗</a></div></div>
        <div className="footer-bottom"><span>© 2026 CÓDIGO DA CENA</span><span>Estratégia e comunicação · Moment Agency</span><a href="#top">VOLTAR AO TOPO ↑</a></div>
      </footer>
    </main>
  );
}
