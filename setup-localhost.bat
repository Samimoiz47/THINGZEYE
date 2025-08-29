@echo off
echo Setting up THINGZEYE on localhost...
cd /d "c:\Users\DELL\Desktop\THINGZEYE"

echo Creating .env file...
if not exist .env (
    copy .env.example .env
    echo .env file created
) else (
    echo .env file already exists
)

echo Installing PHP dependencies...
call composer install

echo Installing Node.js dependencies...
call npm install

echo Generating application key...
call php artisan key:generate

echo Building frontend assets...
call npm run build

echo Setup complete! Starting development server...
call php artisan serve --host=127.0.0.1 --port=8000

pause
