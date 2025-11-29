// Fixed API helper function with better error handling
async function apiCall(endpoint, options = {}) {
    const config = {
        method: 'GET',
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };
    
    // Add authorization header if token exists
    if (authToken) {
        config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    try {
        const response = await fetch(API_BASE + endpoint, config);
        
        // Check if response is ok (status 200-299)
        if (!response.ok) {
            // Try to parse error message from response
            let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
            
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData.error || errorMessage;
            } catch (parseError) {
                // If JSON parsing fails, use the default error message
                console.warn('Could not parse error response as JSON');
            }
            
            throw new Error(errorMessage);
        }
        
        const data = await response.json();
        
        // Handle API responses that have a success field
        if (data.hasOwnProperty('success') && !data.success) {
            throw new Error(data.message || 'API call failed');
        }
        
        return data;
        
    } catch (error) {
        // Handle network errors and other fetch-related errors
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error('Network error: Unable to connect to server');
        }
        
        // Re-throw the error to be handled by the calling function
        throw error;
    }
}

// Fixed authentication function
async function handleAuth(event, role) {
    event.preventDefault();
    
    const form = document.getElementById('auth-form');
    const loading = form.querySelector('.loading');
    const submitText = document.getElementById('submit-text');
    const messageDiv = document.getElementById('auth-message');
    const isRegister = document.getElementById('register-tab').classList.contains('bg-[#56AE67]');
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!email || !password) {
        messageDiv.innerHTML = `<div class="text-red-500 text-sm">Please fill in all fields</div>`;
        return;
    }
    
    if (password.length < 6) {
        messageDiv.innerHTML = `<div class="text-red-500 text-sm">Password must be at least 6 characters</div>`;
        return;
    }
    
    // Clear previous messages
    messageDiv.innerHTML = '';
    
    // Show loading
    loading.classList.remove('hidden');
    submitText.textContent = isRegister ? 'Registering...' : 'Logging in...';
    form.querySelector('button[type="submit"]').disabled = true;
    
    try {
        const endpoint = isRegister ? '/auth/register' : '/auth/login';
        const data = await apiCall(endpoint, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                role
            }),
        });
        
        // Store auth data
        authToken = data.token;
        currentUser = data.user;
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('userData', JSON.stringify(currentUser));
        
        // Close modal
        closeModal();
        updateNavigation();
        
        // Handle post-authentication flow
        if (role === 'student' && (data.requiresAssessment || isRegister)) {
            showToast('Registration successful! Please complete the skills assessment.', 'success');
            showAssessmentPage();
        } else {
            showToast(isRegister ? 'Registration successful!' : 'Login successful!', 'success');
            showDashboard();
        }
        
    } catch (error) {
        console.error('Authentication error:', error);
        messageDiv.innerHTML = `<div class="text-red-500 text-sm">${error.message}</div>`;
    } finally {
        // Hide loading
        loading.classList.add('hidden');
        submitText.textContent = isRegister ? 'Register' : 'Login';
        form.querySelector('button[type="submit"]').disabled = false;
    }
}

// Fixed platform statistics loading with fallback
async function loadPlatformStats() {
    try {
        const data = await apiCall('/jobs/stats');
        
        // Update stats if elements exist
        const totalJobsEl = document.getElementById('total-jobs');
        const totalCompaniesEl = document.getElementById('total-companies');
        const totalApplicationsEl = document.getElementById('total-applications');
        
        if (totalJobsEl && data.data) {
            totalJobsEl.textContent = data.data.totalJobs || 0;
        }
        if (totalCompaniesEl && data.data) {
            totalCompaniesEl.textContent = data.data.totalCompanies || 0;
        }
        if (totalApplicationsEl && data.data) {
            totalApplicationsEl.textContent = data.data.totalApplications || 0;
        }
        
    } catch (error) {
        console.error('Error loading platform stats:', error);
        
        // Set fallback values
        const totalJobsEl = document.getElementById('total-jobs');
        const totalCompaniesEl = document.getElementById('total-companies');
        const totalApplicationsEl = document.getElementById('total-applications');
        
        if (totalJobsEl) totalJobsEl.textContent = '0';
        if (totalCompaniesEl) totalCompaniesEl.textContent = '0';
        if (totalApplicationsEl) totalApplicationsEl.textContent = '0';
    }
}

// Fixed assessment status check with better error handling
async function checkAssessmentStatus() {
    try {
        const data = await apiCall('/students/profile');
        
        if (data.data && !data.data.assessmentCompleted) {
            showAssessmentPage();
        } else {
            showDashboard();
        }
        
    } catch (error) {
        console.error('Error checking assessment status:', error);
        
        // If profile doesn't exist or there's an error, show assessment
        if (error.message.includes('404') || error.message.includes('not found')) {
            showAssessmentPage();
        } else {
            // For other errors, show dashboard and let user navigate manually
            showDashboard();
            showToast('Could not verify assessment status. Please check your profile.', 'warning');
        }
    }
}

// Fixed logout function
function logout() {
    try {
        // Clear local storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('theme'); // Optional: keep theme preference
        
        // Reset global variables
        authToken = null;
        currentUser = null;
        
        // Update UI
        updateNavigation();
        showLandingPage();
        showToast('Logged out successfully', 'info');
        
    } catch (error) {
        console.error('Error during logout:', error);
        // Force reload if there's an issue
        window.location.reload();
    }
}

// Fixed initialization with better error handling
function initializeApp() {
    try {
        // Initialize theme
        initializeTheme();
        
        // Check for existing session
        authToken = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (authToken && userData) {
            try {
                currentUser = JSON.parse(userData);
                
                // Validate user data
                if (!currentUser || !currentUser.email) {
                    throw new Error('Invalid user data');
                }
                
                // Apply user's theme preference if available
                if (currentUser.themePreference) {
                    applyTheme(currentUser.themePreference);
                }
                
                updateNavigation();
                
                // Check if user needs assessment
                if (currentUser.role === 'student') {
                    checkAssessmentStatus();
                } else {
                    showDashboard();
                }
                
            } catch (parseError) {
                console.error('Error parsing user data:', parseError);
                // Clear invalid data and show landing page
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                authToken = null;
                currentUser = null;
                showLandingPage();
            }
        } else {
            showLandingPage();
        }
        
        // Load statistics (non-blocking)
        loadPlatformStats();
        
    } catch (error) {
        console.error('Error initializing app:', error);
        showLandingPage();
        showToast('Application initialization error. Some features may not work properly.', 'error');
    }
}

// Add a function to validate API configuration
function validateAPIConfiguration() {
    if (!API_BASE) {
        console.error('API_BASE is not configured');
        return false;
    }
    
    // Check if API_BASE is accessible (basic check)
    if (API_BASE.startsWith('http') && !API_BASE.startsWith(window.location.origin)) {
        console.warn('API_BASE points to external server. Ensure CORS is configured.');
    }
    
    return true;
}

// Call validation on app start
document.addEventListener('DOMContentLoaded', function() {
    if (validateAPIConfiguration()) {
        initializeApp();
    } else {
        showToast('API configuration error. Please check console for details.', 'error');
    }
});
