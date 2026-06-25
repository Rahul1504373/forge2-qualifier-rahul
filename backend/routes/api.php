<?php

use App\Http\Controllers\KanbanController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

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

Route::get('/boards', [KanbanController::class, 'index']);
Route::post('/boards', [KanbanController::class, 'storeBoard']);
Route::post('/boards/{board}/lists', [KanbanController::class, 'storeList']);
Route::post('/boards/{board}/members', [KanbanController::class, 'storeMember']);
Route::post('/cards', [KanbanController::class, 'storeCard']);
Route::patch('/cards/{card}', [KanbanController::class, 'updateCard']);
Route::get('/health', function () {
	try {
		DB::connection()->getPdo();

		return response()->json([
			'status' => 'ok',
			'database' => 'up',
		]);
	} catch (\Throwable $exception) {
		return response()->json([
			'status' => 'degraded',
			'database' => 'down',
			'message' => $exception->getMessage(),
		], 503);
	}
});
