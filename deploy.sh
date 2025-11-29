#!/bin/bash

# IT OJT Platform - Deployment Script
# This script automates the deployment process on your GoDaddy VPS

set -e  # Exit on any error

echo "=========================================="
echo "IT OJT Platform - Deployment Starting..."
echo "=========================================="

# Configuration
APP_DIR="/var/www/it-ojt-platform"
APP_NAME="it-ojt-platform"
BRANCH="main"  # Change to your production branch

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}→ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if script is run from correct directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# 1. Pull latest code from Git
print_info "Pulling latest code from Git ($BRANCH branch)..."
git fetch origin
git checkout $BRANCH
git pull origin $BRANCH
print_success "Code updated successfully"

# 2. Install/Update dependencies
print_info "Installing dependencies..."
npm install --production
print_success "Dependencies installed"

# 3. Create required directories
print_info "Creating required directories..."
mkdir -p uploads/resumes
mkdir -p uploads/avatars
mkdir -p logs
chmod -R 755 uploads
chmod -R 755 logs
print_success "Directories created and permissions set"

# 4. Run database migrations if any
# Uncomment if you have migrations
# print_info "Running database migrations..."
# npm run migrate
# print_success "Migrations completed"

# 5. Restart application with PM2
print_info "Restarting application..."
if pm2 list | grep -q $APP_NAME; then
    pm2 reload ecosystem.config.js --update-env
    print_success "Application reloaded"
else
    pm2 start ecosystem.config.js
    pm2 save
    print_success "Application started"
fi

# 6. Show application status
print_info "Application status:"
pm2 status

echo ""
echo "=========================================="
print_success "Deployment completed successfully!"
echo "=========================================="
echo ""
echo "Useful commands:"
echo "  pm2 logs $APP_NAME        - View application logs"
echo "  pm2 status               - Check application status"
echo "  pm2 restart $APP_NAME     - Restart application"
echo "  pm2 monit                - Monitor resources"
echo ""
