@echo off
echo ========================================
echo   Next.js Email Sender - Startup
echo ========================================
echo.

echo Checking setup...
node test-health.js
echo.

echo ========================================
echo Starting development server...
echo ========================================
echo.
echo The app will be available at:
echo   http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

npm run dev
