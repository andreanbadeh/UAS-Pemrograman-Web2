-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 18 Jun 2026 pada 20.50
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_einventory`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `created_at`) VALUES
(1, 'Elektronik', 'Perangkat elektronik dan aksesoris', '2026-06-17 06:03:49'),
(2, 'Furniture', 'Perabotan kantor dan rumah tangga', '2026-06-17 06:03:49'),
(3, 'Alat Tulis', 'Perlengkapan alat tulis kantor (ATK)', '2026-06-17 06:03:49'),
(4, 'Jaringan', 'Perangkat jaringan dan kabel', '2026-06-17 06:03:49');

-- --------------------------------------------------------

--
-- Struktur dari tabel `items`
--

CREATE TABLE `items` (
  `id` int(10) UNSIGNED NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `supplier_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `sku` varchar(50) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `min_stock` int(11) NOT NULL DEFAULT 5,
  `price` decimal(15,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `items`
--

INSERT INTO `items` (`id`, `category_id`, `supplier_id`, `name`, `sku`, `stock`, `min_stock`, `price`, `created_at`) VALUES
(1, 1, 1, 'Laptop Lenovo ThinkPad', 'ELK-001', 10, 3, 8500000.00, '2026-06-17 06:03:49'),
(2, 1, 1, 'Monitor LG 24 inch', 'ELK-002', 15, 5, 2300000.00, '2026-06-17 06:03:49'),
(3, 1, 2, 'Keyboard Mechanical', 'ELK-003', 8, 3, 450000.00, '2026-06-17 06:03:49'),
(4, 2, 2, 'Meja Kantor Minimalis', 'FRN-001', 6, 2, 1200000.00, '2026-06-17 06:03:49'),
(5, 2, 3, 'Kursi Ergonomis', 'FRN-002', 4, 2, 1750000.00, '2026-06-17 06:03:49'),
(6, 3, 3, 'Pulpen Pilot (lusin)', 'ATK-001', 50, 10, 36000.00, '2026-06-17 06:03:49'),
(7, 3, 3, 'Kertas HVS A4 (rim)', 'ATK-002', 30, 10, 55000.00, '2026-06-17 06:03:49'),
(8, 4, 1, 'Switch TP-Link 8 Port', 'NET-001', 5, 2, 320000.00, '2026-06-17 06:03:49');

-- --------------------------------------------------------

--
-- Struktur dari tabel `stock_history`
--

CREATE TABLE `stock_history` (
  `id` int(10) UNSIGNED NOT NULL,
  `item_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `type` enum('masuk','keluar') NOT NULL,
  `quantity` int(11) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `stock_history`
--

INSERT INTO `stock_history` (`id`, `item_id`, `user_id`, `type`, `quantity`, `note`, `created_at`) VALUES
(1, 1, 1, 'masuk', 10, 'Stok awal', '2026-06-17 06:03:49'),
(2, 2, 1, 'masuk', 15, 'Stok awal', '2026-06-17 06:03:49'),
(3, 3, 1, 'masuk', 8, 'Stok awal', '2026-06-17 06:03:49'),
(4, 4, 1, 'masuk', 6, 'Stok awal', '2026-06-17 06:03:49'),
(5, 5, 1, 'masuk', 4, 'Stok awal', '2026-06-17 06:03:49'),
(6, 6, 1, 'masuk', 50, 'Stok awal', '2026-06-17 06:03:49'),
(7, 7, 1, 'masuk', 30, 'Stok awal', '2026-06-17 06:03:49'),
(8, 8, 1, 'masuk', 5, 'Stok awal', '2026-06-17 06:03:49');

-- --------------------------------------------------------

--
-- Struktur dari tabel `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `contact` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `contact`, `phone`, `address`, `created_at`) VALUES
(1, 'PT. Sumber Makmur', 'Budi Santoso', '08123456789', 'Jl. Industri No.10, Jakarta', '2026-06-17 06:03:49'),
(2, 'CV. Maju Bersama', 'Siti Rahayu', '08234567890', 'Jl. Raya Barat No.5, Surabaya', '2026-06-17 06:03:49'),
(3, 'Toko Serba Ada', 'Ahmad Fauzi', '08345678901', 'Jl. Pasar Baru No.22, Bandung', '2026-06-17 06:03:49');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `role` enum('admin','viewer') NOT NULL DEFAULT 'viewer',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `token`, `role`, `created_at`) VALUES
(1, 'Administrator', 'admin@einventory.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NULL, 'admin', '2026-06-17 06:03:49'),
(2, 'Andre', 'andre@admin.com', '$2y$10$DiSoZ9mkZbvyh0Udr8Hh0O/EDl5cvl6SVhVnKmY3YpuOYFx2iTH.G', NULL, 'admin', '2026-06-17 06:43:21');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `fk_item_category` (`category_id`),
  ADD KEY `fk_item_supplier` (`supplier_id`);

--
-- Indeks untuk tabel `stock_history`
--
ALTER TABLE `stock_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_history_item` (`item_id`),
  ADD KEY `fk_history_user` (`user_id`);

--
-- Indeks untuk tabel `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `items`
--
ALTER TABLE `items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `stock_history`
--
ALTER TABLE `stock_history`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `fk_item_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_item_supplier` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `stock_history`
--
ALTER TABLE `stock_history`
  ADD CONSTRAINT `fk_history_item` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_history_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
