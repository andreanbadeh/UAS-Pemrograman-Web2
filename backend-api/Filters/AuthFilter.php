<?php
namespace App\Filters;
use App\Models\UserModel;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $authHeader = $request->getHeaderLine('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return service('response')
                ->setStatusCode(401)
                ->setJSON(['status' => 'error', 'message' => 'Token tidak ditemukan']);
        }

        $token = str_replace('Bearer ', '', $authHeader);
        $model = new UserModel();
        $user  = $model->where('token', $token)->first();

        if (!$user) {
            return service('response')
                ->setStatusCode(401)
                ->setJSON(['status' => 'error', 'message' => 'Token tidak valid atau sudah expired']);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {}
}