# Firebase Setup Guide

## Quick Setup Steps:

### 1. Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Create a project"
3. Enter project name: "lovelense" (or any name you prefer)
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication
1. In Firebase Console, click "Authentication" from left sidebar
2. Click "Get started" if it's your first time
3. Go to "Sign-in method" tab
4. Click on "Google" provider
5. Toggle "Enable"
6. Select a support email
7. Add authorized domains:
   - `localhost` (should be there by default)
   - `127.0.0.1` (should be there by default)
   - If your app runs on a different port (like 8081), make sure localhost covers all ports
8. Click "Save"

### 3. Get Configuration
1. Click the gear icon (Project Settings)
2. Scroll down to "Your apps" section
3. Click the web icon `</>`
4. Enter app nickname: "lovelense-web"
5. Click "Register app"
6. Copy the `firebaseConfig` object

### 4. Update Environment Variables
1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual Firebase config:

```
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-actual-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-actual-sender-id
VITE_FIREBASE_APP_ID=your-actual-app-id
```

### 5. Enable Firestore (for gift storage)
1. In Firebase Console, click "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select your preferred location
5. Click "Enable"

### 6. Enable Storage (for images/music)
1. In Firebase Console, click "Storage"
2. Click "Get started"
3. Choose "Start in test mode"
4. Select your preferred location
5. Click "Done"

### 7. Restart Development Server
After updating the `.env` file, restart your development server:
```bash
npm run dev
```

## Troubleshooting:

### "Failed to sign in with Google"
- Make sure all environment variables are correctly set
- Check that Google authentication is enabled in Firebase Console
- Ensure your domain is added to authorized domains in Firebase Console

### "Popup blocked"
- Allow popups in your browser settings
- The app will automatically fallback to redirect authentication if popups are blocked
- Try using a different browser

### "Cross-Origin-Opener-Policy errors"
- This is normal in development and will be handled automatically
- The app uses redirect authentication as a fallback
- Make sure your Firebase project has the correct authorized domains

### "Configuration not found"
- Double-check your Firebase configuration values
- Make sure the project ID matches your actual Firebase project

## Security Notes:
- Never commit real Firebase config to public repositories
- Use environment variables for all sensitive data
- Consider setting up Firebase Security Rules for production
