const Login = {
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden font-sans">
      <!-- Ornamen Latar -->
      <div class="absolute inset-0 z-0">
        <div class="absolute top-0 left-0 w-full h-96 bg-indigo-600 transform -skew-y-6 -translate-y-32"></div>
      </div>

      <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 z-10 border border-gray-100">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 text-3xl mb-4 shadow-inner">📦</div>
          <h2 class="text-3xl font-black text-gray-800 tracking-tight">Login Admin</h2>
          <p class="text-gray-400 text-sm mt-2 font-medium">E-Inventory Enterprise System</p>
        </div>

        <div v-if="errorMsg" class="bg-red-50 border border-red-200 text-red-600 text-sm font-bold px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
          <span>⚠️</span> {{ errorMsg }}
        </div>

        <form @submit.prevent="login" class="space-y-5">
          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Alamat Email</label>
            <input v-model="email" type="email" placeholder="admin@einventory.com" required
              class="w-full border border-gray-300 bg-gray-50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors font-medium text-gray-800" />
          </div>
          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">Kata Sandi</label>
            <input v-model="password" type="password" placeholder="••••••••" required
              class="w-full border border-gray-300 bg-gray-50 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors font-medium text-gray-800" />
          </div>

          <button type="submit" :disabled="loading"
            class="w-full py-3.5 mt-2 rounded-lg font-bold text-white text-sm transition-all bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 disabled:opacity-50">
            {{ loading ? '⏳ Memvalidasi...' : 'Masuk ke Dashboard' }}
          </button>
        </form>

        <div class="text-center mt-8">
          <router-link to="/" class="text-sm font-bold text-indigo-500 hover:text-indigo-700 transition-colors">← Kembali ke Beranda Utama</router-link>
        </div>
      </div>
    </div>
  `,
  data() {
    return { email: '', password: '', errorMsg: '', loading: false }
  },
  methods: {
    async login() {
      this.loading = true; this.errorMsg = '';
      try {
        const res = await axios.post('http://localhost/UAS_Web2_312410341_Andrean/backend-api/public/api/login', {
          email: this.email, password: this.password
        });
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        this.$router.push('/dashboard');
      } catch (e) {
        this.errorMsg = 'Email atau sandi tidak cocok!';
      } finally {
        this.loading = false;
      }
    }
  }
};