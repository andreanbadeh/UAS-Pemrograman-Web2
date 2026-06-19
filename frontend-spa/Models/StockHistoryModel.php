<?php
namespace App\Models;
use CodeIgniter\Model;

class StockHistoryModel extends Model
{
    protected $table      = 'stock_history';
    protected $primaryKey = 'id';
    protected $allowedFields = ['item_id', 'user_id', 'type', 'quantity', 'note'];
    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = '';
}