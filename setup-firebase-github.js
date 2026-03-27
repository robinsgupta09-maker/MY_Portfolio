#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

function log(text, color = 'reset') {
  console.log(`${colors[color]}${text}${colors.reset}`);
}

function printHeader() {
  log('╔════════════════════════════════════════════╗', 'cyan');
  log('║  Firebase GitHub Automation Setup         ║', 'cyan');
  log('╚════════════════════════════════════════════╝', 'cyan');
}

async function main() {
  printHeader();

  // Step 1: Check GitHub CLI
  log('\n[1/3] Checking GitHub CLI...', 'yellow');
  try {
    execSync('gh --version', { stdio: 'pipe' });
    log('✓ GitHub CLI is installed', 'green');
  } catch (err) {
    log('! GitHub CLI not found. Please install it first:', 'yellow');
    log('   npm install -g github-cli', 'cyan');
    log('   OR https://cli.github.com/', 'cyan');
    process.exit(1);
  }

  // Step 2: Check GitHub authentication
  log('\n[2/3] Checking GitHub authentication...', 'yellow');
  try {
    execSync('gh auth status 2>&1', { stdio: 'pipe' });
    log('✓ GitHub CLI authenticated', 'green');
  } catch (err) {
    log('→ Authenticating with GitHub...', 'cyan');
    execSync('gh auth login --web', { stdio: 'inherit' });
  }

  // Step 3: Get Firebase Service Account
  log('\n[3/3] Setting up Firebase Service Account Secret', 'yellow');
  
  log(`
╔════════════════════════════════════════════════════════════╗
║  Firebase Service Account Setup Guide                      ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  1. Open: https://console.firebase.google.com/            ║
║  2. Select project: "portfolio"                           ║
║  3. Click ⚙️  Settings → Project Settings                 ║
║  4. Go to "Service Accounts" tab                          ║
║  5. Click "Generate New Private Key"                      ║
║  6. Copy ENTIRE JSON content                              ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
`, 'cyan');

  let json = '';
  let done = false;

  log('\nPaste the JSON (Ctrl+D when done):', 'yellow');
  
  return new Promise((resolve) => {
    rl.on('line', (line) => {
      json += line + '\n';
    });

    rl.on('close', () => {
      if (!json.trim()) {
        log('\n✗ No JSON provided', 'red');
        process.exit(1);
      }

      try {
        const parsed = JSON.parse(json);
        log('\n✓ JSON is valid', 'green');

        // Add secret
        log('\nAdding secret to GitHub...', 'yellow');
        const cmd = `echo '${json.replace(/'/g, "'\\''")}' | gh secret set FIREBASE_SERVICE_ACCOUNT --repo robinsgupta09-maker/MY_Portfolio`;
        
        try {
          execSync(cmd, { stdio: 'inherit', shell: '/bin/bash' });
          log('\n✓ Secret added successfully!', 'green');
          
          log(`
╔════════════════════════════════════════════════════════════╗
║  ✓ SETUP COMPLETE!                                         ║
╚════════════════════════════════════════════════════════════╝
`, 'green');

          log(`
Next Steps:
───────────
✓ GitHub Actions workflows are ready
✓ Firebase service account secret is configured

To test automatic deployment:
  git add . && git commit -m "Ready for auto-deploy" && git push origin main

View deployment:
  https://github.com/robinsgupta09-maker/MY_Portfolio/actions

Firebase Console:
  https://console.firebase.google.com/
`, 'cyan');

        } catch (err) {
          log('✗ Failed to add secret', 'red');
          console.error(err.message);
          process.exit(1);
        }
      } catch (err) {
        log('\n✗ Invalid JSON format', 'red');
        log(`Error: ${err.message}`, 'red');
        process.exit(1);
      }
    });
  });
}

main().catch(err => {
  log(`Error: ${err.message}`, 'red');
  process.exit(1);
});
