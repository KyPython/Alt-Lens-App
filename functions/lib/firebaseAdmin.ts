import * as admin from 'firebase-admin';

// This check ensures Firebase Admin SDK is initialized only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({ 
      projectId: process.env.FIREBASE_PROJECT_ID!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'), // Handle newline characters
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    }), 
    // Optional: If you need to specify database URL for Realtime Database
    // databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage(); // If you need server-side storage operations

export { auth, db, storage };
