import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Store, 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Phone, 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  CheckCircle, 
  ArrowRight, 
  ExternalLink, 
  Menu, 
  X, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Laravel Jetstream Pro Hoodie',
    category: 'Apparel',
    price: 350000,
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600',
    description: 'Premium heavyweight cotton hoodie designed for developers who ship code in style. Features embroidered Laravel branding.'
  },
  {
    id: 2,
    name: 'Inertia.js Mechanical Keyboard',
    category: 'Accessories',
    price: 1250000,
    rating: 4.8,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=600',
    description: 'Hot-swappable mechanical keyboard with custom RGB backlighting and tactile switches for lightning-fast coding.'
  },
  {
    id: 3,
    name: 'Tailwind CSS Desk Mat & Mousepad',
    category: 'Accessories',
    price: 195000,
    rating: 4.9,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=600',
    description: 'Extra-large stitched edge desk mat with waterproof coating and smooth glide surface. Styled in signature cyan.'
  },
  {
    id: 4,
    name: 'Eloquent ORM Ceramic Coffee Mug',
    category: 'Lifestyle',
    price: 85000,
    rating: 4.7,
    reviews: 65,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600',
    description: 'Matte black ceramic mug that keeps your coffee hot through long debugging sessions. Microwave and dishwasher safe.'
  },
  {
    id: 5,
    name: 'Livewire Developer Backpack',
    category: 'Apparel',
    price: 550000,
    rating: 4.9,
    reviews: 82,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600',
    description: 'Water-resistant laptop backpack with dedicated 16-inch compartment, USB charging port, and ergonomic padded straps.'
  },
  {
    id: 6,
    name: 'Artisan CLI Wireless Earbuds',
    category: 'Accessories',
    price: 450000,
    rating: 4.6,
    reviews: 43,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600',
    description: 'Active noise-canceling wireless earbuds with crystal-clear microphone for remote standups and deep focus work.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('store'); // 'store', 'dashboard'
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('6281234567890');
  
  // Checkout Form State
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Transfer Bank');
  const [orderNotes, setOrderNotes] = useState('');
  const [notification, setNotification] = useState(null);

  // Dashboard New Product Form State
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Apparel');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdImage, setNewProdImage] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Calculate Cart Total
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showNotification(`Berhasil menambahkan ${product.name} ke keranjang!`);
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    let message = `🛍️ *ORDER BARU - LARAVEL ARTISAN STORE*\n`;
    message += `----------------------------------------\n`;
    message += `👤 *Nama:* ${customerName}\n`;
    message += `📍 *Alamat:* ${customerAddress}\n`;
    message += `💳 *Pembayaran:* ${paymentMethod}\n`;
    if (orderNotes) message += `📝 *Catatan:* ${orderNotes}\n`;
    message += `----------------------------------------\n`;
    message += `📦 *Detail Pesanan:*\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.quantity}x) - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n`;
    });

    message += `----------------------------------------\n`;
    message += `💰 *TOTAL: Rp ${cartTotal.toLocaleString('id-ID')}*\n`;
    message += `----------------------------------------\n`;
    message += `Mohon konfirmasi ketersediaan barang dan total pembayaran. Terima kasih! ✨`;

    const encodedMessage = encodeURIComponent(message);
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

    window.open(waUrl, '_blank');
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setCart([]);
    showNotification('Pesanan berhasil dikirim ke WhatsApp CS!');
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    const newProduct = {
      id: Date.now(),
      name: newProdName,
      category: newProdCategory,
      price: Number(newProdPrice),
      rating: 5.0,
      reviews: 1,
      image: newProdImage || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
      description: newProdDesc || 'Produk berkualitas tinggi dari toko kami.'
    };

    setProducts([newProduct, ...products]);
    setNewProdName('');
    setNewProdPrice('');
    setNewProdImage('');
    setNewProdDesc('');
    showNotification('Produk baru berhasil ditambahkan ke inventaris!');
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    showNotification('Produk berhasil dihapus.');
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans antialiased selection:bg-rose-500 selection:text-white">
      
      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-800 border border-rose-500/50 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-rose-400" />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* Laravel Top Navigation Bar */}
      <header className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-red-600 px-3 py-1.5 rounded-lg shadow-lg shadow-rose-500/20">
              
              <span className="font-bold tracking-wider text-white text-lg">SyaharuddinStore</span>
            </div>
            <span className="hidden sm:inline-block px-2.5 py-0.5 text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full">
              Laravel v10.x UI
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/50 p-1 rounded-xl border border-slate-700/50">
            <button
  onClick={() => setActiveTab('store')}
  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
    activeTab === 'store'
      ? 'bg-rose-600 text-white shadow-md shadow-rose-900/20'
      : 'text-slate-100 hover:text-white hover:bg-slate-800'
  }`}
>
  <Store className="w-4 h-4" />
  <span>Storefront</span>
</button>

<button
  onClick={() => setActiveTab('dashboard')}
  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
    activeTab === 'dashboard'
      ? 'bg-rose-600 text-white shadow-md shadow-rose-900/20'
      : 'text-slate-100 hover:text-white hover:bg-slate-800'
  }`}
>
  <LayoutDashboard className="w-4 h-4" />
  <span>Admin Syaharuddin</span>
</button>
          </nav>

          <div className="flex items-center space-x-3">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center space-x-2 text-xs text-slate-300 bg-slate-900/60 px-3.5 py-2 rounded-xl border border-slate-700 hover:border-rose-500/50 transition-all"
            >
              <Phone className="w-4 h-4 text-rose-400" />
              <span>WhatsApp CS: <strong className="text-rose-400">+{whatsappNumber}</strong></span>
            </a>

            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Buka Keranjang Belanja"
              className="relative p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl transition-all flex items-center justify-center shadow-sm"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
          <div className="md:hidden flex border-t border-slate-700/60 bg-slate-900/90 px-4 py-2">
  <button
    onClick={() => setActiveTab('store')}
    className={`flex items-center space-x-1.5 text-sm font-medium px-4 py-1.5 rounded-lg ${
      activeTab === 'store' ? 'bg-rose-600 text-white' : 'text-slate-100'
    }`}
  >
    <Store className="w-4 h-4" />
    <span>Storefront</span>
  </button>
  <button
    onClick={() => setActiveTab('dashboard')}
    className={`flex items-center space-x-1.5 text-sm font-medium px-4 py-1.5 rounded-lg ${
      activeTab === 'dashboard' ? 'bg-rose-600 text-white' : 'text-slate-100'
    }`}
  >
    <LayoutDashboard className="w-4 h-4" />
    <span>Admin</span>
  </button>
</div>
         
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === 'store' && (
          <div className="space-y-8">
            
            {/* Hero Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-white-800 via-white-800/90 to-slate-900 border border-slate-700/80 rounded-2xl shadow-xl p-8 sm:p-12">
              <div className="absolute right-0 top-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Koleksi Eksklusif Developer & Tech Enthusiast</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-red leading-tight">
                  Build Better, Ship Faster, <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500">Live Stylish.</span>
                </h1>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Toko online modern bergaya Laravel framework. Belanja perlengkapan coding, merchandise eksklusif, dan aksesori premium dengan pemesanan instan via WhatsApp.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <a
                    href="#catalog"
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-black-600 hover:from-rose-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg shadow-rose-500/25 transition-all flex items-center space-x-2"
                  >
                    <span>Jelajahi Produk</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-semibold rounded-xl transition-all flex items-center space-x-2"
                  >
                    <Phone className="w-4 h-4 text-rose-400" />
                    <span>Hubungi CS WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Features Badge Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-800/50 border border-slate-700/60 p-4 rounded-xl flex items-center space-x-4">
                <div className="p-3 bg-rose-500/10 text-rose-400 rounded-lg">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">100% Aman & Terpercaya</p>
                  <p className="text-xs text-slate-400">Transaksi langsung via WhatsApp resmi</p>
                </div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/60 p-4 rounded-xl flex items-center space-x-4">
                <div className="p-3 bg-rose-500/10 text-rose-400 rounded-lg">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Pengiriman Cepat</p>
                  <p className="text-xs text-slate-400">Kirim ke seluruh wilayah Indonesia</p>
                </div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/60 p-4 rounded-xl flex items-center space-x-4">
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Garansi Retur</p>
                  <p className="text-xs text-slate-400">Jaminan tukar baru jika cacat produksi</p>
                </div>
              </div>
            </div>

            {/* Catalog Section */}
            <div id="catalog" className="space-y-6 pt-4">
              
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari produk impianmu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                  />
                </div>

                <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                  <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                        selectedCategory === cat
                          ? 'bg-rose-500 text-white shadow-md shadow-rose-500'
                          : 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-slate-800/40 border border-slate-700/60 rounded-2xl">
                  <Package className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white">Produk tidak ditemukan</h3>
                  <p className="text-sm text-slate-400">Coba kata kunci lain atau ubah kategori filter.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <div 
                      key={product.id}
                      className="bg-slate-800/70 border border-slate-700/70 rounded-2xl overflow-hidden hover:border-rose-500/50 transition-all duration-300 flex flex-col group shadow-lg"
                    >
                      <div className="relative h-52 overflow-hidden bg-slate-900">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 right-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs font-medium text-rose-400 rounded-lg">
                          {product.category}
                        </span>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 text-amber-400 text-xs font-medium">
                              <Star className="w-3.5 h-3.5 fill-amber-400" />
                              <span>{product.rating}</span>
                              <span className="text-slate-200">({product.reviews})</span>
                            </div>
                          </div>
                          <p className="font-bold text-lg text-white group-hover:text-rose-400 transition-colors line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
                          <div>
                            <span className="text-xs text-slate-200 block">Harga</span>
                            <span className="text-base sm:text-lg font-extrabold text-rose-400">
                              Rp {product.price.toLocaleString('id-ID')}
                            </span>
                          </div>
                          <button
                            onClick={() => addToCart(product)}
                            className="px-4 py-2.5 bg-rose-800 hover:bg-rose-900 text-white font-medium text-xs rounded-xl shadow-md shadow-rose-200/20 transition-all flex items-center space-x-1.5"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>+ Keranjang</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            
            <div className="bg-slate-800/80 border border-slate-700/60 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center space-x-2 text-rose-400 text-xs font-semibold mb-1">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>LARAVEL NOVA MANAGEMENT PANEL</span>
                </div>
                <h1 className="text-2xl font-bold text-white">Dashboard Toko & Kelola Produk</h1>
                <p className="text-xs text-slate-400">Kelola inventaris produk dan pantau pesanan dengan mudah.</p>
              </div>
              <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-right">
                <span className="text-xs text-slate-400 block">Total Produk Aktif</span>
                <span className="text-lg font-bold text-rose-400">{products.length} Item</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="bg-slate-800/70 border border-slate-700/60 p-6 rounded-2xl space-y-4 lg:col-span-1">
                <h3 className="font-bold text-white text-base flex items-center space-x-2 border-b border-slate-700 pb-3">
                  <Plus className="w-4 h-4 text-rose-500" />
                  <span>Tambah Produk Baru</span>
                </h3>

                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Nama Produk</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Laravel Cap Pro"
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-600 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Kategori</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    >
                      <option value="Apparel">Apparel</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Lifestyle">Lifestyle</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Harga (IDR)</label>
                    <input
                      type="number"
                      required
                      placeholder="150000"
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-600 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">URL Gambar (Opsional)</label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={newProdImage}
                      onChange={(e) => setNewProdImage(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-600 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Deskripsi Singkat</label>
                    <textarea
                      rows="2"
                      placeholder="Spesifikasi produk..."
                      value={newProdDesc}
                      onChange={(e) => setNewProdDesc(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-600 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm rounded-xl shadow-md shadow-rose-500/20 transition-all flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Simpan Produk</span>
                  </button>
                </form>

                <div className="pt-4 border-t border-slate-700">
                  <label className="block text-xs font-medium text-slate-300 mb-1">Nomor WhatsApp Toko (CS)</label>
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-rose-400 font-mono focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Format: 628xxxxxxxxxx (Tanpa angka 0 di depan)</p>
                </div>
              </div>

              <div className="bg-slate-800/70 border border-slate-700/60 p-6 rounded-2xl space-y-4 lg:col-span-2 overflow-hidden">
                <h3 className="font-bold text-white text-base flex items-center space-x-2 border-b border-slate-700 pb-3">
                  <Package className="w-4 h-4 text-rose-500" />
                  <span>Daftar Inventaris Produk</span>
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-700 text-xs font-semibold text-slate-400">
                        <th className="py-3 px-4">Produk</th>
                        <th className="py-3 px-4">Kategori</th>
                        <th className="py-3 px-4">Harga</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50 text-sm">
                      {products.map(product => (
                        <tr key={product.id} className="hover:bg-slate-700/20 transition-colors">
                          <td className="py-3 px-4 flex items-center space-x-3">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover bg-slate-900 shrink-0" 
                            />
                            <span className="font-medium text-white line-clamp-1">{product.name}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2.5 py-1 text-xs rounded-md bg-slate-900 text-rose-400 border border-slate-700">
                              {product.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-semibold text-slate-200">
                            Rp {product.price.toLocaleString('id-ID')}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
                              title="Hapus Produk"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">ArtisanStore</span>
            <span className="text-slate-300">&copy; {new Date().getFullYear()} — Built with React & Tailwind CSS.</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
              <span>WhatsApp Gateway Active</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 flex flex-col shadow-2xl">
              
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-800/50">
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5 text-rose-500" />
                  <h2 className="font-bold text-white text-lg">Keranjang Belanja</h2>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-20 space-y-3">
                    <ShoppingBag className="w-16 h-16 text-slate-700 mx-auto" />
                    <p className="text-slate-400 font-medium">Keranjang kamu masih kosong</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-4 py-2 bg-rose-500 text-white rounded-xl text-xs font-semibold"
                    >
                      Mulai Belanja
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex items-center space-x-4 bg-slate-800/50 border border-slate-700/60 p-4 rounded-xl">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-slate-900 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white text-sm truncate">{item.name}</h4>
                        <span className="text-xs text-rose-400 font-bold block mt-0.5">
                          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                        </span>
                        
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 bg-slate-700 text-white rounded flex items-center justify-center font-bold text-xs hover:bg-slate-600"
                          >
                            -
                          </button>
                          <span className="text-xs font-semibold text-white px-2">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 bg-slate-700 text-white rounded flex items-center justify-center font-bold text-xs hover:bg-slate-600"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-500 hover:text-red-400 p-2 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-800 bg-slate-800/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Total Pembayaran</span>
                    <span className="text-xl font-extrabold text-rose-400">
                      Rp {cartTotal.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-teal-600 hover:from-rose-600 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Checkout via WhatsApp</span>
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Checkout Details Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsCheckoutOpen(false)}></div>
          
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-10">
            <div className="p-6 border-b border-slate-800 bg-slate-800/50 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Konfirmasi Pesanan WhatsApp</h3>
                  <p className="text-xs text-slate-400">Lengkapi data pengiriman sebelum dikirim ke CS</p>
                </div>
              </div>
              <button onClick={() => setIsCheckoutOpen(false)} className="text-slate-400 hover:text-white p-2">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleWhatsAppCheckout} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nama Lengkap Penerima</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Taylor Otwell"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Alamat Lengkap Pengiriman</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Jalan Sudirman No. 45, RT 01/02, Jakarta Selatan"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Metode Pembayaran</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                >
                  <option value="Transfer Bank BCA">Transfer Bank BCA</option>
                  <option value="Transfer Bank Mandiri">Transfer Bank Mandiri</option>
                  <option value="QRIS / E-Wallet (OVO/GoPay/DANA)">QRIS / E-Wallet (OVO/GoPay/DANA)</option>
                  <option value="COD (Bayar di Tempat)">COD (Bayar di Tempat)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Catatan Tambahan (Opsional)</label>
                <input
                  type="text"
                  placeholder="Contoh: Warna hitam ukuran L"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/30 flex items-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Kirim Pesanan ke WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
