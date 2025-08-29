<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\UploadedFile;
use Inertia\Inertia;

class FileUploadController extends Controller
{
    /**
     * Display a listing of uploaded files.
     */
    public function index()
    {
        $files = UploadedFile::latest()->get();
        
        return Inertia::render('FileManager', [
            'files' => $files,
        ]);
    }

    /**
     * Handle file upload.
     */
    public function upload(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'files.*' => 'required|file|max:10240|mimes:pdf,docx,jpg,jpeg,png,gif,txt',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $uploadedFiles = [];

        foreach ($request->file('files') as $file) {
            try {
                $originalName = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $fileSize = $file->getSize();
                $mimeType = $file->getMimeType();

                // Generate unique filename
                $filename = time() . '_' . uniqid() . '.' . $extension;
                
                // Store file
                $path = $file->storeAs('uploads', $filename, 'public');

                // Save file info to database
                $uploadedFile = UploadedFile::create([
                    'original_name' => $originalName,
                    'stored_name' => $filename,
                    'path' => $path,
                    'size' => $fileSize,
                    'mime_type' => $mimeType,
                    'extension' => $extension,
                ]);

                $uploadedFiles[] = $uploadedFile;

            } catch (\Exception $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to upload file: ' . $e->getMessage(),
                ], 500);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Files uploaded successfully',
            'files' => $uploadedFiles,
        ]);
    }

    /**
     * Delete uploaded file.
     */
    public function destroy($id)
    {
        try {
            $file = UploadedFile::findOrFail($id);
            
            // Delete from storage
            Storage::disk('public')->delete($file->path);
            
            // Delete from database
            $file->delete();

            return response()->json([
                'success' => true,
                'message' => 'File deleted successfully',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete file: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Download file.
     */
    public function download($id)
    {
        $file = UploadedFile::findOrFail($id);
        
        $filePath = Storage::disk('public')->path($file->path);
        
        return response()->download($filePath, $file->original_name);
    }

    /**
     * Get file information.
     */
    public function show($id)
    {
        $file = UploadedFile::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'file' => $file,
        ]);
    }
}
