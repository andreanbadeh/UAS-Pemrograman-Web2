const Items = {
  template: `
    <div class="min-h-screen bg-gray-100 font-sans">
      <!-- TOP NAVBAR -->
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
            <h1 class="text-2xl font-black text-gray-900">Master Data Barang</h1>
            <p class="text-sm font-medium text-gray-500 mt-1">Kelola seluruh inventaris fisik di gudang.</p>
          </div>
          <button @click="openModal()" class="mt-4 md:mt-0 px-5 py-2.5 rounded-lg text-sm font-bold text-white shadow-md bg-indigo-600 hover:bg-indigo-700 transition-colors">
            + Tambah Barang
          </button>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
          <table class="min-w-full text-sm text-left">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-4 font-extrabold text-gray-500 uppercase tracking-widest text-[11px]">Nama & SKU</th>
                <th class="px-6 py-4 font-extrabold text-gray-500 uppercase tracking-widest text-[11px]">Klasifikasi</th>
                <th class="px-6 py-4 font-extrabold text-gray-500 uppercase tracking-widest text-[11px]">Stok Real</th>
                <th class="px-6 py-4 font-extrabold text-gray-500 uppercase tracking-widest text-[11px]">Harga Satuan</th>
                <th class="px-6 py-4 font-extrabold text-gray-500 uppercase tracking-widest text-[11px] text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="items.length === 0"><td colspan="5" class="px-6 py-10 text-center font-bold text-gray-400">Belum ada barang terdaftar.</td></tr>
              <tr v-for="item in items" :key="item.id" class="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors">
                <td class="px-6 py-4">
                  <div class="font-black text-gray-800 text-base">{{ item.name }}</div>
                  <div class="font-mono text-xs text-gray-500 mt-1 bg-gray-100 inline-block px-2 py-0.5 rounded border border-gray-200">{{ item.sku }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="font-bold text-indigo-600 text-xs uppercase bg-indigo-50 inline-block px-2.5 py-1 rounded border border-indigo-100">{{ item.category_name }}</div>
                  <div class="text-xs text-gray-500 mt-1 font-medium">{{ item.supplier_name }}</div>
                </td>
                <td class="px-6 py-4">
                  <span :class="item.stock <= item.min_stock ? 'bg-red-100 text-red-700 border-red-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200'" class="px-3 py-1 rounded-md text-sm font-black border shadow-sm">{{ item.stock }} Unit</span>
                  <div class="text-[10px] text-gray-400 font-bold mt-1 uppercase">Min: {{ item.min_stock }}</div>
                </td>
                <td class="px-6 py-4 font-black text-gray-700">Rp {{ Number(item.price).toLocaleString('id-ID') }}</td>
                <td class="px-6 py-4 text-right">
                  <div class="flex justify-end gap-2">
                    <button @click="openModal(item)" class="px-3 py-1.5 rounded bg-white border border-gray-300 text-gray-700 font-bold text-xs hover:bg-gray-50 shadow-sm">Edit</button>
                    <button @click="deleteData(item.id)" class="px-3 py-1.5 rounded bg-white border border-red-200 text-red-600 font-bold text-xs hover:bg-red-50 shadow-sm">Hapus</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      <!-- MODAL -->
      <div v-if="showModal" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
        <div class="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-gray-200 flex flex-col">
          <div class="p-6 border-b border-gray-100 bg-gray-50 rounded-t-2xl">
            <h3 class="text-xl font-black text-gray-800">{{ form.id ? 'Perbarui Data Barang' : 'Registrasi Barang Baru' }}</h3>
          </div>
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2">
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Nama Barang</label>
                <input v-model="form.name" class="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none" required />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Kode SKU</label>
                <input v-model="form.sku" class="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none" required />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Harga Beli/Jual</label>
                <input v-model="form.price" type="number" class="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none" required />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Kategori</label>
                <select v-model="form.category_id" class="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none" required>
                  <option value="">Pilih Kategori</option>
                  <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Supplier</label>
                <select v-model="form.supplier_id" class="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-sm font-bold text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none" required>
                  <option value="">Pilih Supplier</option>
                  <option v-for="s in suppliers" :key="s.id" :value="s.id">{{ s.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Stok Fisik</label>
                <input v-model="form.stock" type="number" class="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none" required />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Batas Minimum Stok</label>
                <input v-model="form.min_stock" type="number" class="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none" required />
              </div>
            </div>
          </div>
          <div class="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
            <button @click="showModal=false" class="px-5 py-2.5 rounded-lg text-sm font-bold border border-gray-300 text-gray-600 bg-white hover:bg-gray-100">Batal</button>
            <button @click="saveData" class="px-5 py-2.5 rounded-lg text-sm font-bold text-white shadow-md bg-indigo-600 hover:bg-indigo-700">Simpan Barang</button>
          </div>
        </div>
      </div>
    </div>
  `,
  data() { return { items: [], categories: [], suppliers: [], showModal: false, form: { id: null, name: '', sku: '', category_id: '', supplier_id: '', stock: 0, min_stock: 5, price: 0 }, BASE_URL: 'http://localhost/UAS_Web2_312410341_Andrean/backend-api/public/api' } },
  async mounted() {
    await this.loadData();
    const [cats, sups] = await Promise.all([axios.get(`${this.BASE_URL}/categories`), axios.get(`${this.BASE_URL}/suppliers`)]);
    this.categories = cats.data; this.suppliers = sups.data;
  },
  methods: {
    async loadData() { const res = await axios.get(`${this.BASE_URL}/items`); this.items = res.data; },
    openModal(item = null) { this.form = item ? {...item} : { id: null, name: '', sku: '', category_id: '', supplier_id: '', stock: 0, min_stock: 5, price: 0 }; this.showModal = true; },
    async saveData() {
      if (this.form.id) await axios.put(`${this.BASE_URL}/items/${this.form.id}`, this.form);
      else await axios.post(`${this.BASE_URL}/items`, this.form);
      this.showModal = false; await this.loadData();
    },
    async deleteData(id) { if (confirm('Yakin hapus?')) { await axios.delete(`${this.BASE_URL}/items/${id}`); await this.loadData(); } },
    logout() { localStorage.clear(); this.$router.push('/login'); }
  }
};