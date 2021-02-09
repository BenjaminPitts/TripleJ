<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('reviews', function () {
    $reviews = DB::select('SELECT * FROM reviews ORDER BY id DESC');
    return $reviews;
});

Route::post('reviews', function (Request $request) {
    DB::insert('INSERT INTO reviews (name, comments, pics) VALUES (?, ?, ?)', [$request->name, $request->comments, $request->pics]);
    $reviews = DB::select('SELECT * FROM reviews ORDER BY id DESC');
    return $reviews;
});

Route::delete('reviews/{id}', function ($id) {
    DB::delete('DELETE FROM reviews WHERE id = ?', [$id]);
    $reviews = DB::select('SELECT * FROM reviews ORDER BY id DESC');
    return $reviews;
});

Route::put('reviews/{id}', function (Request $request, $id) {
    DB::update('UPDATE reviews SET name=?, comments=?, pics=? WHERE id = ?', [$request->name, $request->comments, $request->pics, $id]);
    $reviews = DB::select('SELECT * FROM reviews ORDER BY id DESC');
    return $reviews;
});
