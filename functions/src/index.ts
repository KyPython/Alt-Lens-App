import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

// Initialize Firebase Admin SDK
admin.initializeApp();

const db = admin.firestore(); // Get Firestore instance

// HTTP-triggered function to save media metadata
// This function expects a POST request with JSON body containing mediaId, altText, caption, etc.
export const saveMediaMetadata = functions.https.onRequest(async (request, response) => {
  // Set CORS headers for local development or specific origins in production
  response.set('Access-Control-Allow-Origin', '*'); // *** IMPORTANT: Change '*' to your frontend domain in production ***

  if (request.method === 'OPTIONS') {
    // Handle CORS preflight requests
    response.set('Access-Control-Allow-Methods', 'GET, POST');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Max-Age', '3600');
    response.status(204).send('');
    return;
  }

  if (request.method !== 'POST') {
    response.status(405).send('Method Not Allowed');
    return;
  }

  // Ensure the request body is present and is a JSON object
  if (!request.body) {
    response.status(400).send('Request body is missing');
    return;
  }

  const { mediaId, altText, caption, userId, mediaUrl, imageUrl } = request.body; // Adjusted for imageUrl instead of mediaUrl if you prefer

  // Basic validation
  if (!mediaId || !userId || (!mediaUrl && !imageUrl)) {
    response.status(400).send('Missing required fields: mediaId, userId, and either mediaUrl or imageUrl');
    return;
  }

  try {
    const mediaRef = db.collection('media').doc(mediaId); // 'media' collection in Firestore

    await mediaRef.set({
      userId: userId,
      mediaUrl: mediaUrl || imageUrl, // Use imageUrl if mediaUrl isn't provided
      altText: altText || '',
      caption: caption || '',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    functions.logger.info("Media metadata saved successfully!", { mediaId, userId }); // Using logger
    response.status(200).json({ message: 'Media metadata saved successfully!', mediaId: mediaId });

  } catch (error: any) { // Use 'any' for error type in catch block for simplicity, or define a specific type
    functions.logger.error("Error saving media metadata:", error);
    response.status(500).send("Internal Server Error: " + error.message);
  }
});