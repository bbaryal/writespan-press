'use client'

import { useState, useEffect } from 'react'

const categories = [
  {
    id: 'college',
    label: 'College & University',
    icon: '🎓',
    description: 'Advanced composition, first-year writing, and disciplinary writing courses for undergraduate students.',
    books: [
      { title: 'Writing with Intention', subtitle: 'Rhetoric, Research, and Voice', course: 'Advanced Composition · Upper Division Writing', status: 'Available Now', available: true, href: '/books/writing-with-authority' },
      { title: 'Writing from Life', subtitle: 'A Complete First-Year Composition Course', course: 'First-Year Composition · College Writing', status: 'Coming Soon', available: false, href: '#' },
    ],
  },
  { id: 'k12', label: 'K–12 Schools', icon: '📚', description: 'Writing curriculum by grade level, designed for classroom teachers and school writing programs.', books: [] },
  { id: 'homeschool', label: 'Homeschooling', icon: '🏡', description: 'Self-paced writing courses with parent guides and flexible pacing for homeschool families.', books: [] },
  { id: 'testprep', label: 'Test Preparation', icon: '✏️', description: 'SAT, ACT, GRE, and AP writing preparation — structured, effective, and built for results.', books: [] },
]

const features = [
  { icon: '⚡', title: 'Truly Interactive', body: 'Not a PDF. Embedded quizzes, videos, discussion prompts, and assignments — all in one place.' },
  { icon: '📱', title: 'Works Everywhere', body: 'Phone, tablet, or desktop. Beautiful and readable on any screen, anywhere.' },
  { icon: '🎯', title: 'Built by Educators', body: 'Every title is designed by experienced university faculty — not committees selling supplements.' },
  { icon: '🔓', title: 'No Hidden Costs', body: 'One access code. Everything included. No companion websites, no extra workbooks.' },
]

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('college')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        :root{
          --navy:#0F2341;--navy-mid:#1A3E6E;--sky:#38BDF8;--sky-dark:#0284C7;
          --cream:#FAFAF7;--warm:#F5F4EF;--text:#1C1C1E;--muted:#6B7280;
          --border:#E5E3DC;--radius:16px;
          --shadow-lg:0 16px 48px rgba(15,35,65,0.16);
          --t:0.25s cubic-bezier(0.4,0,0.2,1);
        }
        html{scroll-behavior:smooth;}
        body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--text);-webkit-font-smoothing:antialiased;overflow-x:hidden;}
        :focus-visible{outline:3px solid var(--sky);outline-offset:3px;border-radius:4px;}
        .skip{position:absolute;top:-100px;left:16px;background:var(--navy);color:white;padding:12px 20px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;z-index:999;transition:top .2s;}
        .skip:focus{top:16px;}

        .nav{position:fixed;top:0;left:0;right:0;z-index:100;transition:background var(--t),box-shadow var(--t);padding:0 clamp(16px,4vw,48px);}
        .nav.scrolled{background:rgba(250,250,247,.96);backdrop-filter:blur(14px);box-shadow:0 1px 0 var(--border),0 4px 16px rgba(15,35,65,.06);}
        .nav-inner{max-width:1200px;margin:0 auto;height:68px;display:flex;align-items:center;justify-content:space-between;gap:24px;}
        .logo{display:flex;flex-direction:column;line-height:1;text-decoration:none;flex-shrink:0;}
        .logo-top{font-family:'DM Mono',monospace;font-size:10px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:var(--sky-dark);}
        .logo-bottom{font-family:'Playfair Display',serif;font-size:21px;font-weight:900;color:var(--navy);letter-spacing:-.5px;}
        .nav-links{display:flex;align-items:center;gap:28px;list-style:none;}
        .nav-links a{font-size:14px;font-weight:500;color:var(--navy);text-decoration:none;opacity:.7;transition:opacity var(--t);white-space:nowrap;}
        .nav-links a:hover{opacity:1;}
        .nav-cta{background:var(--navy)!important;color:white!important;opacity:1!important;padding:9px 20px!important;border-radius:100px!important;font-weight:600!important;}
        .nav-cta:hover{background:var(--navy-mid)!important;transform:translateY(-1px);}
        .burger{display:none;flex-direction:column;justify-content:center;gap:5px;background:none;border:none;cursor:pointer;padding:6px;width:36px;height:36px;flex-shrink:0;}
        .burger span{display:block;width:22px;height:2px;background:var(--navy);border-radius:2px;transition:all .3s;transform-origin:center;}
        .burger.open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
        .burger.open span:nth-child(2){opacity:0;transform:scaleX(0);}
        .burger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
        .mmenu{display:none;position:fixed;inset:0;z-index:98;background:var(--cream);padding:84px 24px 32px;flex-direction:column;overflow-y:auto;}
        .mmenu.open{display:flex;}
        .mmenu a{font-size:19px;font-weight:500;color:var(--navy);text-decoration:none;padding:16px 0;border-bottom:1px solid var(--border);display:block;}
        .mmenu-cta{margin-top:24px;background:var(--navy)!important;color:white!important;border-radius:12px!important;text-align:center;padding:18px!important;border-bottom:none!important;font-weight:600!important;}

        .hero{min-height:100svh;background:var(--navy);display:flex;align-items:center;padding:clamp(100px,14vh,150px) clamp(20px,5vw,80px) clamp(60px,10vh,100px);position:relative;overflow:hidden;}
        .hero-glow{position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 75% 35%,rgba(56,189,248,.09),transparent 65%),radial-gradient(ellipse 50% 50% at 15% 75%,rgba(14,165,233,.06),transparent 55%);pointer-events:none;}
        .hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:56px 56px;pointer-events:none;}
        .hero-inner{max-width:1200px;margin:0 auto;width:100%;position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:clamp(40px,6vw,80px);align-items:center;}
        .eyebrow-hero{display:inline-flex;align-items:center;gap:10px;font-family:'DM Mono',monospace;font-size:10px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:var(--sky);margin-bottom:24px;}
        .eyebrow-hero::before{content:'';display:block;width:20px;height:1px;background:var(--sky);flex-shrink:0;}
        h1{font-family:'Playfair Display',serif;font-size:clamp(40px,5.5vw,76px);font-weight:900;color:white;line-height:1.06;letter-spacing:-1.5px;margin-bottom:24px;}
        h1 em{font-style:italic;color:var(--sky);}
        .hero-sub{font-size:clamp(16px,1.6vw,18px);font-weight:300;color:rgba(255,255,255,.62);line-height:1.75;margin-bottom:40px;max-width:480px;}
        .hero-btns{display:flex;flex-wrap:wrap;gap:12px;align-items:center;}
        .btn-p{display:inline-flex;align-items:center;gap:8px;background:var(--sky);color:var(--navy);font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;padding:13px 26px;border-radius:100px;text-decoration:none;border:none;cursor:pointer;transition:background var(--t),transform var(--t),box-shadow var(--t);white-space:nowrap;}
        .btn-p:hover{background:#7DD3FC;transform:translateY(-2px);box-shadow:0 8px 24px rgba(56,189,248,.35);}
        .btn-g{display:inline-flex;align-items:center;gap:8px;background:transparent;color:rgba(255,255,255,.75);font-family:'DM Sans',sans-serif;font-size:15px;font-weight:500;padding:13px 24px;border-radius:100px;border:1px solid rgba(255,255,255,.2);text-decoration:none;cursor:pointer;transition:all var(--t);white-space:nowrap;}
        .btn-g:hover{color:white;border-color:rgba(255,255,255,.5);background:rgba(255,255,255,.06);}

        .feat-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:clamp(24px,3vw,36px);backdrop-filter:blur(8px);}
        .feat-label{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--sky);margin-bottom:16px;}
        .feat-title{font-family:'Playfair Display',serif;font-size:clamp(22px,2.5vw,30px);font-weight:700;color:white;line-height:1.2;margin-bottom:6px;}
        .feat-sub{font-size:14px;color:rgba(255,255,255,.5);margin-bottom:20px;font-style:italic;}
        .feat-badges{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;}
        .badge{display:inline-flex;align-items:center;font-family:'DM Mono',monospace;font-size:10px;font-weight:500;letter-spacing:1px;padding:5px 10px;border-radius:100px;white-space:nowrap;}
        .badge-sky{background:rgba(56,189,248,.15);color:var(--sky);}
        .badge-wh{background:rgba(255,255,255,.08);color:rgba(255,255,255,.55);}
        .feat-list{display:flex;flex-direction:column;gap:10px;margin-bottom:24px;}
        .feat-item{display:flex;align-items:center;gap:10px;font-size:13px;color:rgba(255,255,255,.65);}
        .feat-item::before{content:'✓';display:flex;align-items:center;justify-content:center;width:18px;height:18px;background:rgba(56,189,248,.15);color:var(--sky);border-radius:50%;font-size:10px;font-weight:700;flex-shrink:0;}
        .feat-cta{display:block;text-align:center;background:white;color:var(--navy);font-size:14px;font-weight:600;padding:12px;border-radius:10px;text-decoration:none;transition:background var(--t),transform var(--t);}
        .feat-cta:hover{background:#F0F9FF;transform:translateY(-1px);}

        .trust{background:var(--warm);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:18px clamp(20px,5vw,80px);}
        .trust-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:8px 32px;}
        .trust-item{font-family:'DM Mono',monospace;font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);display:flex;align-items:center;gap:6px;}
        .trust-item::before{content:'✓';color:var(--sky-dark);font-size:11px;}

        .section{padding:clamp(64px,10vw,120px) clamp(20px,5vw,80px);}
        .section-inner{max-width:1200px;margin:0 auto;}
        .eyebrow{display:flex;align-items:center;gap:10px;font-family:'DM Mono',monospace;font-size:10px;font-weight:500;letter-spacing:2.5px;text-transform:uppercase;color:var(--sky-dark);margin-bottom:16px;}
        .eyebrow::before{content:'';display:block;width:20px;height:1px;background:var(--sky-dark);flex-shrink:0;}
        h2{font-family:'Playfair Display',serif;font-size:clamp(32px,4vw,52px);font-weight:900;color:var(--navy);line-height:1.1;letter-spacing:-1px;margin-bottom:16px;}
        h2 em{font-style:italic;color:var(--sky-dark);}
        .sec-sub{font-size:clamp(15px,1.5vw,17px);font-weight:300;color:var(--muted);line-height:1.75;max-width:560px;}

        .tabs{display:flex;gap:8px;flex-wrap:wrap;margin:40px 0 32px;}
        .tab{display:flex;align-items:center;gap:8px;padding:10px 18px;border-radius:100px;border:1.5px solid var(--border);background:white;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;color:var(--muted);cursor:pointer;transition:all var(--t);white-space:nowrap;}
        .tab:hover{border-color:var(--navy-mid);color:var(--navy);}
        .tab.active{background:var(--navy);border-color:var(--navy);color:white;}
        .books-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;}
        .book-card{background:white;border:1.5px solid var(--border);border-radius:var(--radius);padding:28px;transition:border-color var(--t),transform var(--t),box-shadow var(--t);display:flex;flex-direction:column;position:relative;overflow:hidden;}
        .book-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--navy),var(--sky));opacity:0;transition:opacity var(--t);}
        .book-card:hover{border-color:var(--sky-dark);transform:translateY(-4px);box-shadow:var(--shadow-lg);}
        .book-card:hover::before{opacity:1;}
        .book-status{font-family:'DM Mono',monospace;font-size:9px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:14px;}
        .s-yes{color:#059669;}.s-no{color:var(--muted);}
        .book-title{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:var(--navy);line-height:1.2;margin-bottom:6px;}
        .book-sub{font-size:13px;color:var(--muted);font-style:italic;margin-bottom:16px;}
        .book-course{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:1px;color:var(--sky-dark);background:#EFF6FF;padding:6px 10px;border-radius:6px;margin-bottom:20px;display:inline-block;}
        .book-link{margin-top:auto;display:inline-flex;align-items:center;gap:6px;font-size:14px;font-weight:600;color:var(--navy);text-decoration:none;transition:gap var(--t);}
        .book-link:hover{gap:10px;}
        .cs-panel{background:var(--warm);border:1.5px dashed var(--border);border-radius:var(--radius);padding:48px 32px;text-align:center;grid-column:1/-1;}
        .cs-icon{font-size:40px;margin-bottom:16px;}
        .cs-title{font-family:'Playfair Display',serif;font-size:22px;font-weight:700;color:var(--navy);margin-bottom:10px;}
        .cs-body{font-size:15px;color:var(--muted);line-height:1.65;max-width:420px;margin:0 auto 24px;}
        .btn-outline{display:inline-flex;align-items:center;gap:8px;background:transparent;color:var(--navy);font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;padding:11px 22px;border-radius:100px;border:1.5px solid var(--navy);text-decoration:none;cursor:pointer;transition:all var(--t);}
        .btn-outline:hover{background:var(--navy);color:white;}

        .feat-sec{background:var(--navy);}
        .feat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;margin-top:48px;}
        .f-card{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:var(--radius);padding:28px;transition:background var(--t),border-color var(--t);}
        .f-card:hover{background:rgba(255,255,255,.08);border-color:rgba(56,189,248,.3);}
        .f-icon{font-size:28px;margin-bottom:14px;display:block;}
        .f-title{font-size:16px;font-weight:600;color:white;margin-bottom:8px;}
        .f-body{font-size:14px;font-weight:300;color:rgba(255,255,255,.55);line-height:1.7;}

        .cta-sec{background:linear-gradient(135deg,var(--navy-mid),var(--navy));text-align:center;position:relative;overflow:hidden;}
        .cta-sec::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 50% 50%,rgba(56,189,248,.08),transparent);pointer-events:none;}
        .cta-inner{position:relative;z-index:1;}
        .cta-h2{font-family:'Playfair Display',serif;font-size:clamp(30px,4vw,50px);font-weight:900;color:white;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;}
        .cta-h2 em{font-style:italic;color:var(--sky);}
        .cta-sub{font-size:16px;font-weight:300;color:rgba(255,255,255,.6);margin-bottom:36px;max-width:460px;margin-left:auto;margin-right:auto;line-height:1.7;}
        .cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}

        footer{background:#080F1A;padding:clamp(48px,8vw,80px) clamp(20px,5vw,80px) clamp(32px,5vw,48px);}
        .foot-inner{max-width:1200px;margin:0 auto;}
        .foot-top{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:48px;padding-bottom:48px;border-bottom:1px solid rgba(255,255,255,.08);}
        .foot-brand p{font-size:14px;font-weight:300;color:rgba(255,255,255,.4);line-height:1.75;margin-top:14px;max-width:280px;}
        .foot-col-title{font-family:'DM Mono',monospace;font-size:10px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:16px;}
        .foot-links{list-style:none;display:flex;flex-direction:column;gap:10px;}
        .foot-links a{font-size:14px;color:rgba(255,255,255,.5);text-decoration:none;transition:color var(--t);}
        .foot-links a:hover{color:white;}
        .foot-bottom{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
        .foot-copy{font-size:13px;color:rgba(255,255,255,.3);}
        .foot-legal{display:flex;gap:20px;list-style:none;}
        .foot-legal a{font-size:13px;color:rgba(255,255,255,.3);text-decoration:none;transition:color var(--t);}
        .foot-legal a:hover{color:rgba(255,255,255,.65);}

        @media(max-width:900px){
          .hero-inner{grid-template-columns:1fr;}
          .feat-card{display:none;}
          .foot-top{grid-template-columns:1fr 1fr;gap:32px;}
          .foot-brand{grid-column:1/-1;}
        }
        @media(max-width:680px){
          .nav-links{display:none;}
          .burger{display:flex;}
          .foot-top{grid-template-columns:1fr;}
          .foot-brand{grid-column:auto;}
        }
        @media(max-width:400px){
          .hero-btns{flex-direction:column;align-items:stretch;}
          .btn-p,.btn-g{justify-content:center;}
        }

        @keyframes fadeUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
        .eyebrow-hero{animation:fadeUp .6s ease both;}
        h1{animation:fadeUp .6s .1s ease both;}
        .hero-sub{animation:fadeUp .6s .2s ease both;}
        .hero-btns{animation:fadeUp .6s .3s ease both;}
        .feat-card{animation:fadeUp .7s .2s ease both;}
      `}</style>

      <a className="skip" href="#main">Skip to main content</a>

      <header>
        <nav className={`nav${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
          <div className="nav-inner">
            <a href="/" className="logo" aria-label="WriteSpan Press home">
              <span className="logo-top">WriteSpan</span>
              <span className="logo-bottom">Press</span>
            </a>
            <ul className="nav-links" role="list">
              <li><a href="#catalog">Catalog</a></li>
              <li><a href="#features">Why WriteSpan Press</a></li>
              <li><a href="https://assess.writespan.com" target="_blank" rel="noopener noreferrer">Assessment Platform</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/access" className="nav-cta">Access Your Book</a></li>
            </ul>
            <button className={`burger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
              <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
            </button>
          </div>
        </nav>
        <div className={`mmenu${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Navigation menu">
          <nav onClick={() => setMenuOpen(false)}>
            <a href="#catalog">Catalog</a>
            <a href="#features">Why WriteSpan Press</a>
            <a href="https://assess.writespan.com" target="_blank" rel="noopener noreferrer">Assessment Platform</a>
            <a href="/contact">Contact</a>
            <a href="/access" className="mmenu-cta">Access Your Book →</a>
          </nav>
        </div>
      </header>

      <main id="main">

        <section className="hero" aria-label="Hero">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-inner">
            <div>
              <div className="eyebrow-hero" aria-hidden="true">WriteSpan Press</div>
              <h1>Interactive textbooks built for <em>every learner.</em></h1>
              <p className="hero-sub">From college classrooms to homeschool tables — complete, affordable courseware written by educators, not publishers.</p>
              <div className="hero-btns">
                <a href="#catalog" className="btn-p">Browse the Catalog ↓</a>
                <a href="/access" className="btn-g">Access Your Book →</a>
              </div>
            </div>

            <div className="feat-card" aria-label="Featured book">
              <div className="feat-label">New Release</div>
              <div className="feat-title">Writing with Intention</div>
              <div className="feat-sub">Rhetoric, Research, and Voice</div>
              <div className="feat-badges">
                <span className="badge badge-sky">Advanced Composition</span>
                <span className="badge badge-wh">Upper Division Writing</span>
                <span className="badge badge-wh">Rhetoric & Research</span>
              </div>
              <div className="feat-list">
                {['Interactive quizzes and reflection prompts','Embedded videos and reading guides','Three fully scaffolded major assignments','15-assignment bank for instructors','Works in 8-week and 16-week formats'].map(f => (
                  <div className="feat-item" key={f}>{f}</div>
                ))}
              </div>
              <a href="/books/writing-with-authority" className="feat-cta">View This Textbook →</a>
            </div>
          </div>
        </section>

        <div className="trust" role="complementary" aria-label="Standards and accreditation">
          <div className="trust-inner">
            {['WPA Aligned','CCCC Standards','SRTOL Compliant','ACRL Framework','Bookstore Ready','ISBN Registered'].map(t => (
              <span className="trust-item" key={t}>{t}</span>
            ))}
          </div>
        </div>

        <section className="section" id="catalog" aria-labelledby="catalog-h">
          <div className="section-inner">
            <div className="eyebrow">Our Catalog</div>
            <h2 id="catalog-h">Textbooks for every <em>stage of learning.</em></h2>
            <p className="sec-sub">WriteSpan Press publishes across four educational markets. Select a category to explore available titles.</p>
            <div className="tabs" role="tablist" aria-label="Textbook categories">
              {categories.map(cat => (
                <button key={cat.id} role="tab" aria-selected={activeCategory === cat.id} aria-controls={`panel-${cat.id}`}
                  className={`tab${activeCategory === cat.id ? ' active' : ''}`} onClick={() => setActiveCategory(cat.id)}>
                  <span aria-hidden="true">{cat.icon}</span>{cat.label}
                </button>
              ))}
            </div>
            {categories.map(cat => (
              <div key={cat.id} id={`panel-${cat.id}`} role="tabpanel" hidden={activeCategory !== cat.id}>
                {activeCategory === cat.id && (
                  cat.books.length > 0 ? (
                    <div className="books-grid">
                      {cat.books.map(book => (
                        <article className="book-card" key={book.title}>
                          <div className={`book-status ${book.available ? 's-yes' : 's-no'}`}>{book.available ? '● Available Now' : '○ Coming Soon'}</div>
                          <h3 className="book-title">{book.title}</h3>
                          <p className="book-sub">{book.subtitle}</p>
                          <span className="book-course">{book.course}</span>
                          <a href={book.available ? book.href : '/notify'} className="book-link">
                            {book.available ? 'View Textbook' : 'Notify Me'} <span aria-hidden="true">→</span>
                          </a>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="cs-panel" role="status">
                      <div className="cs-icon" aria-hidden="true">{cat.icon}</div>
                      <h3 className="cs-title">{cat.label} — Coming Soon</h3>
                      <p className="cs-body">{cat.description} Titles in this category are currently in development.</p>
                      <a href="/notify" className="btn-outline">Get Notified When Available</a>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="section feat-sec" id="features" aria-labelledby="feat-h">
          <div className="section-inner">
            <div className="eyebrow" style={{color:'var(--sky)'}}>
              <span style={{display:'block',width:'20px',height:'1px',background:'var(--sky)',flexShrink:0}} aria-hidden="true" />
              Why WriteSpan Press
            </div>
            <h2 id="feat-h" style={{color:'white'}}>Courseware that actually <em style={{color:'var(--sky)'}}>works.</em></h2>
            <p className="sec-sub" style={{color:'rgba(255,255,255,.5)'}}>We built what we wished existed — a complete, interactive textbook that respects students and empowers instructors.</p>
            <div className="feat-grid">
              {features.map(f => (
                <div className="f-card" key={f.title}>
                  <span className="f-icon" aria-hidden="true">{f.icon}</span>
                  <h3 className="f-title">{f.title}</h3>
                  <p className="f-body">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section cta-sec" aria-labelledby="cta-h">
          <div className="section-inner cta-inner">
            <h2 className="cta-h2" id="cta-h">Ready to bring <em>Writing with Intention</em><br />to your course?</h2>
            <p className="cta-sub">Request a free instructor desk copy or access your book today. No forms. No wait.</p>
            <div className="cta-btns">
              <a href="/books/writing-with-authority" className="btn-p">View the Textbook →</a>
              <a href="/desk-copy" className="btn-g">Request Desk Copy</a>
            </div>
          </div>
        </section>

      </main>

      <footer role="contentinfo">
        <div className="foot-inner">
          <div className="foot-top">
            <div className="foot-brand">
              <a href="/" className="logo" aria-label="WriteSpan Press home">
                <span className="logo-top" style={{color:'rgba(255,255,255,.4)'}}>WriteSpan</span>
                <span className="logo-bottom" style={{color:'white'}}>Press</span>
              </a>
              <p>An imprint of WriteSpan LLC. Publishing affordable, interactive courseware for college, K–12, homeschooling, and test preparation.</p>
            </div>
            <div>
              <div className="foot-col-title">Catalog</div>
              <ul className="foot-links" role="list">
                <li><a href="#catalog">College & University</a></li>
                <li><a href="#catalog">K–12 Schools</a></li>
                <li><a href="#catalog">Homeschooling</a></li>
                <li><a href="#catalog">Test Preparation</a></li>
              </ul>
            </div>
            <div>
              <div className="foot-col-title">Instructors</div>
              <ul className="foot-links" role="list">
                <li><a href="/desk-copy">Request Desk Copy</a></li>
                <li><a href="/adopt">Adopt a Textbook</a></li>
                <li><a href="/bookstore">Bookstore Info</a></li>
                <li><a href="/contact">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <div className="foot-col-title">WriteSpan</div>
              <ul className="foot-links" role="list">
                <li><a href="https://assess.writespan.com" target="_blank" rel="noopener noreferrer">Assessment Platform</a></li>
                <li><a href="https://nurseprep.writespan.com" target="_blank" rel="noopener noreferrer">NursePrep</a></li>
                <li><a href="/about">About WriteSpan Press</a></li>
                <li><a href="/access">Access Your Book</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <p className="foot-copy">© 2026 WriteSpan LLC. All rights reserved. WriteSpan Press is an imprint of WriteSpan LLC.</p>
            <ul className="foot-legal" role="list">
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}