<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;

class AuthController extends ResourceController
{
    use ResponseTrait;

    public function login()
    {
        $model = new \App\Models\UserModel();
        $email = $this->request->getVar('email');
        $password = $this->request->getVar('password');

        $user = $model->where('email', $email)->first();

        if (!$user) {
            return $this->failNotFound('Email tidak ditemukan');
        }

        // Cek password manual
        if (!password_verify($password, $user['password'])) {
            return $this->fail('Password salah');
        }

        // TANPA JWT, KITA LANGSUNG RESPONSE SUKSES
        return $this->respond([
            'message' => 'Login Berhasil',
            'token'   => 'fake-token-buat-demo', 
            'user'    => [
                'name'  => $user['name'],
                'role'  => $user['role']
            ]
        ]);
    }

    public function buat_akun_andre()
    {
        $db      = \Config\Database::connect();
        $builder = $db->table('users');
        
        $data = [
            'name'     => 'Andre',
            'email'    => 'andre@admin.com',
            'password' => password_hash('andre123', PASSWORD_BCRYPT),
            'role'     => 'admin'
        ];

        $builder->insert($data);
        return $this->respond(['message' => 'MANTAP! Akun andre@admin.com berhasil dibuat.']);
    }
}