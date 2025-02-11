<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ApartmentController;
use App\Http\Controllers\ReservationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/reservas', function () {
    return response()->json([
        ['id' => 1, 'cliente' => 'Juan', 'habitacion' => '101'],
        ['id' => 2, 'cliente' => 'Ana', 'habitacion' => '202']
    ]);
});

Route::post('/landlord/login', [AuthController::class, 'login']);
Route::post('/landlord/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/apartments', [ApartmentController::class, 'index']);
Route::post('/apartments', [ApartmentController::class, 'store'])->middleware('auth:sanctum');

Route::post('/reservations', [ReservationController::class, 'store']);