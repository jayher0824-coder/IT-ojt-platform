#!/usr/bin/env node

/**
 * Render Deployment Diagnostic Tool
 * Run this locally to simulate the production environment and catch errors early
 */

const path = require('path');
const fs = require('fs');

console.log('='.repeat(60));
console.log('RENDER DEPLOYMENT DIAGNOSTIC');
console.log('='.repeat(60));

// 1. Check environment variables
console.log('\n1. CHECKING REQUIRED ENVIRONMENT VARIABLES...\n');

const requiredVars = [
  'NODE_ENV',
  'PORT',
  'MONGODB_URI',
  'JWT_SECRET',
  'SESSION_SECRET',
  'CLIENT_URL',
  'CORS_ORIGIN',
];

const optionalVars = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_CALLBACK_URL',
];

let missingRequired = [];
let missingOptional = [];

requiredVars.forEach(v => {
  if (!process.env[v]) {
    missingRequired.push(v);
    console.log(`❌ ${v}: MISSING`);
  } else {
    const value = process.env[v];
    const display = value.length > 30 ? value.substring(0, 30) + '...' : value;
    console.log(`✅ ${v}: ${display}`);
  }
});

optionalVars.forEach(v => {
  if (!process.env[v]) {
    missingOptional.push(v);
    console.log(`⚠️  ${v}: MISSING (optional)`);
  } else {
    const value = process.env[v];
    const display = value.length > 30 ? value.substring(0, 30) + '...' : value;
    console.log(`✅ ${v}: ${display}`);
  }
});

// 2. Check file system
console.log('\n2. CHECKING PROJECT FILES...\n');

const criticalFiles = [
  'server/server.js',
  'package.json',
  'server/api/routes/auth.js',
  'server/database/models/User.js',
];

criticalFiles.forEach(f => {
  const fullPath = path.join(__dirname, f);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${f}: EXISTS`);
  } else {
    console.log(`❌ ${f}: MISSING`);
  }
});

// 3. Check node_modules
console.log('\n3. CHECKING DEPENDENCIES...\n');

try {
  require('express');
  console.log('✅ express: INSTALLED');
} catch (e) {
  console.log('❌ express: NOT INSTALLED - Run: npm install');
}

try {
  require('mongoose');
  console.log('✅ mongoose: INSTALLED');
} catch (e) {
  console.log('❌ mongoose: NOT INSTALLED - Run: npm install');
}

// 4. Summary
console.log('\n' + '='.repeat(60));
console.log('DIAGNOSTIC SUMMARY');
console.log('='.repeat(60) + '\n');

if (missingRequired.length > 0) {
  console.log(`⚠️  CRITICAL: ${missingRequired.length} required environment variables are missing:`);
  missingRequired.forEach(v => console.log(`   - ${v}`));
  console.log('\n📝 ACTION: Add these to Render Environment variables');
} else {
  console.log('✅ All required environment variables are set');
}

if (missingOptional.length > 0) {
  console.log(`\n⚠️  Optional: ${missingOptional.length} optional variables are missing:`);
  missingOptional.forEach(v => console.log(`   - ${v}`));
  console.log('   (If you use Google OAuth, these must be set)');
}

console.log('\n' + '='.repeat(60));
console.log('Next steps:');
console.log('1. Fix any missing environment variables in Render dashboard');
console.log('2. Check MongoDB Atlas Network Access allows 0.0.0.0/0');
console.log('3. View Render service logs for the actual error');
console.log('4. Test locally: npm start');
console.log('='.repeat(60) + '\n');

process.exit(missingRequired.length > 0 ? 1 : 0);
