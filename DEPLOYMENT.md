# 🚀 BrewHouse Deployment Guide: Step-by-Step

This guide will walk you through deploying your **BrewHouse Coffee Shop** application. We will use **Firebase** for the backend services (Auth & Database) and **Vercel** for the frontend hosting.

---

## Part 1: Firebase Setup (The Backend)

1.  **Create a Project**: Go to the [Firebase Console](https://console.firebase.google.com/) and click **"Add project"**. Name it `BrewHouse Cafe`.
2.  **Enable Authentication**:
    *   In the sidebar, go to **Build > Authentication**.
    *   Click **"Get Started"**, then enable **"Email/Password"** as a sign-in method.
3.  **Enable Firestore (Database)**:
    *   Go to **Build > Cloud Firestore**.
    *   Click **"Create database"**.
    *   Set the location closest to you and start in **"Test mode"** (this allows you to read/write during development; you can tighten rules later).
4.  **Create your Web App Config**:
    *   On the Project Overview page, click the **Web icon (`</>`)**.
    *   Register the app (e.g., `brewhouse-web`).
    *   Copy the `firebaseConfig` object values. You will need these for your environment variables.

---

## Part 2: Environment Variables (The Connection)

In your project root, you already have a `.env` file. You need to update it with your actual keys from Part 1:

```env
VITE_FIREBASE_API_KEY=YOUR_KEY_HERE
VITE_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

> [!IMPORTANT]
> **DO NOT** commit your `.env` file to GitHub if it contains real keys. Ensure `.env` is in your `.gitignore` file.

---

## Part 3: Vercel Setup (The Frontend)

1.  **Push to GitHub**: Initialize a Git repository and push your project to a GitHub account.
2.  **Import to Vercel**:
    *   Go to [Vercel](https://vercel.com/) and click **"New Project"**.
    *   Connect your GitHub account and import the repository.
3.  **Configure Build Settings**:
    *   Vercel should automatically detect **Vite**.
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
4.  **Add Environment Variables**:
    *   Before clicking "Deploy", expand the **"Environment Variables"** section.
    *   Add each key from your `.env` file (`VITE_FIREBASE_API_KEY`, etc.).
5.  **Deploy**: Click **"Deploy"**. Your site will be live on a `vercel.app` URL in seconds!

---

## Part 4: Final Touches (The Admin Panel)

To access the **Admin Panel** on your live site:

1.  **Sign Up**: Create an account normally on your live BrewHouse site.
2.  **Elevate Permissions**:
    *   Go to your **Firebase Console > Cloud Firestore**.
    *   Find the `users` collection.
    *   Locate the document with your `uid` (or your email).
    *   Add a field: `role: "admin"` (type: string).
3.  **Refresh**: Log out and log back in on your site. The **Admin** link will now appear in the navigation bar!

---

## Troubleshooting

- **Page Not Found on Refresh**: This is handled by the `vercel.json` file I've already included. It ensures all routes point back to `index.html`.
- **Firebase Permissions**: If you get a "permission-denied" error, check that your Firestore rules in the Firebase console allow reading and writing for authenticated users.

---

### Need Help?
If any step fails, just paste the error here and I'll jump back in! ☕
