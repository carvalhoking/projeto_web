// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem("theme") || "light"
    this.init()
  }

  init() {
    this.applyTheme()
    this.bindEvents()
  }

  applyTheme() {
    document.documentElement.setAttribute("data-theme", this.theme)
    localStorage.setItem("theme", this.theme)
  }

  toggleTheme() {
    this.theme = this.theme === "light" ? "dark" : "light"
    this.applyTheme()
  }

  bindEvents() {
    const toggleBtn = document.getElementById("theme-toggle")
    const toggleMobileBtn = document.getElementById("theme-toggle-mobile")

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => this.toggleTheme())
    }

    if (toggleMobileBtn) {
      toggleMobileBtn.addEventListener("click", () => this.toggleTheme())
    }
  }
}

// Mobile Menu Management
class MobileMenu {
  constructor() {
    this.menuBtn = document.getElementById("mobile-menu-btn")
    this.mobileNav = document.getElementById("mobile-nav")
    this.isOpen = false
    this.init()
  }

  init() {
    this.bindEvents()
  }

  toggle() {
    this.isOpen = !this.isOpen
    this.menuBtn.classList.toggle("active", this.isOpen)
    this.mobileNav.classList.toggle("active", this.isOpen)
  }

  close() {
    this.isOpen = false
    this.menuBtn.classList.remove("active")
    this.mobileNav.classList.remove("active")
  }

  bindEvents() {
    if (this.menuBtn) {
      this.menuBtn.addEventListener("click", () => this.toggle())
    }

    // Close menu when clicking on mobile nav links
    const mobileLinks = document.querySelectorAll(".nav-link-mobile")
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => this.close())
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (this.isOpen && !this.menuBtn.contains(e.target) && !this.mobileNav.contains(e.target)) {
        this.close()
      }
    })
  }
}

// Header Scroll Effect
class HeaderScroll {
  constructor() {
    this.header = document.getElementById("header")
    this.init()
  }

  init() {
    this.bindEvents()
  }

  bindEvents() {
    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY > 50
      this.header.classList.toggle("scrolled", scrolled)
    })
  }
}



// Menu Modal Management
class MenuModal {
  constructor() {
    this.modal = document.getElementById("menu-modal")
    this.closeBtn = document.getElementById("close-menu-modal")
    this.menuItems = this.generateMenuItems()
    this.currentCategory = "all"
    this.init()
  }

  init() {
    this.bindEvents()
    this.renderMenuItems()
  }

  generateMenuItems() {
    return [
      // Clássicos
      {
        id: 1,
        name: "WL Grécia",
        description: "Pão Brioche Macio Seladinho, Blend Burger Suculento de 150g, Queijo Derretido Fatiado, Tomates Frescos Fatiados, Alface Americana Crocante e Fresquinha e Para Finalizar Nossa Maionese Verde",
        price: "R$ 19,90",
        category: "classicos",
        image: "img/grecia.png",
      },
      {
        id: 2,
        name: "WL Brasil",
        description: "Pão Brioche Macio Seladinho, Blend Burger Suculento de 150g, Queijo Derretido Fatiado, Bacon Fatiado Defumado na Lenha Frutifera, Tomate Fresco Fatiado, Alface Americana Fresquinha e Crocante e Para Finalizar Nossa Maionese Grill Defumada (Molho da Casa)",
        price: "R$ 25,90",
        category: "classicos",
        image: "img/wl brasil.png",
      },
      {
        id: 3,
        name: "Wl Uruguai - Pcq",
        description: "Pão Brioche Macio Seladinho, Blend Burger Suculento de 150g, Queijo Derretido Fatiado e Para Finalizar Nossa Maionese Grill (Molho da Casa)",
        price: "R$ 19,90",
        category: "classicos",
         image: "img/wl uruguai.png",
        
      },
      {
        id: 4,
        name: "Wl Suzano - Catupiry",
        description: "Pão Brioche Macio Seladinho, Blend Burger Suculento de 150g, Queijo Derretido Fatiado, Catupiry Tirolez, Bacon em Cubos Defumado e Para Finalizar Nossa Maionese Verde",
        price: "R$ 25,90",
        category: "classicos",
        image: "img/wl suzano.png",
      },
      
      {
        id: 5,
        name: "Wl Alemanha - Cheddar Melt",
        description: "Pão Brioche Macio Seladinho, Blend Burger Suculento de 150g, Cheddar Melt da Casa (Receita do Chef) e Bacon Fatiado Defumado",
        price: "24,90",
        category: "classicos",
        image: "img/wl alemanha.png",
      },
      {
        id: 6,
        name: "Wl Qatar - Onion",
        description: "Pão Brioche Macio Seladinho, Blend Burger Suculento de 150g, Queijo Derretido Fatiado, Onion Rings Crocantes e Para Finalizar Nossa Maionese Verde a Base de Alho, Cebola e Salsa",
        price: "21,90",
        category: "classicos",
        image: "img/wl qatar.png",
      },
      {
        id: 7,
        name: "Wl Canadá - Bacon",
        description: "Pão Brioche Macio Seladinho, Blend Burgers Suculento de 150g, Queijo Derretido Fatiado, Bacon Fatiado e Defumado na Lenha Frutifera, e Para Finalizar Nossa Maionese Verde feita a Base de Alho, Cebola e Salsa",
        price: "R$ 22,90",
        category: "classicos",
        image: "img/wl canada.png",
      },

      //Especiais
      {
        id: 8,
        name: "Wl Grand Duplo Suzano",
        description: "Pão Brioche Macio Seladinho, 2x Blend Burger Suculento de 150g, 2x Queijo Derretido Fatiado, 2x Catupiry Tirolez, 2x Bacon em Cubos Defumado e Para Finalizar Nossa Maionese Verde a Base de Alho, Cebola e Salsa",
        price: "R$ 37,90",
        category: "especiais",
        image: "img/wl duplo suzano.png",
      },

      {
        id: 9,
        name: "Wl Grand Duplo Bacon",
        description: "Pão Brioche Macio Seladinho, Dois Blend Burgers Suculento de 150g, Duplo de Queijo Derretido 2x, Duplo de Bacon Fatiado e Defumado na Lenha Frutifera 2x, e Para Finalizar Nossa Maionese Verde feita na base de salsa, alho e cebola + Opção de Transformar em Grand Triplo Bacon",
        price: "R$ 33,90",
        category: "especiais",
        image: "img/wl duplo bacon.png",
      },
      {
        id: 10,
        name: "Wl Grand Duplo Grécia",
        description: "ão Brioche Macio Seladinho, 2x Blend Burger Suculento de 150g, 2x Queijo Derretido Fatiado, Tomates Frescos Fatiados, Alface Americana Crocante e Fresquinha e Para Finalizar Nossa Maionese Verde a Base de Alho, Cebola e Salsa",
        price: "R$ 28,90",
        category: "especiais",
        image: "img/wl duplo grecia.png",
      },
      {
        id: 11,
        name: "Wl Grand Duplo Brasil",
        description: "Pão Brioche Macio Seladinho, 2x Blend Burger Suculento de 150g, 2x Queijo Derretido Fatiado, 2x Bacon Fatiado Defumado na Lenha Frutifera, Tomate Fresco Fatiado, Alface Americana Fresquinha e Crocante e Para Finalizar Nossa Maionese Grill Defumada",
        price: "R$ 36,90",
        category: "especiais",
        image: "img/wl duplo brasil.png",
      },
      {
        id: 12,
        name: "Wl Grand Duplo Uruguai",
        description: "Pão Brioche Macio Seladinho, 2x Blend Burger Suculento de 150g, 2x Queijo Derretido Fatiado e Para Finalizar Nossa Maionese Grill",
        price: "R$ 27,90",
        category: "especiais",
        image: "img/wl duplo uruguai.png",
      },

      // Bebidas
      {
        id: 13,
        name: "Refrigerante Zero Coca Cola 220ml",
        description: "Lata 220ml",
        price: "R$ 6,90",
        category: "bebidas",
        image: "img/coca zero 220ml.png",
      },
      {
        id: 14,
        name: "Refrigerante Coca Cola 220ml",
        description: "lata 450ml",
        price: "R$ 6,90",
        category: "bebidas",
        image: "img/coca 220ml.png",
      },
      {
        id: 15,
        name: "Suco Del Valle Uva 450ml",
        description: "Garrafa 450ml",
        price: "R$ 7,90",
        category: "bebidas",
        image: "img/del valle uva 450 ml.png",
      },
      {
        id: 16,
        name: "Guarana Antarctica 1l",
        description: "Garrafa 1 litro",
        price: "R$ 11,90",
        category: "bebidas",
        image: "img/guarana 1l.png",
    
      },
       {
        id: 16,
        name: "Refrigerante Pepsi 1,5l",
        description: "Garrafa 1,5 litros",
        price: "R$ 16,90",
        category: "bebidas",
        image: "img/pepsi 1,5l.png",
    
      },
       {
        id: 16,
        name: "Suco Del Valle Uva 1,5l",
        description: "Garrafa 1,5 litros",
        price: "R$ 13,90",
        category: "bebidas",
        image: "img/del valle uva 1,5l.png",
    
      },
      // Frango
      {
        id: 13,
        name: "Wl Espanha",
        description: "Pão Brioche Macio e Seladinho, Frango Empanado Sequinho e Crocante, Alface Americana Fresquinha e Maionese Verde da Casa a base de Alho, Cebola e Salsa",
        price: "R$ 19,90",
        category: "frango",
        image: "img/wl espanha.png",
      },
      {
        id: 14,
        name: "Wl Marrocos",
        description: "Pão Brioche Macio e Seladinho, Frango Empanado Sequinho e Crocante, Queijo Derretido Fatiado, Tomates Frescos Fatiados, Alface Americana Crocante e Fresquinha e Para Finalizar Nossa Maionese Verde a Base de Alho, Cebola e Salsa",
        price: "R$ 22,90",
        category: "frango",
        image: "img/wl marrocos.png",
      },
      {
        id: 15,
        name: "Wl China",
        description: "Pão Brioche Macio e Seladinho, Frango Empanado Sequinho e Crocante, Catupiry Tirolez, Bacon em Cubos Defumado, Alface Americana Fresquinha e Crocante e Maionese Verde da Casa a Base de Alho, Cebola e Salsa",
        price: "R$ 24,90",
        category: "frango",
        image: "img/wl china.png",
      },
      {
        id: 16,
        name: "Wl Dubai",
        description: "Pão Brioche Macio Seladinho, Frango Empanado Sequinho e Crocante, Queijo Derretido Fatiado, Bacon Fatiado Defumado na Lenha Frutifera, Tomate Fresco Fatiado, Alface Americana Fresquinha e Crocante e Para Finalizar Nossa Maionese Grill Defumada",
        price: "R$ 26,90",
        category: "frango",
        image: "img/wl dubai.png",
    
      },
        // Acompanhamentos
      {
        id: 13,
        name: "Maionese Verde - 30ml",
        description: "Maionese a base de Alho, Cebola, Salsa",
        price: "R$ 1,99",
        category: "acompanhamentos",
        image: "img/maionese verde.png",
      },
      {
        id: 14,
        name: "Maionese Grill (Molho da Casa!) - 30ml",
        description: "Maionese Grill, levemente defumada com aquele sabor top de churrasco! Esse molho especial vai deixar seu hamburguer e sua batata com gostinho de quero mais!!!",
        price: "R$ 3,90",
        category: "acompanhamentos",
        image: "img/maionese grill.png",
      },
      {
        id: 15,
        name: "10 - Mini Churros de Doce de Leite",
        description: "10 unidades de mini churros de doce de leite, quentinho com açúcar e canela!",
        price: "R$ 16,90",
        category: "acompanhamentos",
        image: "img/churros.png",
      },
      {
        id: 16,
        name: "Batata Frita - Mega",
        description: "500g de Batata Frita Sequinha e Crocante, Serve de 2 á 3 Pessoas!",
        price: "R$ 21,90",
        category: "acompanhamentos",
        image: "img/batata mega.png",
    
      },
      {
        id: 16,
        name: "Batata Frita + Cheddar + Bacon - Mega",
        description: "500g de Batata Frita Mega Sequinha e Crocante Para Dividir, Cheddar Cremoso e Bacon em Cubos Defumado, Serve de 2 á 3 Pessoas!",
        price: "R$ 33,90",
        category: "acompanhamentos",
        image: "img/batata mega cheddar e bacon.png",
    
      },
      {
        id: 16,
        name: "Nuggets - 10 Unidades",
        description: "Peito de Frango Empanado, Sequinho e Crocante",
        price: "R$ 21,90",
        category: "acompanhamentos",
        image: "img/nuggets.png",
    
      },
    ]
  }

  open() {
    this.modal.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  close() {
    this.modal.classList.remove("active")
    document.body.style.overflow = ""
  }

  filterItems(category) {
    this.currentCategory = category

    // Update active category button
    document.querySelectorAll(".category-btn").forEach((btn) => {
      btn.classList.remove("active")
    })
    document.querySelector(`[data-category="${category}"]`).classList.add("active")

    this.renderMenuItems()
  }

  renderMenuItems() {
    const container = document.getElementById("full-menu-items")
    const filteredItems =
      this.currentCategory === "all"
        ? this.menuItems
        : this.menuItems.filter((item) => item.category === this.currentCategory)

    container.innerHTML = filteredItems
	      .map(
	        (item) => `
	            <div class="menu-card accordion-item" data-id="${item.id}">
	                <img src="${item.image}" alt="${item.name}" class="menu-image">
	                <div class="menu-content">
	                    <div class="menu-header">
	                        <h3 class="menu-title">${item.name}</h3>
	                        <span class="menu-price">${item.price}</span>
	                    </div>
	                    <div class="accordion-content">
	                        <p class="menu-description">${item.description}</p>
	                    </div>
	                </div>
	            </div>
	        `,
	      )
      .join("")
  }

  bindEvents() {
    // Open modal buttons
    const openButtons = [
      document.getElementById("ver-cardapio-btn"),
      document.getElementById("menu-completo-btn"),
      document.getElementById("menu-completo-mobile-btn"),
    ]

    openButtons.forEach((btn) => {
      if (btn) {
        btn.addEventListener("click", () => this.open())
      }
    })

    // Close modal
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.close())
    }

	    // Close modal when clicking outside
	    document.addEventListener("click", (e) => {
	      if (e.target === this.modal) {
	        this.close()
	      }
	    })
	
	    // Accordion logic for full menu
	    document.getElementById("full-menu-items").addEventListener("click", (e) => {
	      const card = e.target.closest(".accordion-item")
	      if (card) {
	        const content = card.querySelector(".accordion-content")
	        if (content) {
	          card.classList.toggle("active")
	          if (card.classList.contains("active")) {
	            content.style.maxHeight = content.scrollHeight + "px"
	          } else {
	            content.style.maxHeight = 0
	          }
	        }
	      }
	    })

    // Category filters
    document.querySelectorAll(".category-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-category")
        this.filterItems(category)
      })
    })

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("active")) {
        this.close()
      }
    })
  }
}

// Smooth Scrolling
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = document.getElementById("header").offsetHeight
    const elementPosition = element.offsetTop - headerHeight

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    })
  }
}







// Intersection Observer for Animations
class AnimationObserver {
  constructor() {
    this.observer = new IntersectionObserver((entries) => this.handleIntersection(entries), {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    })
    this.init()
  }

  init() {
    // Wait for DOM to be ready
    setTimeout(() => {
      const elements = document.querySelectorAll(".scroll-animate")
      elements.forEach((el) => this.observer.observe(el))
    }, 100)
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        this.observer.unobserve(entry.target)
      }
    })
  }
}

// Navigation Link Handling
function setupNavigation() {
  const navLinks = document.querySelectorAll('a[href^="#"], .nav-link, .nav-link-mobile')

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const href = link.getAttribute("href")
      if (href && href.startsWith("#")) {
        const sectionId = href.substring(1)
        scrollToSection(sectionId)
      }
    })
  })

  // Footer links
  const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]')
  footerLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const href = link.getAttribute("href")
      if (href && href.startsWith("#")) {
        const sectionId = href.substring(1)
        scrollToSection(sectionId)
      }
    })
  })
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  new ThemeManager()
  new MobileMenu()
  new HeaderScroll()
  
  new MenuModal()
  new AnimationObserver()

  // Setup navigation
  setupNavigation()

  // Set initial styles for animated elements
  const animatedElements = document.querySelectorAll(".scroll-animate")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"
  })
})

// Handle window resize
window.addEventListener("resize", () => {
  // Close mobile menu on resize to desktop
  if (window.innerWidth >= 768) {
    const mobileNav = document.getElementById("mobile-nav")
    const menuBtn = document.getElementById("mobile-menu-btn")

    if (mobileNav && menuBtn) {
      mobileNav.classList.remove("active")
      menuBtn.classList.remove("active")
    }
  }
})