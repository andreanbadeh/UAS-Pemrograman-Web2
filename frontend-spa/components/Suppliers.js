const Suppliers = {
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
            <h1 class="text-2xl font-black text-gray-900">Database Supplier</h1>
            <p class="text-sm font-medium text-gray-500 mt-1">Kelola data mitra pemasok barang inventaris.</p>
          </div>
          <button @click="openModal()" class="mt-4 md:mt-0 px-5 py-2.5 rounded-lg text-sm font-bold text-white shadow-md bg-indigo-600 hover:bg-indigo-700 transition-colors">+ Tambah Supplier</button>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table class="min-w-full text-sm text-left">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-4 font-extrabold text-gray-500 uppercase tracking-widest text-[11px] w-16">No</th>
                <th class="px-6 py-4 font-extrabold text-gray-500 uppercase tracking-widest text-[11px]">Nama Perusahaan / Entitas</th>
                <th class="px-6 py-4 font-extrabold text-gray-500 uppercase tracking-widest text-[11px]">Kontak PIC</th>
                <th class="px-6 py-4 font-extrabold text-gray-500 uppercase tracking-widest text-[11px]">No. Telepon</th>
                <th class="px-6 py-4 font-extrabold text-gray-500 uppercase tracking-widest text-[11px]">Alamat Lengkap</th>
                <th class="px-6 py-4 font-extrabold text-gray-500 uppercase tracking-widest text-[11px] text-right">Opsi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="suppliers.length === 0"><td colspan="6" class="px-6 py-8 text-center font-bold text-gray-400">Belum ada supplier terdaftar.</td></tr>
              <tr v-for="(sup, i) in suppliers" :key="sup.id" class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 font-black text-gray-400">{{ i+1 }}</td>
                <td class="px-6 py-4 font-black text-gray-800">{{ sup.name }}</td>
                <td class="px-6 py-4 font-medium text-gray-600">{{ sup.contact || '-' }}</td>
                <td class="px-6 py-4 font-mono text-xs font-bold text-indigo-600 bg-indigo-50 inline-block px-2 py-1 mt-3 rounded border border-indigo-100">{{ sup.phone || '-' }}</td>
                <td class="px-6 py-4 font-medium text-gray-500 max-w-xs truncate">{{ sup.address || '-' }}</td>
                <td class="px-6 py-4 text-right">
                  <div class="flex justify-end gap-2">
                    <button @click="openModal(sup)" class="px-3 py-1 rounded bg-white border border-gray-300 text-gray-700 font-bold text-xs hover:bg-gray-100 shadow-sm">Edit</button>
                    <button @click="deleteData(sup.id)" class="px-3 py-1 rounded bg-white border border-red-200 text-red-600 font-bold text-xs hover:bg-red-50 shadow-sm">Hapus</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      <div v-if="showModal" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
        <div class="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-gray-200 flex flex-col">
          <div class="p-6 border-b border-gray-100 bg-gray-50 rounded-t-2xl">
            <h3 class="text-xl font-black text-gray-800">{{ form.id ? 'Perbarui Data Supplier' : 'Registrasi Supplier' }}</h3>
          </div>
          <div class="p-6 space-y-4">
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Nama Perusahaan / Supplier</label>
              <input v-model="form.name" class="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none" required />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Nama Kontak (PIC)</label>
                <input v-model="form.contact" class="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none" required />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Nomor Telepon/HP</label>
                <input v-model="form.phone" class="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none" required />
              </div>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Alamat Kantor / Gudang</label>
              <textarea v-model="form.address" rows="3" class="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none resize-none"></textarea>
            </div>
          </div>
          <div class="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
            <button @click="showModal=false" class="px-5 py-2.5 rounded-lg text-sm font-bold border border-gray-300 text-gray-600 bg-white hover:bg-gray-100">Batal</button>
            <button @click="saveData" class="px-5 py-2.5 rounded-lg text-sm font-bold text-white shadow-md bg-indigo-600 hover:bg-indigo-700">Simpan Supplier</button>
          </div>
        </div>
      </div>
    </div>
  `,
  data() { return { suppliers: [], showModal: false, form: { id: null, name: '', contact: '', phone: '', address: '' }, BASE_URL: 'http://localhost/UAS_Web2_312410341_Andrean/backend-api/public/api' } },
  async mounted() { await this.loadData(); },
  methods: {
    async loadData() { const res = await axios.get(`${this.BASE_URL}/suppliers`); this.suppliers = res.data; },
    openModal(sup = null) { this.form = sup ? {...sup} : { id: null, name: '', contact: '', phone: '', address: '' }; this.showModal = true; },
    async saveData() {
      if (this.form.id) await axios.put(`${this.BASE_URL}/suppliers/${this.form.id}`, this.form);
      else await axios.post(`${this.BASE_URL}/suppliers`, this.form);
      this.showModal = false; await this.loadData();
    },
    async deleteData(id) { if (confirm('Yakin hapus?')) { await axios.delete(`${this.BASE_URL}/suppliers/${id}`); await this.loadData(); } },
    logout() { localStorage.clear(); this.$router.push('/login'); }
  }
};