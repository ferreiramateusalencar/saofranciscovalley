// main.js — lógica central do site (usa `window.STARTUPS` definido em data/startups.js)
const CATEGORIES = ['All','Agro','Health','Tech','Education','Creative Economy','Impact'];

const app = document.getElementById('app');
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

if (navToggle && navLinksEl) {
  navToggle.addEventListener('click', () => {
    navLinksEl.style.display = navLinksEl.style.display === 'flex' ? 'none' : 'flex';
  });

  // Fecha o menu móvel ao clicar em um link
  navLinksEl.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && window.innerWidth < 700) navLinksEl.style.display = 'none';
  });
}

function route() {
  const path = location.pathname || '';
  const hash = location.hash || '';

  if (path.endsWith('catalogo.html') || hash.startsWith('#/catalogo')) {
    renderCatalog();
    return;
  }

  renderHome();

  if (hash && hash.includes('#')) {
    const parts = hash.split('#');
    if (parts.length > 1) {
      const id = parts[1].replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Home rendering */
function renderHome(){
  app.innerHTML = `
    <section class="hero fade-in">
      <div class="hero-left">
        <div class="badge"> 
          <span class="pulse" style="display:inline-block;width:8px;height:8px;background:var(--sfv-cyan);border-radius:999px;margin-right:8px;"></span>
          Impulsionando o Futuro do Vale
        </div>
        <h1>Onde a Inovação Encontra o <span style="color:var(--sfv-navy);">Sertão</span>.</h1>
        <p>Somos o principal hub de startups e empreendedorismo do Vale do São Francisco. Conectamos talento regional a oportunidades globais.</p>
        <div class="buttons">
          <button class="btn primary" id="joinBtn">Quero Participar <span class="arrow">→</span></button>
          <a class="btn secondary" href="catalogo.html">Ver Startups</a>
        </div>
        <div style="margin-top:18px;display:flex;align-items:center;gap:12px">
          <div style="display:flex;gap:-8px">
            <img src="https://picsum.photos/seed/11/100/100" alt="m" style="width:40px;height:40px;border-radius:999px;border:3px solid #fff;object-fit:cover" />
            <img src="https://picsum.photos/seed/12/100/100" alt="m" style="width:40px;height:40px;border-radius:999px;border:3px solid #fff;object-fit:cover" />
            <img src="https://picsum.photos/seed/13/100/100" alt="m" style="width:40px;height:40px;border-radius:999px;border:3px solid #fff;object-fit:cover" />
          </div>
          <div style="font-size:14px;color:var(--muted)"><strong style="color:#0f172a">+50 Startups</strong> já fazem parte</div>
        </div>
      </div>

      <div class="hero-image">
        <div class="decor-blob blob-1"></div>
        <div class="decor-blob blob-2"></div>
        <div class="hero-image-inner">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=900" alt="Inovação" />
          <div class="hero-overlay"></div>
          <div style="position:absolute;bottom:24px;left:24px;right:24px;color:#fff">
            <p style="font-size:18px;font-weight:600">"A infraestrutura social que o ecossistema do Vale precisava para crescer."</p>
          </div>
        </div>
      </div>
    </section>

    <section id="sobre" class="section light fade-in">
      <div class="container">
        <div style="text-align:center;max-width:760px;margin:0 auto 24px">
          <h2 style="font-size:14px;color:var(--sfv-cyan);letter-spacing:0.15em;text-transform:uppercase;font-weight:800">O Desafio</h2>
          <h3 style="font-size:28px;margin:12px 0 8px">Unindo o ecossistema fragmentado</h3>
          <p style="color:var(--muted)">O Vale do São Francisco possui potencial intelectual gigante, mas enfrentava desafios estruturais como a falta de capacitação e escassez de ambientes colaborativos.</p>
        </div>
        <div class="features">
          <div class="feature-card">
            <div class="feature-icon">💬</div>
            <h3>Hub Comunitário</h3>
            <p>Um ponto centralizado para mentoria, eventos e suporte prático a empreendedores em fase inicial.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📈</div>
            <h3>Desenvolvimento Regional</h3>
            <p>Fortalecemos a retenção de talentos e o aproveitamento do potencial inovador do interior.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🌱</div>
            <h3>Impacto Sustentável</h3>
            <p>Soluções alinhadas às vocações do Vale, gerando trabalho, renda e inovação resiliente.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="solucoes" class="section alt fade-in">
      <div class="container" style="display:grid;grid-template-columns:1fr 420px;gap:28px;align-items:start">
        <div>
          <h2 style="font-size:34px;margin:0 0 16px;color:#08102b;font-weight:900">Mais que uma comunidade, <br/>uma infraestrutura social.</h2>
          <p style="color:var(--muted)">Articulamos parcerias, oferecemos capacitação e conexão com mercado para ampliar o impacto do ecossistema.</p>
        </div>
        <div class="card" style="padding:20px;border-radius:28px">
          <div style="background:var(--sfv-gold);color:#071029;padding:8px 12px;border-radius:10px;display:inline-block;font-weight:800;transform:rotate(12deg);margin-top:-24px;box-shadow:0 8px 20px rgba(0,0,0,0.06)">Join the Valley!</div>
          <h3 style="margin:18px 0 8px;color:var(--sfv-navy)">Pronto para inovar conosco?</h3>
          <form class="join-form" id="joinForm">
            <label style="display:block;font-size:12px;font-weight:800;color:var(--muted);margin-bottom:6px">Nome Completo</label>
            <input required name="name" style="width:100%;padding:12px;border-radius:12px;border:1px solid #eef2f7;margin-bottom:10px" />
            <label style="display:block;font-size:12px;font-weight:800;color:var(--muted);margin-bottom:6px">Seu E-mail</label>
            <input type="email" required name="email" style="width:100%;padding:12px;border-radius:12px;border:1px solid #eef2f7;margin-bottom:10px" />
            <label style="display:block;font-size:12px;font-weight:800;color:var(--muted);margin-bottom:6px">Área de Interesse</label>
            <select name="area" style="width:100%;padding:12px;border-radius:12px;border:1px solid #eef2f7;margin-bottom:10px">
              <option>Startup (Fundador)</option>
              <option>Investidor / Mentor</option>
              <option>Academia / Pesquisador</option>
              <option>Parceiro Institucional</option>
            </select>
            <button class="btn primary" type="submit" style="width:100%">Cadastrar na Comunidade</button>
          </form>
        </div>
      </div>
    </section>

    <section class="section light fade-in">
      <div class="container" style="text-align:center">
        <h2 style="font-size:28px;margin-bottom:20px">Alinhados com o Futuro</h2>
        <div style="display:flex;gap:22px;justify-content:center;flex-wrap:wrap">
          <div style="max-width:200px;text-align:center">
            <div style="width:88px;height:88px;background:#2563eb;color:#fff;display:flex;align-items:center;justify-content:center;border-radius:12px;margin:0 auto 10px;font-weight:900;font-size:28px">4</div>
            <p style="font-weight:700">Educação de Qualidade</p>
          </div>
          <div style="max-width:200px;text-align:center">
            <div style="width:88px;height:88px;background:#dc2626;color:#fff;display:flex;align-items:center;justify-content:center;border-radius:12px;margin:0 auto 10px;font-weight:900;font-size:28px">8</div>
            <p style="font-weight:700">Trabalho Decente e Crescimento</p>
          </div>
          <div style="max-width:200px;text-align:center">
            <div style="width:88px;height:88px;background:#f97316;color:#fff;display:flex;align-items:center;justify-content:center;border-radius:12px;margin:0 auto 10px;font-weight:900;font-size:28px">9</div>
            <p style="font-weight:700">Indústria, Inovação e Infra</p>
          </div>
        </div>
      </div>
    </section>
  `;

  const joinForm = document.getElementById('joinForm');
  if(joinForm) joinForm.addEventListener('submit', (e)=>{ e.preventDefault(); alert('Obrigado! Formulário enviado (simulado).'); });
}

/* Catalog rendering */
function renderCatalog(){
  // usa window.STARTUPS
  const STARTUPS = window.STARTUPS || [];

  app.innerHTML = `
    <section class="section light">
      <div class="catalog-toolbar">
        <div>
          <h1>Startups da Comunidade</h1>
          <p>Explore o ecossistema de inovação do Vale do São Francisco.</p>
        </div>
        <div>
          <div class="categories" id="categories"></div>
          <div class="search"><input id="searchInput" placeholder="Pesquisar startups..." /></div>
        </div>
      </div>

      <div id="startupList" class="grid"></div>

      <div id="emptyState" style="display:none;margin-top:20px;text-align:center;" class="card">
        <h3>Ops! Nenhuma startup por aqui.</h3>
        <p>Tente mudar os termos da pesquisa.</p>
        <button id="clearFilters" class="btn" style="margin-top:12px">Limpar filtros</button>
      </div>

    </section>

    <section class="section alt">
      <div style="text-align:center;max-width:800px;margin:0 auto">
        <h2>Sua startup também é do Vale?</h2>
        <p>Junte-se a dezenas de empreendedores e ganhe visibilidade, conexões e suporte.</p>
        <button class="btn primary">Cadastrar Minha Startup</button>
      </div>
    </section>
  `;

  // montar categorias
  const categoriesEl = document.getElementById('categories');
  let selectedCategory = 'All';
  const createCatButtons = () => {
    categoriesEl.innerHTML = '';
    CATEGORIES.forEach(cat => {
      const b = document.createElement('button');
      b.className = 'cat-btn' + (cat===selectedCategory? ' active':'');
      b.textContent = cat==='All' ? 'Todas' : cat;
      b.addEventListener('click', ()=>{ selectedCategory = cat; createCatButtons(); renderStartups(); });
      categoriesEl.appendChild(b);
    });
  }
  createCatButtons();

  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', renderStartups);

  document.getElementById('clearFilters').addEventListener('click', ()=>{ selectedCategory='All'; searchInput.value=''; createCatButtons(); renderStartups(); });

  function renderStartups(){
    const q = searchInput.value.trim().toLowerCase();
    const listEl = document.getElementById('startupList');
    const filtered = STARTUPS.filter(s => (selectedCategory==='All' || s.category===selectedCategory) && (s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)));
    listEl.innerHTML = '';
    if(filtered.length===0) document.getElementById('emptyState').style.display='block'; else document.getElementById('emptyState').style.display='none';

    filtered.forEach(s => {
      const card = document.createElement('div'); card.className='card-startup';
      card.innerHTML = `
        <img src="${s.logo}" alt="${s.name}"/>
        <div class="info">
          <h4>${s.name}</h4>
          <p>${s.description}</p>
        </div>
        <div class="startup-actions"><a href="${s.website}">Conhecer Startup</a></div>
      `;
      listEl.appendChild(card);
    });
  }
  renderStartups();
}

window.addEventListener('hashchange', route);
window.addEventListener('load', route);