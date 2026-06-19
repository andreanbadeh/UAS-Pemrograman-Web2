<?php
namespace App\Controllers;
use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;

class AuthController extends ResourceController
{
    // ========================================================
    // Endpoint Login Versi Mata-Mata (Anti Gagal)
    // ========================================================
    public function login()
    {
        $model = new UserModel();
        
        // JURUS SAKTI: Nangkep data dari JSON (VueJS) ATAU Form biasa. 
        // Biar nggak ada lagi cerita data kosong/nggak nyambung!
        $email    = $this->request->getJSON()->email ?? $this->request->getVar('email');
        $password = $this->request->getJSON()->password ?? $this->request->getVar('password');

        // 1. Cek apakah frontend beneran ngirim data
        if (empty($email) || empty($password)) {
            return $this->failUnauthorized('BOS! Frontend VueJS lu gak ngirim data email/password sama sekali!');
        }

        $user = $model->where('email', $email)->first();

        // 2. Cek apakah email ada di database
        if (!$user) {
            return $this->failUnauthorized('BOS! Email ' . $email . ' beneran GAK ADA di database phpMyAdmin!');
        }

        // 3. Cek kecocokan password
        if (!password_verify($password, $user['password'])) {
            return $this->failUnauthorized('BOS! Email ketemu, tapi Password-nya SALAH!');
        }

        // Kalau lolos semua, bikin token versi Andrean
        $token = bin2hex(random_bytes(32));
        $model->update($user['id'], ['token' => $token]);

        return $this->respond([
            'status' => 'success',
            'token'  => $token,
            'user'   => [
                'id'   => $user['id'],
                'name' => $user['name'], 
                'role' => $user['role'],
            ]
        ]);
    }

    // ========================================================
    // Endpoint Logout Asli Bawaan Andrean
    // ========================================================
    public function logout()
    {
        $token = $this->request->getHeaderLine('Authorization');
        $token = str_replace('Bearer ', '', $token);

        $model = new UserModel();
        $user  = $model->where('token', $token)->first();

        if ($user) {
            $model->update($user['id'], ['token' => null]);
        }

        return $this->respond(['status' => 'success', 'message' => 'Logout berhasil']);
    }

    // ========================================================
    // JURUS JALUR BELAKANG KHUSUS ANDREAN
    // ========================================================
    public function buat_akun_andre()
    {
        $db      = \Config\Database::connect();
        $builder = $db->table('users');
        
        $data = [
            'name'     => 'Andrean', 
            'email'    => 'andre@admin.com',
            'password' => password_hash('andre123', PASSWORD_BCRYPT),
            'role'     => 'admin'
        ];

        $builder->insert($data);
        return $this->respond([
            'status' => 'success',
            'message' => 'MANTAP BOS! Akun andre@admin.com dengan password andre123 berhasil dibuat!'
        ]);
    }
}