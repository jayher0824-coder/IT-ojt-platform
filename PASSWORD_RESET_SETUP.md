# Password Reset System Setup

This guide explains how to configure and use the password reset feature.

## Configuration

### 1. Email Service Setup

The password reset system requires email configuration to send reset links to users.

#### Option A: Gmail (Recommended for Development)

1. **Enable 2-Step Verification** on your Google Account:
   - Go to https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Create an App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password

3. **Update your `.env` file**:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-character-app-password
   CLIENT_URL=http://localhost:3000
   ```

#### Option B: Other Email Providers

For production, consider using:
- **SendGrid**: https://sendgrid.com/
- **AWS SES**: https://aws.amazon.com/ses/
- **Mailgun**: https://www.mailgun.com/

Update the email configuration in `server/api/routes/passwordReset.js`:

```javascript
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

### 2. Environment Variables

Add these variables to your `.env` file:

```env
# Email Configuration (Required for Password Reset)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password

# Client URL (for reset link)
CLIENT_URL=http://localhost:3000
```

For production (Render, Heroku, etc.):
- Set `CLIENT_URL` to your production domain
- Use environment variables in the dashboard (not .env file)

## Usage

### For Users

1. **Request Password Reset**:
   - Click "Forgot Password?" on the login page
   - Enter your email address
   - Check your email for the reset link

2. **Reset Password**:
   - Click the link in the email
   - Enter your new password (minimum 6 characters)
   - Confirm the new password
   - Click "Reset Password"

3. **Login**:
   - Use your new password to login

### Important Notes

- Reset links expire after **1 hour**
- Each reset link can only be used once
- Google OAuth users cannot reset passwords (they must sign in with Google)
- Students must use their Fatima email (@student.fatima.edu.ph)

## API Endpoints

### POST `/api/password-reset/forgot-password`
Request a password reset link.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset link sent to your email"
}
```

### POST `/api/password-reset/reset-password`
Reset the password using a token.

**Request Body:**
```json
{
  "token": "reset-token-from-email",
  "newPassword": "newSecurePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password has been reset successfully"
}
```

### GET `/api/password-reset/verify-reset-token/:token`
Verify if a reset token is valid.

**Response:**
```json
{
  "success": true,
  "message": "Token is valid"
}
```

## Database Schema

The `User` model includes these fields for password reset:

```javascript
{
  resetPasswordToken: String,      // Hashed reset token
  resetPasswordExpires: Date        // Expiration timestamp
}
```

## Security Features

- Tokens are hashed using SHA-256 before storage
- Tokens expire after 1 hour
- Tokens are single-use (deleted after password reset)
- System doesn't reveal if an email exists in the database
- Password requirements enforced on frontend and backend

## Troubleshooting

### Email not sending

1. **Check environment variables**:
   ```bash
   node -e "console.log(process.env.EMAIL_USER, process.env.EMAIL_PASSWORD)"
   ```

2. **Verify Gmail App Password**:
   - Make sure you're using the 16-character app password, not your regular password
   - Check that 2-Step Verification is enabled

3. **Check logs**:
   - Look for error messages in the server console
   - Common errors: "Invalid credentials", "Authentication failed"

### Reset link not working

1. **Check token expiration**: Links expire after 1 hour
2. **Verify CLIENT_URL**: Make sure it matches your frontend URL
3. **Check browser console**: Look for API errors

### Password reset fails

1. **Password requirements**: Minimum 6 characters
2. **Token already used**: Request a new reset link
3. **Google OAuth users**: Cannot reset password, must use Google Sign-In

## Production Deployment

### Render.com

1. Add environment variables in Render Dashboard:
   - `EMAIL_SERVICE=gmail`
   - `EMAIL_USER=your-email@gmail.com`
   - `EMAIL_PASSWORD=your-app-password`
   - `CLIENT_URL=https://your-app.onrender.com`

2. Ensure `nodemailer` is in `package.json` dependencies

### Testing

Test the password reset flow:

```bash
# 1. Request reset
curl -X POST http://localhost:3000/api/password-reset/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# 2. Check email for reset link
# 3. Use token from email to reset password

curl -X POST http://localhost:3000/api/password-reset/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"token-from-email","newPassword":"newPassword123"}'
```

## Files Changed

- `server/database/models/User.js` - Added reset token fields
- `server/api/routes/passwordReset.js` - New password reset API routes
- `server/server.js` - Registered password reset routes
- `client/public/forgot-password.html` - Forgot password page
- `client/public/reset-password.html` - Reset password page
- `client/public/js/app.js` - Added "Forgot Password" link to login form

## Support

For issues or questions:
1. Check server logs for error messages
2. Verify all environment variables are set correctly
3. Test email sending separately using nodemailer
