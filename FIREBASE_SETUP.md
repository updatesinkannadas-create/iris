# 🔥 Firebase Setup Guide for IRIS NITK App

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** (or "Add project")
3. Project name: **`irisnitk`**
4. **Disable** Google Analytics (not needed for this app) — or enable if you want
5. Click **"Create project"** → Wait → Click **"Continue"**

## Step 2: Add Web App

1. On the project overview page, click the **Web icon** `</>` (looks like `</>`)
2. App nickname: **`iris-web`**
3. ✅ Check **"Also set up Firebase Hosting"** (optional, skip if not deploying)
4. Click **"Register app"**
5. You'll see your Firebase config — **COPY THIS ENTIRE CONFIG**. It looks like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "irisnitk.firebaseapp.com",
  projectId: "irisnitk",
  storageBucket: "irisnitk.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

6. Click **"Continue to console"**

## Step 3: Enable Google Authentication

1. In Firebase Console, go to **Build → Authentication** (left sidebar)
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Click **"Google"** provider
5. Toggle **"Enable"** ON
6. Set your **Support email** (your Gmail address)
7. Click **"Save"**

## Step 4: Set Up Firestore Database

1. Go to **Build → Firestore Database** (left sidebar)
2. Click **"Create database"**
3. Choose **"Start in test mode"** (we'll secure it later)
4. Select a location closest to you: **`asia-south1` (Mumbai)** is recommended for India
5. Click **"Create"**

## Step 5: Set Up Firebase Storage (for profile photos)

1. Go to **Build → Storage** (left sidebar)
2. Click **"Get started"**
3. Choose **"Start in test mode"**
4. Click **"Next"** → Select location (same as Firestore, e.g., `asia-south1`)
5. Click **"Done"**

## Step 6: Security Rules (after testing)

### Firestore Rules (Build → Firestore → Rules tab):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Storage Rules (Build → Storage → Rules tab):
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /profilePhotos/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Step 7: Give me the config

After completing all the above steps, paste your Firebase config here and I'll wire everything up!

The config looks like this:
```
apiKey: "..."
authDomain: "..."  
projectId: "..."
storageBucket: "..."
messagingSenderId: "..."
appId: "..."
```

---

## What gets stored where:

| Data | Storage |
|------|---------|
| User profile (name, degree, year, etc.) | Firestore → `users/{uid}` |
| Personal info (father name, DOB, etc.) | Firestore → `users/{uid}` |
| Academic info (roll no, registration, etc.) | Firestore → `users/{uid}` |
| Courses list | Firestore → `users/{uid}` (array field) |
| Credits (major/minor) | Firestore → `users/{uid}` |
| Hostel status | Firestore → `users/{uid}` |
| Profile photo | Storage → `profilePhotos/{uid}/photo.jpg` |
| Theme & font size | localStorage (device-specific) |
