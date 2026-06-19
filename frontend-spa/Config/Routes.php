<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');

// Auth
$routes->post('api/login', 'AuthController::login');
$routes->post('api/logout', 'AuthController::logout', ['filter' => 'authFilter']);


// SEMENTARA - hapus setelah dapat hash
$routes->get('api/generate-hash', 'AuthController::generateHash');

// Categories
$routes->get('api/categories', 'CategoryController::index');
$routes->get('api/categories/(:num)', 'CategoryController::show/$1');
$routes->post('api/categories', 'CategoryController::create', ['filter' => 'authFilter']);
$routes->put('api/categories/(:num)', 'CategoryController::update/$1', ['filter' => 'authFilter']);
$routes->delete('api/categories/(:num)', 'CategoryController::delete/$1', ['filter' => 'authFilter']);

// Suppliers
$routes->get('api/suppliers', 'SupplierController::index');
$routes->get('api/suppliers/(:num)', 'SupplierController::show/$1');
$routes->post('api/suppliers', 'SupplierController::create', ['filter' => 'authFilter']);
$routes->put('api/suppliers/(:num)', 'SupplierController::update/$1', ['filter' => 'authFilter']);
$routes->delete('api/suppliers/(:num)', 'SupplierController::delete/$1', ['filter' => 'authFilter']);

// Items
$routes->get('api/items', 'ItemController::index');
$routes->get('api/items/(:num)', 'ItemController::show/$1');
$routes->post('api/items', 'ItemController::create', ['filter' => 'authFilter']);
$routes->put('api/items/(:num)', 'ItemController::update/$1', ['filter' => 'authFilter']);
$routes->delete('api/items/(:num)', 'ItemController::delete/$1', ['filter' => 'authFilter']);

// Stock History
$routes->get('api/stock-history', 'StockHistoryController::index', ['filter' => 'authFilter']);
$routes->post('api/stock-history', 'StockHistoryController::create', ['filter' => 'authFilter']);
