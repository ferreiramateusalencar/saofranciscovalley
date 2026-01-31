// main.js — lógica central do site (usa `window.STARTUPS` definido em data/startups.js)
const CATEGORIES = ['All', 'Agritech', 'Automotivo', 'Empresa Jr', 'Healthtech', 'Sustentabilidade']
const app = document.getElementById('app')
const navToggle = document.getElementById('navToggle')
const navLinksEl = document.getElementById('navLinks')

if (navToggle && navLinksEl) {
    navToggle.addEventListener('click', () => {
        navLinksEl.style.display = navLinksEl.style.display === 'flex' ? 'none' : 'flex'
    })

    // Fecha o menu móvel ao clicar em um link
    navLinksEl.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && window.innerWidth < 700) navLinksEl.style.display = 'none'
    })
}

function route() {
    const path = location.pathname || ''
    const hash = location.hash || ''

    if (path.endsWith('catalogo.html') || hash.startsWith('#/catalogo')) {
        renderCatalog()
        return
    }

    renderHome()

    if (hash && hash.includes('#')) {
        const parts = hash.split('#')
        if (parts.length > 1) {
            const id = parts[1].replace('#', '')
            const el = document.getElementById(id)
            if (el) el.scrollIntoView({ behavior: 'smooth' })
            return
        }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
}

function renderHome() {
    const joinForm = document.getElementById('joinForm')
    if (joinForm && !joinForm.dataset.listenerAttached) {
        joinForm.addEventListener('submit', (e) => {
            e.preventDefault()
            alert('Obrigado! Formulário enviado (simulado).')
        })
        joinForm.dataset.listenerAttached = '1'
    }
}

/* Catalog rendering */
function renderCatalog() {
    // usa window.STARTUPS
    const STARTUPS = window.STARTUPS || []

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

      <div id="emptyState" class="card empty-state hidden">
        <h3>Ops! Nenhuma startup por aqui.</h3>
        <p>Tente mudar os termos da pesquisa.</p>
        <button id="clearFilters" class="btn mt-12">Limpar filtros</button>
      </div>

    </section>

    <section class="section alt">
      <div class="center-container">
        <h2>Sua startup também é do Vale?</h2>
        <p>Junte-se a dezenas de empreendedores e ganhe visibilidade, conexões e suporte.</p>
        <a href="https://forms.gle/Xq84XEqnNbk1UeqX6" target="_blank" rel="noopener noreferrer"><button class="btn primary">Cadastrar Minha Startup</button></a>
      </div>
    </section>
  `

    // montar categorias
    const categoriesEl = document.getElementById('categories')
    let selectedCategory = 'All'
    const createCatButtons = () => {
        categoriesEl.innerHTML = ''
        CATEGORIES.forEach((cat) => {
            const b = document.createElement('button')
            b.className = 'cat-btn' + (cat === selectedCategory ? ' active' : '')
            b.textContent = cat === 'All' ? 'Todas' : cat
            b.addEventListener('click', () => {
                selectedCategory = cat
                createCatButtons()
                renderStartups()
            })
            categoriesEl.appendChild(b)
        })
    }
    createCatButtons()

    const searchInput = document.getElementById('searchInput')
    searchInput.addEventListener('input', renderStartups)

    document.getElementById('clearFilters').addEventListener('click', () => {
        selectedCategory = 'All'
        searchInput.value = ''
        createCatButtons()
        renderStartups()
    })

    function renderStartups() {
        const q = searchInput.value.trim().toLowerCase()
        const listEl = document.getElementById('startupList')
        const filtered = STARTUPS.filter(
            (s) =>
                (selectedCategory === 'All' || s.category === selectedCategory) &&
                (s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
        )
        listEl.innerHTML = ''
        if (filtered.length === 0) document.getElementById('emptyState').style.display = 'block'
        else document.getElementById('emptyState').style.display = 'none'

        filtered.forEach((s) => {
            const card = document.createElement('div')
            card.className = 'card-startup'
            card.innerHTML = `
        <img src="${s.logo}" alt="${s.name}"/>
        <div class="info">
          <h4>${s.name}</h4>
          <p>${s.description}</p>
        </div>
        <div class="startup-actions"><a href="${s.website || '#'}" target="_blank" rel="noopener noreferrer">Conhecer Startup</a></div>
      `
            listEl.appendChild(card)
        })
    }
    renderStartups()
}

window.addEventListener('hashchange', route)
window.addEventListener('load', route)
