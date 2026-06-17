# NAMA : ANDREAN PUTRA ARYA 

# NIM : 312410341

# KELAS : I241E

## 📌 Deskripsi Proyek

**E-Inventory** adalah aplikasi web Sistem Manajemen Inventaris Barang berbasis arsitektur *Decoupled* (terpisah antara Backend dan Frontend). Aplikasi ini memungkinkan administrator untuk mengelola data barang, kategori, supplier, stok masuk/keluar, serta melihat histori transaksi stok secara real-time.

**Tema yang dipilih:** Sistem Manajemen Inventaris Barang (E-Inventory)

---

## 🛠️ Teknologi yang Digunakan

| Komponen | Teknologi |
|---|---|
| Backend | PHP — CodeIgniter 4 (RESTful API) |
| Frontend | VueJS 3 (SPA via CDN) |
| UI Framework | TailwindCSS via CDN |
| HTTP Client | Axios |
| Database | MySQL / MariaDB |
| Tools | Postman, phpMyAdmin, XAMPP |

---

## 🗄️ Skema Relasi Database

> **Screenshot skema relasi tabel dari phpMyAdmin Designer:**

<img src="Screenshot/skema_database.png" width="800" alt="Skema Database"/>

### Deskripsi Tabel

| Tabel | Fungsi |
|---|---|
| `users` | Data admin login, menyimpan token autentikasi |
| `categories` | Kategori barang (Elektronik, Furniture, dll) |
| `suppliers` | Data pemasok/vendor barang |
| `items` | Data barang utama, berelasi ke categories & suppliers |
| `stock_history` | Histori transaksi stok masuk/keluar |

### Relasi Antar Tabel
- `categories` → `items` (One to Many)
- `suppliers` → `items` (One to Many)
- `items` → `stock_history` (One to Many)
- `users` → `stock_history` (One to Many)

---

## 🔐 Uji Coba API Token Protection (Error 401)

> **Screenshot pengujian endpoint POST /api/items tanpa token via Postman:**

<img src="Screenshot/eror401.png" width="700" alt="Error 401 Postman"/>

Endpoint yang diproteksi token (POST, PUT, DELETE) akan mengembalikan response:
```json
{
    "status": "error",
    "message": "Token tidak ditemukan"
}
```

---

## 🖥️ Screenshot Antarmuka Aplikasi

### Halaman Beranda (Public)
<img src="Screenshot/dashboard.png" width="800" alt="Halaman Beranda"/>


### Halaman Login
<img src="Screenshot/login.png" width="800" alt="Halaman Login"/>

### Dashboard Admin
<img src="Screenshot/dashboard_admin.png" width="800" alt="Dashboard"/>

### Halaman Barang + Form Modal Tambah/Edit
<img src="Screenshot/barang.png" width="800" alt="Halaman Barang"/>

### Halaman Kategori
<img src="Screenshot/kategori.png" width="800" alt="Halaman Kategori"/>

### Halaman Supplier
<img src="Screenshot/supplier.png" width="800" alt="Halaman Supplier"/>

### Halaman Histori Stok
<img src="Screenshot/histori_stok.png" width="800" alt="Histori Stok"/>

---

## ⚙️ Petunjuk Instalasi

### Prasyarat
- XAMPP (PHP 8.x + MySQL)
- Composer
- Browser modern

### 1. Clone Repository
```bash
git clone https://github.com/[username]/UAS_Web2_[NIM]_[Nama].git
```

### 2. Setup Backend (CodeIgniter 4)
```bash
# Masuk ke folder backend
cd backend-api

# Install dependencies
composer install

# Salin file environment
cp env .env
```

Edit file `.env`:
```env
CI_ENVIRONMENT = development
app.baseURL = 'http://localhost/backend-api/public/'

database.default.hostname = localhost
database.default.database = db_einventory
database.default.username = root
database.default.password =
database.default.DBDriver = MySQLi
database.default.port     = 3306
```

### 3. Import Database
- Buka **phpMyAdmin**
- Import file `db_einventory.sql` yang ada di root repository
- Database `db_einventory` akan otomatis terbuat

### 4. Jalankan Backend
Pastikan **XAMPP** sudah aktif (Apache + MySQL), lalu akses:
```
http://localhost/backend-api/public/
```

### 5. Jalankan Frontend
Buka folder `frontend-spa/` langsung di browser:
```
http://localhost/frontend-spa/
```

### 6. Login Admin Default
```
Email    : andre@einventory.com
Password : andre123
```

---
