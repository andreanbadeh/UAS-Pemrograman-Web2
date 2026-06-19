const StockHistory = {
  template: `
    <div class="min-h-screen bg-gray-100 font-sans">
      <nav class="bg-indigo-700 text-white shadow-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center gap-3"><span class="text-2xl">📦</span><span class="font-black text-xl tracking-widest hidden sm:block">E-INVENTORY</span></div>
            <div class="hidden md:block flex-1">
              <div class="ml-10 flex items-baseline space-x-1">
                <router-link to="/dashboard" active-class="bg-indigo-900 text-white" class="text-indigo-100 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">Dashboard</router-link>
                <router-link to="/items" active-class="bg-indigo-900 text-white" class="text-indigo-100 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">Data Barang</router-link>
                <router-link to="/categories" active-class="bg-indigo-900 text-white" class="text-indigo-100 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">Kategori</router-link>
                <router-link to="/suppliers" active-class="bg-indigo-900 text-white" class="text-indigo-100 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">Supplier Mitra</router-link>
                <router-link to="/stock-history" active-class="bg-indigo-900 text-white" class="text-indigo-100 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">Histori Stok</router-link>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <button @click="logout" class="bg-indigo-800 hover:bg-red-500 text-white font-bold p-2 px-4 rounded-lg transition-colors text-sm shadow-inner">Keluar ⏏</button>
            </div>
          </div>
        </div>
      </nav>

      <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center mb-6 border-b border-gray-200 pb-4">
          <div>
            <h1 class="text-2xl font-black text-gray-900">Histori Transaksi Stok</h1>
            <p class="text-sm font-medium text-gray-500 mt-1">Catatan pergerakan mutasi barang masuk dan keluar.</p>
          </div>
          <button @click="openModal()" class="mt-4 md:mt-0 px-5 py-2.5 rounded-lg text-sm font-bold text-white shadow-md bg-indigo-600 hover:bg-indigo-700 transition-colors">+ Catat Mutasi Baru</button>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          <table class="min-w-full text-sm text-left">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-4 font-extrabold text-gray-500 uppercase tracking-widest text-[11px] w-16">No</th>
                <th class="px-6 py-4 font-extrabold text-gray-500 uppercase tracking-widest text-[11px]">Informasi Barang</th>
                <th class="px-6 py-4 font-extrabold text-gray-500 uppercase tracking-widest text-[11px]">Tipe Mutasi</th>
                <th class="px-6 py-4 font-extrabold text-gray-500 uppercase tracking-widest text-[11px]">Jumlah</th>
                <th class="px-6 py-4 font-extrabold text-gray-500 uppercase tracking-widest text-[11px]">Catatan / Keterangan</th>
                <th class="px-6 py-4 font-extrabold text-gray-500 uppercase tracking-widest text-[11px]">Tercatat Oleh</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="history.length === 0"><td colspan="6" class="px-6 py-8 text-center font-bold text-gray-400">Belum ada riwayat transaksi tercatat.</td></tr>
              <tr v-for="(h, i) in history" :key="h.id" class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 font-black text-gray-400">{{ i+1 }}</td>
                <td class="px-6 py-4">
                  <div class="font-bold text-gray-800 text-base">{{ h.item_name }}</div>
                  <div class="text-[11px] text-gray-500 mt-1 font-mono">{{ h.created_at }}</div>
                </td>
                <td class="px-6 py-4">
                  <span :class="h.type === 'masuk' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-red-100 text-red-700 border-red-200'" class="px-3 py-1 rounded text-xs font-bold uppercase border shadow-sm">
                    {{ h.type === 'masuk' ? '↓ MASUK' : '↑ KELUAR' }}
                  </span>
                </td>
                <td class="px-6 py-4 font-black text-gray-700 text-lg">{{ h.quantity }} <span class="text-xs text-gray-400 font-bold">UNIT</span></td>
                <td class="px-6 py-4 font-medium text-gray-600 italic">"{{ h.note || 'Tanpa keterangan' }}"</td>
                <td class="px-6 py-4 font-bold text-indigo-600 bg-indigo-50 mt-3 inline-block px-2.5 py-1 rounded border border-indigo-100 text-xs">{{ h.user_name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      <div v-if="showModal" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
        <div class="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-200 flex flex-col">
          <div class="p-6 border-b border-gray-100 bg-gray-50 rounded-t-2xl">
            <h3 class="text-xl font-black text-gray-800">Form Mutasi Stok</h3>
          </div>
          <div class="p-6 space-y-4">
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Pilih Barang</label>
              <select v-model="form.item_id" class="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none" required>
                <option value="">Pilih Barang Inventaris</option>
                <option v-for="item in items" :key="item.id" :value="item.id">{{ item.name }} (Stok: {{ item.stock }})</option>
              </select>
            </div>
            
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Tipe Mutasi</label>
              <div class="flex gap-3">
                <button @click="form.type='masuk'" type="button" :class="form.type === 'masuk' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white border border-gray-300 text-gray-500 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-600'" class="flex-1 py-2.5 rounded-lg text-sm font-bold transition-all">↓ Barang Masuk</button>
                <button @click="form.type='keluar'" type="button" :class="form.type === 'keluar' ? 'bg-red-600 text-white shadow-md' : 'bg-white border border-gray-300 text-gray-500 hover:bg-red-50 hover:border-red-300 hover:text-red-600'" class="flex-1 py-2.5 rounded-lg text-sm font-bold transition-all">↑ Barang Keluar</button>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Kuantitas Unit</label>
              <input v-model="form.quantity" type="number" min="1" class="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-lg font-black focus:ring-2 focus:ring-indigo-500 outline-none text-gray-800" required />
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Keterangan Catatan</label>
              <input v-model="form.note" placeholder="Misal: Penerimaan PO-001..." class="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </div>
          <div class="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
            <button @click="showModal=false" class="px-5 py-2.5 rounded-lg text-sm font-bold border border-gray-300 text-gray-600 bg-white hover:bg-gray-100">Batal</button>
            <button @click="saveData" class="px-5 py-2.5 rounded-lg text-sm font-bold text-white shadow-md bg-indigo-600 hover:bg-indigo-700">Simpan Transaksi</button>
          </div>
        </div>
      </div>
    </div>
  `,
  data() { return { history: [], items: [], showModal: false, form: { item_id: '', user_id: 1, type: 'masuk', quantity: 1, note: '' }, BASE_URL: 'http://localhost/UAS_Web2_312410341_Andrean/backend-api/public/api' } },
  async mounted() {
    await this.loadData();
    const res = await axios.get(`${this.BASE_URL}/items`);
    this.items = res.data;
  },
  methods: {
    async loadData() { const res = await axios.get(`${this.BASE_URL}/stock-history`); this.history = res.data; },
    openModal() { const user = JSON.parse(localStorage.getItem('user') || '{}'); this.form = { item_id: '', user_id: user.id || 1, type: 'masuk', quantity: 1, note: '' }; this.showModal = true; },
    async saveData() { await axios.post(`${this.BASE_URL}/stock-history`, this.form); this.showModal = false; await this.loadData(); },
    logout() { localStorage.clear(); this.$router.push('/login'); }
  }
};