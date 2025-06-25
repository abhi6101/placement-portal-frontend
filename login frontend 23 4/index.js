/* --- ROOT VARIABLES & BASE STYLES --- */
:root {
    --dark-bg: #050816;
    --card-bg: rgba(20, 20, 35, 0.6);
    --primary-accent: #915EFF;
    --secondary-accent: #00CFE8;
    --text-primary: #F1F2F6;
    --text-secondary: #AAA6C3;
    --font-family: 'Poppins', sans-serif;
    --border-color: rgba(255, 255, 255, 0.1);
    --glow-color: rgba(145, 94, 255, 0.5);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    background-color: var(--dark-bg);
    color: var(--text-primary);
    font-family: var(--font-family);
    line-height: 1.6;
    overflow-x: hidden;
    position: relative;
}


/* --- ANIMATED BACKGROUND & SPOTLIGHT --- */
body::before,
body::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: -2;
    filter: blur(150px);
    opacity: 0.15;
    animation: move-gradient 25s infinite alternate ease-in-out;
}

body::before {
    background: radial-gradient(circle at 20% 30%, var(--primary-accent), transparent 40%);
}

body::after {
    background: radial-gradient(circle at 80% 70%, var(--secondary-accent), transparent 40%);
    animation-delay: -12s;
}

@keyframes move-gradient {
    from { transform: translate(-20%, -10%) rotate(0deg); }
    to { transform: translate(10%, 20%) rotate(45deg); }
}

body {
    background-image: radial-gradient(
        circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
        rgba(255, 255, 255, 0.04),
        transparent 20%
    );
    transition: background-position 0.1s ease-out;
}

main, header, footer {
    position: relative;
    z-index: 2;
}


/* --- UTILITY & HIGHLIGHT --- */
.hidden { display: none !important; }
.highlight { color: var(--primary-accent); }


/* --- HEADER & NAVIGATION --- */
.main-header {
    background: rgba(5, 8, 22, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 2rem;
    position: sticky;
    top: 0;
    z-index: 1000;
}

.main-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
}

.logo { font-size: 1.8rem; font-weight: 700; }
.logo span { color: var(--primary-accent); }

.nav-links { display: flex; list-style: none; gap: 1.5rem; }
.nav-links a {
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}
.nav-links a:hover, .nav-links a.active {
    color: var(--text-primary);
    text-shadow: 0 0 10px var(--glow-color);
}

.nav-actions { display: flex; align-items: center; gap: 1rem; }


/* --- BUTTONS --- */
.btn {
    display: inline-flex; align-items: center; justify-content: center;
    gap: 0.5rem; padding: 0.7rem 1.4rem; border-radius: 8px;
    text-decoration: none; font-weight: 600;
    transition: all 0.3s ease; border: 1px solid transparent;
    cursor: pointer; font-size: 0.95rem;
}

.btn-primary {
    background-color: var(--primary-accent);
    color: var(--text-primary);
    border-color: var(--primary-accent);
}
.btn-primary:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 0 30px var(--glow-color);
}

.btn-secondary {
    background-color: transparent;
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
}
.btn-secondary:hover {
    background-color: var(--card-bg);
    color: var(--text-primary);
}

.btn-admin {
    background-color: var(--secondary-accent);
    color: var(--dark-bg);
}


/* --- HERO SECTION --- */
.hero {
    text-align: center;
    padding: 6rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    max-width: 1300px;
    margin: 0 auto;
}

.hero-content > * { animation: slideInUp 0.8s backwards; }

.hero-text { text-align: left; }

.hero-text h1 {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    text-shadow: 0 0 20px rgba(145, 94, 255, 0.3);
}

.hero-text p {
    font-size: 1.1rem;
    color: var(--text-secondary);
    margin-bottom: 2.5rem;
    max-width: 500px;
    animation-delay: 0.2s;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
    animation-delay: 0.4s;
}

@keyframes slideInUp {
    from { opacity: 0; transform: translateY(50px); }
    to { opacity: 1; transform: translateY(0); }
}


/* --- SECTIONS & INTERACTIVE CARDS --- */
.features, .stats, .testimonials { padding: 6rem 2rem; }

.section-header {
    text-align: center; margin-bottom: 3rem;
    max-width: 700px; margin-left: auto; margin-right: auto;
}
.section-header h2 { font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem; }
.section-header p { color: var(--text-secondary); font-size: 1.1rem; }

.features-grid, .testimonial-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.features-box, .testimonial-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 2.5rem;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
    transform-style: preserve-3d;
}

.features-box .inner-glow, .testimonial-card .inner-glow {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    border-radius: 16px; opacity: 0; transition: opacity 0.4s ease;
    background: radial-gradient(circle at var(--mouse-card-x, 50%) var(--mouse-card-y, 50%),
                 var(--primary-accent), transparent 40%);
}

.features-box:hover, .testimonial-card:hover {
    border-color: rgba(145, 94, 255, 0.5);
    box-shadow: 0 10px 40px rgba(145, 94, 255, 0.1);
}

.features-box:hover .inner-glow, .testimonial-card:hover .inner-glow { opacity: 0.1; }

.features-box > *, .testimonial-card > * {
    position: relative;
    z-index: 1;
    transform: translateZ(20px);
}

.features-box { text-align: center; }
.features-box i { font-size: 2.5rem; color: var(--primary-accent); margin-bottom: 1.5rem; }
.features-box h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }

.testimonial-card { text-align: left; }
.testimonial-card p { color: var(--text-secondary); font-style: italic; }

.testimonial-author { display: flex; align-items: center; gap: 1rem; margin-top: 1.5rem; }
.testimonial-author img {
    width: 50px; height: 50px; border-radius: 50%; object-fit: cover;
    border: 2px solid var(--primary-accent);
}
.author-info h4 { color: var(--text-primary); margin-bottom: 0; font-size: 1.1rem; }
.author-info p { font-style: normal; font-size: 0.9rem; color: var(--text-secondary); margin: 0; }

.stats-container {
    max-width: 1200px; margin: 0 auto; display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem; text-align: center;
}
.stat-item h3 { font-size: 3rem; color: var(--primary-accent); font-weight: 700; }
.stat-item p { font-size: 1.1rem; color: var(--text-secondary); }


/* --- FOOTER --- */
footer {
    background: linear-gradient(180deg, rgba(5, 8, 22, 0) 0%, rgba(5, 8, 22, 1) 100%);
    border-top: 1px solid var(--border-color);
    color: var(--text-secondary);
    text-align: center;
    padding: 6rem 2rem 2rem;
}

.footer-content {
    max-width: 1200px; margin: 0 auto 3rem auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2rem; text-align: left;
    padding-bottom: 3rem;
    border-bottom: 1px solid var(--border-color);
}

.footer-column h3 { color: var(--primary-accent); margin-bottom: 1.5rem; }
.footer-column ul { list-style: none; }
.footer-column li { margin-bottom: 1rem; }
.footer-column a { color: var(--text-secondary); text-decoration: none; transition: all 0.3s ease; }
.footer-column a:hover { color: var(--text-primary); padding-left: 5px; }

.social-links { display: flex; gap: 1rem; }
.social-links a {
    color: var(--dark-bg); background: var(--text-secondary);
    width: 45px; height: 45px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.3s ease; font-size: 1.2rem;
}
.social-links a:hover {
    background: var(--primary-accent);
    color: var(--text-primary);
    transform: translateY(-5px);
}

footer .heart { color: #e25555; animation: pulse 1.5s infinite; }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }


/* --- ANIMATIONS & MEDIA QUERIES --- */
.fade-in { opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
.fade-in.is-visible { opacity: 1; transform: translateY(0); }
.features-grid.is-visible .features-box:nth-child(2), .testimonial-cards.is-visible .testimonial-card:nth-child(2) { transition-delay: 0.2s; }
.features-grid.is-visible .features-box:nth-child(3), .testimonial-cards.is-visible .testimonial-card:nth-child(3) { transition-delay: 0.4s; }

@media (max-width: 1024px) {
    .hero-content {
        grid-template-columns: 1fr;
        gap: 3rem;
    }
    .hero-text {
        text-align: center;
        order: 1;
    }
    .hero-image-mockup {
        order: 2;
    }
    .hero-buttons {
        justify-content: center;
    }
    .hero-text p {
        margin-left: auto;
        margin-right: auto;
    }
}

@media (max-width: 768px) {
    .nav-links {
        display: none;
    }
    .main-nav {
        flex-wrap: wrap;
    }
    .nav-actions {
        flex-grow: 1;
        justify-content: flex-end;
    }
    .hero-text h1 {
        font-size: 2.5rem;
    }
    .section-header h2 {
        font-size: 2rem;
    }
    .footer-content {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 480px) {
    .hero-text h1 {
        font-size: 2.2rem;
    }
    .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
    }
    .footer-column ul {
        padding: 0;
    }
    .social-links {
        justify-content: center;
    }
}