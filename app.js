// E-commerce T ONZE - JavaScript Application
class EcommerceApp {
    constructor() {
        this.currentPage = 'home';
        this.cart = [];
        this.favorites = [];
        this.currentProduct = null;
        this.currentCategory = null;
        this.products = this.initializeProducts();
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCartCount();
        this.updateFavoritesCount();
        this.loadFeaturedProducts();
        this.showPage('home');
    }

    initializeProducts() {
        return {
            bones: [
                {
                    id: 1,
                    nome: "Boné T ONZE Classic",
                    preco: 89.90,
                    cor: "Preto",
                    descricao: "Boné clássico com logo bordado T ONZE. Perfeito para aventuras urbanas e trilhas. Feito com materiais de alta qualidade e ajuste confortável.",
                    tamanhos: ["Único"],
                    categoria: "bones",
                    destaque: true
                },
                {
                    id: 2,
                    nome: "Boné Túnel Adventure",
                    preco: 94.90,
                    cor: "Azul Marinho",
                    descricao: "Inspirado na jornada pelo Túnel 11. Para quem busca liberdade e estilo. Design exclusivo que representa nossa essência.",
                    tamanhos: ["Único"],
                    categoria: "bones",
                    destaque: true
                },
                {
                    id: 3,
                    nome: "Boné Mountain Spirit",
                    preco: 92.90,
                    cor: "Cinza",
                    descricao: "Carregue o espírito das montanhas onde quer que vá. Ideal para quem vive intensamente cada momento.",
                    tamanhos: ["Único"],
                    categoria: "bones",
                    destaque: false
                },
                {
                    id: 4,
                    nome: "Boné Route Eleven",
                    preco: 89.90,
                    cor: "Branco",
                    descricao: "Homenagem à rota 11 que inspirou nossa marca. Símbolo de liberdade e aventura.",
                    tamanhos: ["Único"],
                    categoria: "bones",
                    destaque: false
                }
            ],
            camisetas: [
                {
                    id: 5,
                    nome: "Camiseta Freedom Road",
                    preco: 79.90,
                    cor: "Preta",
                    descricao: "Para quem escolhe o caminho da liberdade em cada decisão. Tecido premium e corte moderno.",
                    tamanhos: ["P", "M", "G", "GG"],
                    categoria: "camisetas",
                    destaque: true
                },
                {
                    id: 6,
                    nome: "Camiseta Tunnel Vision",
                    preco: 74.90,
                    cor: "Branca",
                    descricao: "Visão focada no que realmente importa: viver com propósito. Design minimalista e confortável.",
                    tamanhos: ["P", "M", "G", "GG"],
                    categoria: "camisetas",
                    destaque: true
                },
                {
                    id: 7,
                    nome: "Camiseta Adventure Call",
                    preco: 79.90,
                    cor: "Cinza",
                    descricao: "Para quem atende o chamado da aventura sem hesitar. Qualidade excepcional e durabilidade.",
                    tamanhos: ["P", "M", "G", "GG"],
                    categoria: "camisetas",
                    destaque: false
                },
                {
                    id: 8,
                    nome: "Camiseta Liberty Path",
                    preco: 77.90,
                    cor: "Azul",
                    descricao: "O caminho da liberdade é único para cada pessoa. Vista essa filosofia de vida.",
                    tamanhos: ["P", "M", "G", "GG"],
                    categoria: "camisetas",
                    destaque: false
                }
            ]
        };
    }

    getAllProducts() {
        return [...this.products.bones, ...this.products.camisetas];
    }

    getProductById(id) {
        return this.getAllProducts().find(product => product.id === parseInt(id));
    }

    setupEventListeners() {
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                const category = link.getAttribute('data-category');
                
                if (page === 'products' && category) {
                    this.currentCategory = category;
                }
                
                this.showPage(page);
            });
        });

        // Other page navigation buttons
        document.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-page')) {
                e.preventDefault();
                const page = e.target.getAttribute('data-page');
                const category = e.target.getAttribute('data-category');
                
                if (page === 'products' && category) {
                    this.currentCategory = category;
                }
                
                this.showPage(page);
            }
        });

        // Search functionality
        const searchBtn = document.getElementById('searchBtn');
        const searchInput = document.getElementById('searchInput');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.performSearch());
        }
        
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }

        // Cart button
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) {
            cartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showPage('cart');
            });
        }

        // Login modal
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showModal('loginModal');
            });
        }

        // Modal close functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal__close') || e.target.classList.contains('modal__overlay')) {
                this.hideModal();
            }
        });

        // Prevent modal from closing when clicking inside content
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal__content')) {
                e.stopPropagation();
            }
        });

        // Product filters
        const categoryFilter = document.getElementById('categoryFilter');
        const sortFilter = document.getElementById('sortFilter');
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => this.filterProducts());
        }
        
        if (sortFilter) {
            sortFilter.addEventListener('change', () => this.filterProducts());
        }

        // Newsletter form
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubmit(e);
            });
        }

        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmit(e);
            });
        }

        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLoginSubmit(e);
            });
        }

        // Checkout form
        const checkoutForm = document.getElementById('checkoutForm');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleCheckoutSubmit(e);
            });
        }

        // Shipping calculator
        const calculateShipping = document.getElementById('calculateShipping');
        if (calculateShipping) {
            calculateShipping.addEventListener('click', () => this.calculateShipping());
        }

        // Checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (this.cart.length === 0) {
                    alert('Seu carrinho está vazio!');
                    return;
                }
                this.showPage('checkout');
            });
        }
    }

    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.add('hidden');
        });

        // Show selected page
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.classList.remove('hidden');
            this.currentPage = pageId;

            // Load page-specific content
            this.loadPageContent(pageId);
        }
    }

    loadPageContent(pageId) {
        switch (pageId) {
            case 'products':
                this.loadProducts();
                break;
            case 'cart':
                this.loadCart();
                break;
            case 'checkout':
                this.loadCheckout();
                break;
        }
    }

    loadFeaturedProducts() {
        const grid = document.getElementById('featuredProductsGrid');
        if (!grid) return;

        const featuredProducts = this.getAllProducts().filter(product => product.destaque);
        grid.innerHTML = featuredProducts.map(product => this.createProductCard(product)).join('');
        
        this.setupProductCardListeners();
    }

    loadProducts() {
        const grid = document.getElementById('productsGrid');
        const title = document.getElementById('productsTitle');
        if (!grid) return;

        let products = this.getAllProducts();
        
        // Filter by category if specified
        if (this.currentCategory) {
            products = products.filter(product => product.categoria === this.currentCategory);
            if (title) {
                title.textContent = this.currentCategory === 'bones' ? 'Bonés' : 'Camisetas';
            }
        } else {
            if (title) {
                title.textContent = 'Nossos Produtos';
            }
        }

        // Apply filters
        products = this.applyFilters(products);
        
        grid.innerHTML = products.map(product => this.createProductCard(product)).join('');
        
        this.setupProductCardListeners();
    }

    applyFilters(products) {
        const categoryFilter = document.getElementById('categoryFilter');
        const sortFilter = document.getElementById('sortFilter');
        
        // Category filter
        if (categoryFilter && categoryFilter.value) {
            products = products.filter(product => product.categoria === categoryFilter.value);
        }
        
        // Sort filter
        if (sortFilter && sortFilter.value) {
            switch (sortFilter.value) {
                case 'price-low':
                    products.sort((a, b) => a.preco - b.preco);
                    break;
                case 'price-high':
                    products.sort((a, b) => b.preco - a.preco);
                    break;
                case 'name':
                default:
                    products.sort((a, b) => a.nome.localeCompare(b.nome));
                    break;
            }
        }
        
        return products;
    }

    createProductCard(product) {
        const isFavorite = this.favorites.some(fav => fav.id === product.id);
        const favoriteClass = isFavorite ? 'active' : '';
        
        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-card__image">
                    <i class="fas ${product.categoria === 'bones' ? 'fa-hat-cowboy' : 'fa-tshirt'}"></i>
                </div>
                <div class="product-card__content">
                    <h3 class="product-card__name">${product.nome}</h3>
                    <p class="product-card__price">R$ ${product.preco.toFixed(2).replace('.', ',')}</p>
                    <div class="product-card__actions">
                        <button class="btn btn--primary btn--sm add-to-cart-btn" data-product-id="${product.id}">
                            Ver Mais
                        </button>
                        <button class="favorite-btn ${favoriteClass}" data-product-id="${product.id}">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    setupProductCardListeners() {
        // Product card clicks
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.favorite-btn') || e.target.closest('.add-to-cart-btn')) {
                    return;
                }
                
                const productId = card.getAttribute('data-product-id');
                this.showProductDetail(productId);
            });
        });

        // Add to cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = btn.getAttribute('data-product-id');
                this.showProductDetail(productId);
            });
        });

        // Favorite buttons
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = parseInt(btn.getAttribute('data-product-id'));
                this.toggleFavorite(productId);
            });
        });
    }

    showProductDetail(productId) {
        const product = this.getProductById(productId);
        if (!product) return;

        this.currentProduct = product;
        this.renderProductDetail(product);
        this.showPage('product');
    }

    renderProductDetail(product) {
        const container = document.getElementById('productDetail');
        if (!container) return;

        const sizesHtml = product.tamanhos.map(size => 
            `<button class="size-option" data-size="${size}">${size}</button>`
        ).join('');

        container.innerHTML = `
            <div class="product-detail__gallery">
                <div class="product-detail__main-image">
                    <i class="fas ${product.categoria === 'bones' ? 'fa-hat-cowboy' : 'fa-tshirt'}"></i>
                </div>
            </div>
            <div class="product-detail__info">
                <h1>${product.nome}</h1>
                <div class="product-detail__price">R$ ${product.preco.toFixed(2).replace('.', ',')}</div>
                <p class="product-detail__description">${product.descricao}</p>
                
                <div class="product-options">
                    <div class="size-selection">
                        <label class="form-label">Tamanho:</label>
                        <div class="size-options">
                            ${sizesHtml}
                        </div>
                    </div>
                </div>
                
                <div class="quantity-selector">
                    <label class="form-label">Quantidade:</label>
                    <button class="quantity-btn" id="decreaseQty">-</button>
                    <div class="quantity-display" id="quantityDisplay">1</div>
                    <button class="quantity-btn" id="increaseQty">+</button>
                </div>
                
                <div class="product-actions">
                    <button class="btn btn--primary btn--lg btn--full-width" id="addToCartBtn">
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        `;

        this.setupProductDetailListeners();
    }

    setupProductDetailListeners() {
        // Size selection
        document.querySelectorAll('.size-option').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.size-option').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Set default size
        const firstSize = document.querySelector('.size-option');
        if (firstSize) {
            firstSize.classList.add('active');
        }

        // Quantity controls
        const decreaseBtn = document.getElementById('decreaseQty');
        const increaseBtn = document.getElementById('increaseQty');
        const quantityDisplay = document.getElementById('quantityDisplay');

        if (decreaseBtn && increaseBtn && quantityDisplay) {
            decreaseBtn.addEventListener('click', () => {
                const current = parseInt(quantityDisplay.textContent);
                if (current > 1) {
                    quantityDisplay.textContent = current - 1;
                }
            });

            increaseBtn.addEventListener('click', () => {
                const current = parseInt(quantityDisplay.textContent);
                quantityDisplay.textContent = current + 1;
            });
        }

        // Add to cart
        const addToCartBtn = document.getElementById('addToCartBtn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                this.addToCart();
            });
        }
    }

    addToCart() {
        if (!this.currentProduct) return;

        const selectedSize = document.querySelector('.size-option.active');
        const quantity = parseInt(document.getElementById('quantityDisplay').textContent);

        if (!selectedSize) {
            alert('Por favor, selecione um tamanho.');
            return;
        }

        const cartItem = {
            id: this.currentProduct.id,
            nome: this.currentProduct.nome,
            preco: this.currentProduct.preco,
            tamanho: selectedSize.getAttribute('data-size'),
            quantidade: quantity,
            categoria: this.currentProduct.categoria
        };

        // Check if item already exists in cart
        const existingItem = this.cart.find(item => 
            item.id === cartItem.id && item.tamanho === cartItem.tamanho
        );

        if (existingItem) {
            existingItem.quantidade += quantity;
        } else {
            this.cart.push(cartItem);
        }

        this.updateCartCount();
        alert('Produto adicionado ao carrinho!');
    }

    loadCart() {
        const container = document.getElementById('cartItems');
        if (!container) return;

        if (this.cart.length === 0) {
            container.innerHTML = `
                <div class="empty-cart">
                    <h3>Seu carrinho está vazio</h3>
                    <p>Adicione produtos incríveis da T ONZE!</p>
                    <button class="btn btn--primary" data-page="products">Explorar Produtos</button>
                </div>
            `;
            this.updateCartTotals();
            return;
        }

        container.innerHTML = this.cart.map((item, index) => `
            <div class="cart-item">
                <div class="cart-item__image">
                    <i class="fas ${item.categoria === 'bones' ? 'fa-hat-cowboy' : 'fa-tshirt'}"></i>
                </div>
                <div class="cart-item__details">
                    <h4 class="cart-item__name">${item.nome}</h4>
                    <p>Tamanho: ${item.tamanho}</p>
                    <p>Quantidade: ${item.quantidade}</p>
                    <p class="cart-item__price">R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</p>
                </div>
                <div class="cart-item__actions">
                    <button class="remove-btn" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        // Setup remove buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'));
                this.removeFromCart(index);
            });
        });

        this.updateCartTotals();
    }

    removeFromCart(index) {
        this.cart.splice(index, 1);
        this.updateCartCount();
        this.loadCart();
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantidade, 0);
            cartCount.textContent = totalItems;
        }
    }

    updateCartTotals() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
        const subtotalElement = document.getElementById('subtotal');
        const totalElement = document.getElementById('total');

        if (subtotalElement) {
            subtotalElement.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        }

        // For now, assume free shipping above R$ 150
        const shipping = subtotal >= 150 ? 0 : 15;
        const shippingElement = document.getElementById('shipping');
        if (shippingElement) {
            shippingElement.textContent = shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2).replace('.', ',')}`;
        }

        const total = subtotal + shipping;
        if (totalElement) {
            totalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        }
    }

    loadCheckout() {
        const orderSummary = document.getElementById('checkoutOrderSummary');
        if (!orderSummary) return;

        const subtotal = this.cart.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
        const shipping = subtotal >= 150 ? 0 : 15;
        const total = subtotal + shipping;

        orderSummary.innerHTML = `
            <div class="order-items">
                ${this.cart.map(item => `
                    <div class="order-item">
                        <span>${item.nome} (${item.tamanho}) x${item.quantidade}</span>
                        <span>R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-totals">
                <div class="summary-item">
                    <span>Subtotal:</span>
                    <span>R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div class="summary-item">
                    <span>Frete:</span>
                    <span>${shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2).replace('.', ',')}`}</span>
                </div>
                <div class="summary-item total">
                    <span>Total:</span>
                    <span>R$ ${total.toFixed(2).replace('.', ',')}</span>
                </div>
            </div>
        `;
    }

    toggleFavorite(productId) {
        const product = this.getProductById(productId);
        if (!product) return;

        const existingIndex = this.favorites.findIndex(fav => fav.id === productId);
        
        if (existingIndex > -1) {
            this.favorites.splice(existingIndex, 1);
        } else {
            this.favorites.push(product);
        }

        this.updateFavoritesCount();
        this.refreshCurrentPage();
    }

    updateFavoritesCount() {
        const favoritesCount = document.querySelector('.favorites-count');
        if (favoritesCount) {
            favoritesCount.textContent = this.favorites.length;
        }
    }

    refreshCurrentPage() {
        if (this.currentPage === 'products' || this.currentPage === 'home') {
            this.loadPageContent(this.currentPage);
        }
    }

    performSearch() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;

        const query = searchInput.value.trim().toLowerCase();
        if (!query) return;

        // Filter products based on search
        const filteredProducts = this.getAllProducts().filter(product => 
            product.nome.toLowerCase().includes(query) ||
            product.descricao.toLowerCase().includes(query) ||
            product.cor.toLowerCase().includes(query)
        );

        // Show products page with filtered results
        this.currentCategory = null;
        this.showPage('products');
        
        // Update products grid with search results
        const grid = document.getElementById('productsGrid');
        const title = document.getElementById('productsTitle');
        
        if (grid && title) {
            title.textContent = `Resultados para "${query}"`;
            grid.innerHTML = filteredProducts.map(product => this.createProductCard(product)).join('');
            this.setupProductCardListeners();
        }
    }

    filterProducts() {
        if (this.currentPage === 'products') {
            this.loadProducts();
        }
    }

    calculateShipping() {
        const cepInput = document.getElementById('cepInput');
        if (!cepInput) return;

        const cep = cepInput.value.trim();
        if (!cep) {
            alert('Por favor, informe o CEP.');
            return;
        }

        // Simulate shipping calculation
        const shippingElement = document.getElementById('shipping');
        const subtotal = this.cart.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
        const shipping = subtotal >= 150 ? 0 : 15;

        if (shippingElement) {
            shippingElement.textContent = shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2).replace('.', ',')}`;
        }

        this.updateCartTotals();
        alert('Frete calculado com sucesso!');
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    hideModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }

    handleLoginSubmit(e) {
        const email = e.target.querySelector('input[type="email"]').value;
        alert(`Login realizado com sucesso para: ${email}`);
        this.hideModal();
        e.target.reset();
    }

    handleNewsletterSubmit(e) {
        const email = e.target.querySelector('input[type="email"]').value;
        alert(`Obrigado por se inscrever! Você receberá nossas novidades no e-mail: ${email}`);
        e.target.reset();
    }

    handleContactSubmit(e) {
        alert('Mensagem enviada com sucesso! Retornaremos em breve.');
        e.target.reset();
    }

    handleCheckoutSubmit(e) {
        // Simulate order processing
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        const total = this.cart.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
        
        // Clear cart
        this.cart = [];
        this.updateCartCount();
        
        // Show success message
        alert(`Pedido realizado com sucesso! Total: R$ ${total.toFixed(2).replace('.', ',')}. Método de pagamento: ${paymentMethod.toUpperCase()}`);
        
        // Redirect to home
        this.showPage('home');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EcommerceApp();
});