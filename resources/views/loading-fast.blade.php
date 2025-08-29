<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Loading - {{ config('app.name', 'ThingzEye') }}</title>
    
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    
    <link rel="stylesheet" href="{{ asset('css/loading-styles.css') }}">
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #000;
            font-family: 'Arial', sans-serif;
        }
    </style>
</head>
<body>
    <iframe src="/loading-animation-fast.html" 
            style="width: 100%; height: 100vh; border: none; background: #000;">
    </iframe>
    
    <script src="{{ asset('js/loading-manager.js') }}"></script>
</body>
</html>
