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

// Menu Carousel Management
class MenuCarousel {
  constructor() {
    this.currentSlide = 0
    this.totalSlides = 3
    this.isAutoPlaying = true
    this.autoPlayInterval = null
    this.init()
  }

  init() {
    this.bindEvents()
    this.startAutoPlay()
  }

  goToSlide(index) {
    this.currentSlide = index
    this.updateCarousel()
    this.updateDots()
    this.resetAutoPlay()
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides
    this.updateCarousel()
    this.updateDots()
    this.resetAutoPlay()
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides
    this.updateCarousel()
    this.updateDots()
    this.resetAutoPlay()
  }

  updateCarousel() {
    const track = document.getElementById("carousel-track")
    if (track) {
      track.style.transform = `translateX(-${this.currentSlide * 100}%)`
    }
  }

  updateDots() {
    const dots = document.querySelectorAll(".dot")
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlide)
    })
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide()
    }, 4000)
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval)
      this.autoPlayInterval = null
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay()
    setTimeout(() => {
      this.startAutoPlay()
    }, 2000)
  }

  bindEvents() {
    const prevBtn = document.getElementById("carousel-prev")
    const nextBtn = document.getElementById("carousel-next")

    if (prevBtn) {
      prevBtn.addEventListener("click", () => this.prevSlide())
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => this.nextSlide())
    }

    // Pause autoplay on hover
    const carousel = document.querySelector(".menu-carousel")
    if (carousel) {
      carousel.addEventListener("mouseenter", () => this.stopAutoPlay())
      carousel.addEventListener("mouseleave", () => this.startAutoPlay())
    }
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
      
      // Especiais
      {
        id: 5,
        name: "Wl Alemanha - Cheddar Melt",
        description: "Pão Brioche Macio Seladinho, Blend Burger Suculento de 150g, Cheddar Melt da Casa (Receita do Chef) e Bacon Fatiado Defumado",
        price: "24,90",
        category: "especiais",
        image: "img/wl alemanha.png",
      },
      {
        id: 6,
        name: "Wl Qatar - Onion",
        description: "Pão Brioche Macio Seladinho, Blend Burger Suculento de 150g, Queijo Derretido Fatiado, Onion Rings Crocantes e Para Finalizar Nossa Maionese Verde a Base de Alho, Cebola e Salsa",
        price: "21,90",
        category: "especiais",
        image: "img/wl qatar.png",
      },
      {
        id: 7,
        name: "Wl Canadá - Bacon",
        description: "Pão Brioche Macio Seladinho, Blend Burgers Suculento de 150g, Queijo Derretido Fatiado, Bacon Fatiado e Defumado na Lenha Frutifera, e Para Finalizar Nossa Maionese Verde feita a Base de Alho, Cebola e Salsa",
        price: "R$ 22,90",
        category: "especiais",
        image: "img/wl canada.png",
      },
      {
        id: 8,
        name: "Bacon Master",
        description: "180g, bacon crocante duplo, queijo cheddar duplo, molho barbecue",
        price: "R$ 32,90",
        category: "especiais",
        image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop&crop=center",
      },

      // Acompanhamentos
      {
        id: 9,
        name: "Batata Frita Tradicional",
        description: "Batatas cortadas na casa, temperadas com sal e ervas",
        price: "R$ 12,90",
        category: "acompanhamentos",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&crop=center",
      },
      {
        id: 10,
        name: "Batata Rústica",
        description: "Batatas rústicas com casca, temperadas com alecrim",
        price: "R$ 14,90",
        category: "acompanhamentos",
        image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=400&h=300&fit=crop&crop=center",
      },
      {
        id: 11,
        name: "Onion Rings",
        description: "Anéis de cebola empanados, servidos com molho ranch",
        price: "R$ 16,90",
        category: "acompanhamentos",
        image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop&crop=center",
      },
      {
        id: 12,
        name: "Nuggets Artesanais",
        description: "8 unidades de nuggets de frango com molho à escolha",
        price: "R$ 18,90",
        category: "acompanhamentos",
        image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&crop=center",
      },

      // Bebidas
      {
        id: 13,
        name: "Refrigerante Lata",
        description: "Coca-Cola, Guaraná, Fanta ou Sprite - 350ml",
        price: "R$ 5,90",
        category: "bebidas",
        image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=300&fit=crop&crop=center",
      },
      {
        id: 14,
        name: "Suco Natural",
        description: "Laranja, limão, maracujá ou acerola - 400ml",
        price: "R$ 8,90",
        category: "bebidas",
        image: "https://images.unsplash.com/photo-1560963905-6c7ad14759e8?w=400&h=300&fit=crop&crop=center",
      },
      {
        id: 15,
        name: "Milkshake",
        description: "Chocolate, morango, baunilha ou Ovomaltine - 400ml",
        price: "R$ 12,90",
        category: "bebidas",
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop&crop=center",
      },
      {
        id: 16,
        name: "Água Mineral",
        description: "Água mineral sem gás - 500ml",
        price: "R$ 3,90",
        category: "bebidas",
        image: "https://images.unsplash.com/photo-1527752037403-d28eb2873e4a?w=400&h=300&fit=crop&crop=center",
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
            <div class="menu-card">
                <img src="${item.image}" alt="${item.name}" class="menu-image">
                <div class="menu-content">
                    <h3 class="menu-title">${item.name}</h3>
                    <p class="menu-description">${item.description}</p>
                    <div class="menu-footer">
                        <span class="menu-price">${item.price}</span>
                        <button class="btn btn-primary btn-small" onclick="orderItem('${item.name}', '${item.price}')">Pedir</button>
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
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.close()
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

// WhatsApp Integration
function openWhatsApp() {
  const message = encodeURIComponent("Olá! Gostaria de fazer um pedido na World Lovers.")
  const whatsappUrl = `https://wa.me/5511941372452?text=${message}`
  window.open(whatsappUrl, "_blank")
}

// Order Item Function
function orderItem(itemName, itemPrice) {
  const message = encodeURIComponent(`Olá! Gostaria de pedir um ${itemName} - ${itemPrice}`)
  const whatsappUrl = `https://wa.me/5511941372452?text=${message}`
  window.open(whatsappUrl, "_blank")
}

// Carousel Navigation Functions
function goToSlide(index) {
  if (window.menuCarousel) {
    window.menuCarousel.goToSlide(index)
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
  window.menuCarousel = new MenuCarousel()
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