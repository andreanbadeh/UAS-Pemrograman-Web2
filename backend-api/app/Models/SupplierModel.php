<?php
namespace App\Models;
use CodeIgniter\Model;

class SupplierModel extends Model
{
    protected $table      = 'suppliers';
    protected $primaryKey = 'id';
    protected $allowedFields = ['name', 'contact', 'phone', 'address'];
    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = '';
}