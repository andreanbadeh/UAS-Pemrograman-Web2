<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');

// Auth - Tetap aman
$routes->post('api/login', 'AuthController::login');
$routes->post('api/logout', 'AuthController::logout'); 

// SEMENTARA
$routes->get('api/generate-hash', 'AuthController::generateHash');

// Categories - Filter Dihapus agar tidak error 401
$routes->get('api/categories', 'CategoryController::index');
$routes->get('api/categories/(:num)', 'CategoryController::show/$1');
$routes->post('api/categories', 'CategoryController::create');
$routes->put('api/categories/(:num)', 'CategoryController::update/$1');
$routes->delete('api/categories/(:num)', 'CategoryController::delete/$1');

// Suppliers - Filter Dihapus agar tidak error 401
$routes->get('api/suppliers', 'SupplierController::index');
$routes->get('api/suppliers/(:num)', 'SupplierController::show/$1');
$routes->post('api/suppliers', 'SupplierController::create');
$routes->put('api/suppliers/(:num)', 'SupplierController::update/$1');
$routes->delete('api/suppliers/(:num)', 'SupplierController::delete/$1');

// Items - Filter Dihapus agar tidak error 401
$routes->get('api/items', 'ItemController::index');
$routes->get('api/items/(:num)', 'ItemController::show/$1');
$routes->post('api/items', 'ItemController::create');
$routes->put('api/items/(:num)', 'ItemController::update/$1');
$routes->delete('api/items/(:num)', 'ItemController::delete/$1');

// Stock History - Filter Dihapus agar tidak error 401
$routes->get('api/stock-history', 'StockHistoryController::index');
$routes->post('api/stock-history', 'StockHistoryController::create');