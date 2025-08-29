<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UploadedFile extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'original_name',
        'stored_name',
        'path',
        'size',
        'mime_type',
        'extension',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'size' => 'integer',
    ];

    /**
     * Get the human-readable file size.
     */
    public function getFormattedSizeAttribute()
    {
        $bytes = $this->size;
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];

        for ($i = 0; $bytes > 1024; $i++) {
            $bytes /= 1024;
        }

        return round($bytes, 2) . ' ' . $units[$i];
    }

    /**
     * Get the file icon based on extension.
     */
    public function getFileIconAttribute()
    {
        $icons = [
            'pdf' => 'file-text',
            'doc' => 'file-text',
            'docx' => 'file-text',
            'txt' => 'file-text',
            'jpg' => 'image',
            'jpeg' => 'image',
            'png' => 'image',
            'gif' => 'image',
            'zip' => 'archive',
            'rar' => 'archive',
            '7z' => 'archive',
        ];

        return $icons[$this->extension] ?? 'file';
    }

    /**
     * Check if file is an image.
     */
    public function getIsImageAttribute()
    {
        return in_array($this->extension, ['jpg', 'jpeg', 'png', 'gif']);
    }

    /**
     * Get the URL for the file.
     */
    public function getUrlAttribute()
    {
        return asset('storage/' . $this->path);
    }
}
