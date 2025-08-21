import { db } from '../../functions/lib/firebaseAdmin'; // Ensure firebaseAdmin exports db

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Allow CORS for local development. *** IMPORTANT: In production, restrict to your frontend domain! ***
  res.setHeader('Access-Control-Allow-Origin', '*'); // e.g., 'https://your-app-domain.com'
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Basic authentication check (optional but recommended for protected routes)
  // You can add more robust token verification here if needed
  // const idToken = req.headers.authorization?.split('Bearer ')[1];
  // if (!idToken) {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }
  // try {
  //   const decodedToken = await admin.auth().verifyIdToken(idToken);
  //   req.userId = decodedToken.uid; // Add userId to request for later use
  // } catch (error) {
  //   return res.status(401).json({ message: 'Invalid token' });
  // }

  const { mediaId, altText, caption, userId, mediaUrl, imageUrl } = req.body;

  // Basic validation
  if (!mediaId || !userId || (!mediaUrl && !imageUrl)) {
    return res.status(400).json({ message: 'Missing required fields: mediaId, userId, and either mediaUrl or imageUrl' });
  }

  try {
    const mediaRef = db.collection('media').doc(mediaId);

    await mediaRef.set({
      userId: userId, // Ensure this userId comes from a verified source if not from token
      mediaUrl: mediaUrl || imageUrl,
      altText: altText || '',
      caption: caption || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }, { merge: true }); // Use merge: true to avoid overwriting existing fields

    res.status(200).json({ message: 'Media metadata saved successfully!', mediaId: mediaId });
  } catch (error) {
    console.error("Error saving media metadata:", error);
    res.status(500).json({ message: "Internal Server Error", error: error instanceof Error ? error.message : String(error) });
  }
}