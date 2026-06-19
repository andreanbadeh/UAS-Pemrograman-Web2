const Dashboard = {
  template: `
    <div class="min-h-screen bg-gray-100 font-sans">
      <!-- TOP NAVBAR -->
      <nav class="bg-indigo-700 text-white shadow-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center gap-3">
              <span class="text-2xl">📦</span>
              <span class="font-black text-xl tracking-widest hidden sm:block">E-INVENTORY</span>
            </div>
            
            <div class="hidden md:block flex-1">
              <div class="ml-10 flex items-baseline space-x-1">
                <router-link to="/dashboard" exact-active-class="bg-indigo-900 text-white" class="text-indigo-100 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">Dashboard</router-link>
                <router-link to="/items" active-class="bg-indigo-900 text-white" class="text-indigo-100 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">Data Barang</router-link>
                <router-link to="/categories" active-class="bg-indigo-900 text-white" class="text-indigo-100 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">Kategori</router-link>
                <router-link to="/suppliers" active-class="bg-indigo-900 text-white" class="text-indigo-100 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">Supplier Mitra</router-link>
                <router-link to="/stock-history" active-class="bg-indigo-900 text-white" class="text-indigo-100 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">Histori Stok</router-link>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="text-right hidden sm:block">
                <p class="text-sm font-bold text-white leading-tight">{{ userName }}</p>
                <p class="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Administrator</p>
              </div>
              <button @click="logout" class="bg-indigo-800 hover:bg-red-500 text-white font-bold p-2 px-4 rounded-lg transition-colors text-sm shadow-inner" title="Logout">
                Keluar ⏏
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <!-- KONTEN UTAMA -->
      <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header class="mb-8">
          <h1 class="text-3xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p class="text-sm font-medium text-gray-500 mt-1">Ringkasan performa dan metrik gudang saat ini.</p>
        </header>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div v-for="card in cards" :key="card.label" class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" :class="card.bg">{{ card.icon }}</div>
            </div>
            <p class="text-4xl font-black text-gray-800 mb-1">{{ card.value }}</p>
            <p class="text-sm font-bold text-gray-500 uppercase tracking-wider">{{ card.label }}</p>
          </div>
        </div>
        
        <div class="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <h2 class="text-2xl font-black text-gray-800 mb-2">Selamat Bertugas, {{ userName }}! 👋</h2>
          <p class="text-gray-500 text-sm font-medium leading-relaxed max-w-3xl">Gunakan bilah navigasi di atas untuk mengelola data inventaris, menambah stok barang baru, atau mencatat transaksi keluar/masuk gudang.</p>
        </div>
      </main>
    </div>
  `,
  data() {
    return {
      userName: JSON.parse(localStorage.getItem('user') || '{}').name || 'Admin',
      cards: [
        { icon: '📦', label: 'Total Barang',  value: 0, bg: 'bg-indigo-50 text-indigo-600 border border-indigo-100' },
        { icon: '🗂',  label: 'Kategori',      value: 0, bg: 'bg-blue-50 text-blue-600 border border-blue-100' },
        { icon: '🏭', label: 'Supplier',       value: 0, bg: 'bg-emerald-50 text-emerald-600 border border-emerald-100' },
        { icon: '📋', label: 'Transaksi', value: 0, bg: 'bg-purple-50 text-purple-600 border border-purple-100' },
      ]
    }
  },
  async mounted() {
    const B = 'http://localhost/UAS_Web2_312410341_Andrean/backend-api/public/api';
    try {
      const [a,b,c,d] = await Promise.all([axios.get(`${B}/items`), axios.get(`${B}/categories`), axios.get(`${B}/suppliers`), axios.get(`${B}/stock-history`)]);
      this.cards[0].value = a.data.length; this.cards[1].value = b.data.length;
      this.cards[2].value = c.data.length; this.cards[3].value = d.data.length;
    } catch(e) {}
  },
  methods: {
    logout() { localStorage.clear(); this.$router.push('/login'); }
  }
};