# Project Sistem Manajemen Inventaris Barang (E-Inventory)
NAMA : ANDREAN PUTRA ARYA 

NIM : 312410341

KELAS : I241E

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

![gambar](https://github.com/andreanbadeh/UAS-Pemrograman-Web2/blob/b998869000eac2772e311f22dee7939295733e67/gambar/Screenshot%20(49).png)

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

> **Screenshot pengujian endpoint POST /api/login tanpa token via Postman:**

![gambar](https://github.com/andreanbadeh/UAS-Pemrograman-Web2/blob/b998869000eac2772e311f22dee7939295733e67/gambar/Screenshot%20(50).png)

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
![gambar](https://github.com/andreanbadeh/UAS-Pemrograman-Web2/blob/dd40da3a0b840dcd860e85f775ff454cd7e9c27f/gambar/Screenshot%20(36).png)

### Halaman Login
![gambar](https://github.com/andreanbadeh/UAS-Pemrograman-Web2/blob/dd40da3a0b840dcd860e85f775ff454cd7e9c27f/gambar/Screenshot%20(37).png)

### Dashboard Admin
![gambar](https://github.com/andreanbadeh/UAS-Pemrograman-Web2/blob/dd40da3a0b840dcd860e85f775ff454cd7e9c27f/gambar/Screenshot%20(38).png)

### Halaman Barang
![gambar](https://github.com/andreanbadeh/UAS-Pemrograman-Web2/blob/dd40da3a0b840dcd860e85f775ff454cd7e9c27f/gambar/Screenshot%20(39).png)

### Form Modal Tambah
![gambar](https://github.com/andreanbadeh/UAS-Pemrograman-Web2/blob/dd40da3a0b840dcd860e85f775ff454cd7e9c27f/gambar/2026-06-19%20(2).png)

### Halaman Kategori
![gambar](https://github.com/andreanbadeh/UAS-Pemrograman-Web2/blob/dd40da3a0b840dcd860e85f775ff454cd7e9c27f/gambar/Screenshot%20(41).png)

### Halaman Supplier
![gambar](https://github.com/andreanbadeh/UAS-Pemrograman-Web2/blob/dd40da3a0b840dcd860e85f775ff454cd7e9c27f/gambar/Screenshot%20(42).png)

### Form Mutasi Stok
![gambar](https://github.com/andreanbadeh/UAS-Pemrograman-Web2/blob/dd40da3a0b840dcd860e85f775ff454cd7e9c27f/gambar/Screenshot%20(43).png)

### Halaman Histori Stok
![gambar](https://github.com/andreanbadeh/UAS-Pemrograman-Web2/blob/dd40da3a0b840dcd860e85f775ff454cd7e9c27f/gambar/Screenshot%20(44).png)

---

## ⚙️ Petunjuk Instalasi

### Prasyarat
- XAMPP (PHP 8.x + MySQL)
- Composer
- Browser modern

### 1. Clone Repository
```bash
https://github.com/andreanbadeh/UAS-Pemrograman-Web2.git
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
http://localhost:8080/api/items
```

### 5. Jalankan Frontend
Buka folder `frontend-spa/` langsung di browser:
```
http://localhost/UAS_Web2_312410341_Andrean/frontend-spa/#/
```

### 6. Login Admin Default
```
Email    : andre@admin.com
Password : andre123
```

### 7. Backend

![gambar](https://github.com/andreanbadeh/UAS-Pemrograman-Web2/blob/b998869000eac2772e311f22dee7939295733e67/gambar/Screenshot%20(52).png)
