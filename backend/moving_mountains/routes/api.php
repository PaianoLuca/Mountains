<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\MountainController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('user/register', [UserController::class, 'register']);
Route::post('user/login', [UserController::class, 'login']);
Route::post('user/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

Route::get('mountains/all', [MountainController::class, 'allMountains'])->middleware('auth:sanctum');
Route::get('mountains/get/{id}', [MountainController::class, 'getMountain'])->middleware('auth:sanctum');
Route::post('mountains/create', [MountainController::class, 'createMountain'])->middleware('auth:sanctum');
Route::put('mountains/edit/{id}', [MountainController::class, 'editMountain'])->middleware('auth:sanctum');
Route::delete('mountains/delete/{id}', [MountainController::class, 'removeMountain'])->middleware('auth:sanctum');