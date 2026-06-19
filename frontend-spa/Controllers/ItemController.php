<?php
namespace App\Controllers;
use App\Models\ItemModel;
use App\Models\CategoryModel;
use App\Models\SupplierModel;
use CodeIgniter\RESTful\ResourceController;

class ItemController extends ResourceController
{
    protected $modelName = 'App\Models\ItemModel';
    protected $format    = 'json';

    public function index()
    {
        $items = $this->model
            ->select('items.*, categories.name as category_name, suppliers.name as supplier_name')
            ->join('categories', 'categories.id = items.category_id')
            ->join('suppliers', 'suppliers.id = items.supplier_id')
            ->findAll();
        return $this->respond($items);
    }

    public function show($id = null)
    {
        $data = $this->model
            ->select('items.*, categories.name as category_name, suppliers.name as supplier_name')
            ->join('categories', 'categories.id = items.category_id')
            ->join('suppliers', 'suppliers.id = items.supplier_id')
            ->find($id);
        if (!$data) return $this->failNotFound('Barang tidak ditemukan');
        return $this->respond($data);
    }

    public function create()
    {
        $data = $this->request->getJSON(true);
        if (!$this->model->insert($data)) {
            return $this->failValidationErrors($this->model->errors());
        }
        return $this->respondCreated(['status' => 'success', 'message' => 'Barang berhasil ditambahkan']);
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);
        if (!$this->model->update($id, $data)) {
            return $this->failValidationErrors($this->model->errors());
        }
        return $this->respond(['status' => 'success', 'message' => 'Barang berhasil diupdate']);
    }

    public function delete($id = null)
    {
        if (!$this->model->find($id)) return $this->failNotFound('Barang tidak ditemukan');
        $this->model->delete($id);
        return $this->respondDeleted(['status' => 'success', 'message' => 'Barang berhasil dihapus']);
    }
}