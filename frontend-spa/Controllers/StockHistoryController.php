<?php
namespace App\Controllers;
use App\Models\StockHistoryModel;
use App\Models\ItemModel;
use CodeIgniter\RESTful\ResourceController;

class StockHistoryController extends ResourceController
{
    protected $modelName = 'App\Models\StockHistoryModel';
    protected $format    = 'json';

    public function index()
    {
        $data = $this->model
            ->select('stock_history.*, items.name as item_name, users.name as user_name')
            ->join('items', 'items.id = stock_history.item_id')
            ->join('users', 'users.id = stock_history.user_id')
            ->orderBy('stock_history.created_at', 'DESC')
            ->findAll();
        return $this->respond($data);
    }

    public function create()
    {
        $data    = $this->request->getJSON(true);
        $itemModel = new ItemModel();
        $item    = $itemModel->find($data['item_id']);

        if (!$item) return $this->failNotFound('Barang tidak ditemukan');

        // Update stok otomatis
        $newStock = $data['type'] === 'masuk'
            ? $item['stock'] + $data['quantity']
            : $item['stock'] - $data['quantity'];

        if ($newStock < 0) return $this->fail('Stok tidak mencukupi');

        $itemModel->update($data['item_id'], ['stock' => $newStock]);
        $this->model->insert($data);

        return $this->respondCreated(['status' => 'success', 'message' => 'Histori stok berhasil dicatat']);
    }
}