# ==========================================
# 🚀 PDF Farm Build Automation Script (PowerShell)
# ==========================================
# This script automates the full build and submission flow for PDF Farm.
# It includes environment checks, dependency validation, EAS build, and TestFlight upload.

$APP_NAME = "PDF Farm"
$PLATFORM = "ios"
$PROFILE = "preview"  # Change to "production" for App Store release
$NODE_VERSION_REQUIRED = 18

Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "🚀 Starting build pipeline for $APP_NAME" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

# --- 1. Verify Node version --------------------------------
Write-Host "`n🔍 Checking Node version..." -ForegroundColor Yellow
$nodeVersion = (node -v) -replace 'v', '' -replace '\..*', ''
if ([int]$nodeVersion -lt $NODE_VERSION_REQUIRED) {
    Write-Host "❌ Node version too low. Please use Node $NODE_VERSION_REQUIRED or higher." -ForegroundColor Red
    exit 1
} else {
    Write-Host "✅ Node version OK: $(node -v)" -ForegroundColor Green
}

# --- 2. Dependency validation ------------------------------
Write-Host "`n📦 Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm install failed" -ForegroundColor Red
    exit 1
}

Write-Host "`n🩺 Running expo doctor..." -ForegroundColor Yellow
npx expo-doctor
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Expo doctor found issues" -ForegroundColor Yellow
}

# --- 3. Project configuration check ------------------------
Write-Host "`n🧩 Validating project config..." -ForegroundColor Yellow
npx expo config --type public
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Expo config validation failed" -ForegroundColor Red
    exit 1
}

# --- 4. Clear Metro cache ----------------------------------
Write-Host "`n🧹 Clearing Metro cache..." -ForegroundColor Yellow
npx expo start -c --non-interactive
Start-Sleep -Seconds 2
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue

# --- 5. EAS login and configuration ------------------------
Write-Host "`n🔐 Checking EAS authentication..." -ForegroundColor Yellow
eas whoami
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Not logged into EAS. Please run: eas login" -ForegroundColor Red
    exit 1
}

Write-Host "`n⚙️  Checking EAS build configuration..." -ForegroundColor Yellow
eas build:inspect --platform $PLATFORM --profile $PROFILE
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Build inspection had warnings, but continuing..." -ForegroundColor Yellow
}

# --- 6. Start build ----------------------------------------
Write-Host "`n🚀 Starting EAS build for $PLATFORM ($PROFILE)..." -ForegroundColor Cyan
eas build -p $PLATFORM --profile $PROFILE --non-interactive

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Build failed. Please check logs above." -ForegroundColor Red
    exit 1
} else {
    Write-Host "`n✅ Build completed successfully!" -ForegroundColor Green
}

# --- 7. Submit to TestFlight -------------------------------
Write-Host "`n📤 Ready to submit build to TestFlight" -ForegroundColor Cyan
Write-Host "Run manually: eas submit -p $PLATFORM" -ForegroundColor Yellow

# --- 8. Completion summary ---------------------------------
Write-Host "`n=================================================" -ForegroundColor Cyan
Write-Host "🎉 $APP_NAME build process complete!" -ForegroundColor Green
Write-Host "📱 Profile: $PROFILE" -ForegroundColor White
Write-Host "📦 Platform: $PLATFORM" -ForegroundColor White
Write-Host "✅ Build uploaded to EAS" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Run: eas submit -p ios" -ForegroundColor White
Write-Host "2. Check App Store Connect → TestFlight" -ForegroundColor White
Write-Host "3. Add internal testers" -ForegroundColor White
Write-Host "=================================================" -ForegroundColor Cyan

