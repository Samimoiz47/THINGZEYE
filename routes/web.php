<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FileUploadController;

// Main application routes - accessible to all users (both authenticated and guests)
Route::get('/', function () {
    return view('loading');
})->name('home');

// Loading animation route
Route::get('/loading', function () {
    return view('loading');
})->name('loading');

// Tools & Research page - accessible to all users
Route::get('tools-research', function () {
    return Inertia::render('ToolsResearch');
})->name('tools-research');

// Legacy routes (redirect to tools-research)
Route::get('tools', function () {
    return redirect()->route('tools-research');
})->name('tools');

Route::get('research', function () {
    return redirect()->route('tools-research');
})->name('research');

// Protected routes that require authentication
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('database', function () {
        return Inertia::render('Database');
    })->name('database');

    // File upload routes
    Route::get('/files', [FileUploadController::class, 'index'])->name('files.index');
    Route::post('/files/upload', [FileUploadController::class, 'upload'])->name('files.upload');
    Route::delete('/files/{id}', [FileUploadController::class, 'destroy'])->name('files.destroy');
    Route::get('/files/download/{id}', [FileUploadController::class, 'download'])->name('files.download');
    Route::get('/files/{id}', [FileUploadController::class, 'show'])->name('files.show');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
