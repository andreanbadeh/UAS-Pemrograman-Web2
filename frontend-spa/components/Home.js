const Home = {
  template: `
    <div class="min-h-screen bg-white flex flex-col font-sans">
      <header class="bg-white border-b border-gray-200 py-4 px-8 flex justify-between items-center z-10 relative shadow-sm">
        <div class="flex items-center gap-2 text-indigo-700">
          <span class="text-3xl">📦</span>
          <span class="text-2xl font-black tracking-tighter">E-INVENTORY</span>
        </div>
        <router-link to="/login" class="px-6 py-2.5 rounded-lg text-sm font-bold text-white shadow-lg bg-indigo-600 hover:bg-indigo-700 transition-colors">
          Portal Admin
        </router-link>
      </header>

      <main class="flex-grow flex flex-col items-center justify-center text-center px-4 py-16 bg-gray-50 relative overflow-hidden">
        <!-- Dekorasi Background -->
        <div class="absolute top-0 w-full h-full overflow-hidden pointer-events-none">
            <div class="absolute -top-24 -right-24 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply opacity-50"></div>
            <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply opacity-50"></div>
        </div>

        <div class="relative z-10 max-w-4xl mx-auto">
          <span class="px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs tracking-widest uppercase mb-6 inline-block border border-indigo-200">Enterprise Edition</span>
          <h1 class="text-4xl md:text-6xl font-black text-gray-900 mt-2 mb-6 tracking-tight">Sistem Manajemen <span class="text-indigo-600">Gudang & Inventaris</span></h1>
          <p class="text-gray-500 text-lg max-w-2xl mx-auto mb-12">Solusi modern untuk melacak stok barang, mengelola kategori, dan memantau transaksi keluar-masuk secara real-time dengan akurasi 99%.</p>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div class="text-4xl font-black text-indigo-600 mb-1">{{ summary.items }}</div>
              <div class="text-xs font-bold text-gray-400 uppercase tracking-wide">Total Barang</div>
            </div>
            <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div class="text-4xl font-black text-blue-500 mb-1">{{ summary.categories }}</div>
              <div class="text-xs font-bold text-gray-400 uppercase tracking-wide">Kategori</div>
            </div>
            <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div class="text-4xl font-black text-emerald-500 mb-1">{{ summary.suppliers }}</div>
              <div class="text-xs font-bold text-gray-400 uppercase tracking-wide">Supplier Mitra</div>
            </div>
            <div class="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div class="text-4xl font-black text-purple-500 mb-1">{{ summary.history }}</div>
              <div class="text-xs font-bold text-gray-400 uppercase tracking-wide">Transaksi Stok</div>
            </div>
          </div>
        </div>
      </main>

      <footer class="bg-gray-900 py-6 text-center text-gray-400 text-sm font-medium z-10 relative">
        &copy; 2026 E-Inventory System. Hak Cipta Dilindungi.
      </footer>
    </div>
  `,
  data() { return { summary: { items: 0, categories: 0, suppliers: 0, history: 0 } } },
  async mounted() {
    try {
      const BASE = 'http://localhost/UAS_Web2_312410341_Andrean/backend-api/public/api';
      
      // Ambil token kalau usernya emang udah login
      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': 'Bearer ' + token } : {};

      // Pakai FETCH NATIVE biar nggak ketahuan satpam Axios global di index.html
      const [resItems, resCats, resSups, resHist] = await Promise.all([
        fetch(BASE + '/items', { headers }),
        fetch(BASE + '/categories', { headers }),
        fetch(BASE + '/suppliers', { headers }),
        fetch(BASE + '/stock-history', { headers })
      ]);

      // Kalau dikasih izin sama backend (status ok), baru angkanya diubah sesuai database!
      if(resItems.ok) { const data = await resItems.json(); this.summary.items = data.length; }
      if(resCats.ok)  { const data = await resCats.json();  this.summary.categories = data.length; }
      if(resSups.ok)  { const data = await resSups.json();  this.summary.suppliers = data.length; }
      if(resHist.ok)  { const data = await resHist.json();  this.summary.history = data.length; }
      
    } catch(e) {
      console.log('Mode publik: Gagal koneksi ke database.');
    }
  }
};