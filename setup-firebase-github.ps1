# GitHub CLI Auto-Setup Script for Firebase Deployment

Write-Host "╔════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  Firebase GitHub Automation Setup Script   ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════╝" -ForegroundColor Cyan

$RepoOwner = "robinsgupta09-maker"
$RepoName = "MY_Portfolio"
$SecretName = "FIREBASE_SERVICE_ACCOUNT"

Write-Host "`n[1/4] Installing GitHub CLI..." -ForegroundColor Yellow
try {
    $ghVersion = gh --version 2>$null
    Write-Host "✓ GitHub CLI already installed: $ghVersion" -ForegroundColor Green
} catch {
    Write-Host "Installing GitHub CLI..." -ForegroundColor Yellow
    if ([Environment]::OSVersion.Platform -eq "Win32NT") {
        choco install gh -y 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Host "! Using Winget instead..." -ForegroundColor Yellow
            winget install --id GitHub.cli -e -h 2>$null
        }
    }
}

Write-Host "`n[2/4] GitHub Authentication..." -ForegroundColor Yellow
gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "→ Authenticating with GitHub..." -ForegroundColor Cyan
    gh auth login --web
}

Write-Host "`n[3/4] Getting Firebase Service Account..." -ForegroundColor Yellow
Write-Host @"
╔════════════════════════════════════════════════════════════╗
║  Please follow these steps to get your Firebase Key:       ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  1. Go to: https://console.firebase.google.com/           ║
║  2. Select project: "portfolio"                           ║
║  3. Click ⚙️ (Settings icon) → Project Settings           ║
║  4. Go to "Service Accounts" tab                          ║
║  5. Click "Generate New Private Key"                      ║
║  6. Copy the entire JSON content                          ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
"@

Write-Host "`nPaste Firebase Service Account JSON (press Enter twice when done):`n" -ForegroundColor Cyan
$ServiceAccountJson = ""
$EmptyLineCount = 0

while ($true) {
    $line = Read-Host
    if ([string]::IsNullOrWhiteSpace($line)) {
        $EmptyLineCount++
        if ($EmptyLineCount -ge 2) { break }
    } else {
        $EmptyLineCount = 0
        $ServiceAccountJson += $line + "`n"
    }
}

if ([string]::IsNullOrWhiteSpace($ServiceAccountJson)) {
    Write-Host "✗ No JSON provided. Exiting..." -ForegroundColor Red
    exit 1
}

Write-Host "`n[4/4] Adding Secret to GitHub..." -ForegroundColor Yellow
$ServiceAccountJson | gh secret set $SecretName --repo $RepoOwner/$RepoName

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✓ Secret added successfully!" -ForegroundColor Green
    Write-Host "`nVerifying secret..." -ForegroundColor Cyan
    gh secret list --repo $RepoOwner/$RepoName | grep $SecretName
    
    Write-Host "`n╔════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║  ✓ Setup Complete!                        ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════╝" -ForegroundColor Green
    
    Write-Host @"
Next Steps:
───────────
1. GitHub Actions will run on next push
2. View deploy status: https://github.com/$RepoOwner/$RepoName/actions
3. Check Firebase Console: https://console.firebase.google.com/

To deploy now:
  git add . && git commit -m "Ready for auto-deploy" && git push origin main
"@ -ForegroundColor Cyan
} else {
    Write-Host "✗ Failed to add secret" -ForegroundColor Red
    exit 1
}
