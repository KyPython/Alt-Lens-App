// functions/index.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Ensure admin SDK is initialized (usually done at the top level)
admin.initializeApp();

const db = admin.firestore(); // Get Firestore instance
const storage = admin.storage(); // Get Storage instance (less common for direct API, more for triggers)

// HTTP-triggered function to save media metadata
// This function expects a POST request with JSON body containing mediaId, altText, caption, etc.
exports.saveMediaMetadata = functions.https.onRequest(async (request, response) => {
  // Use CORS if your frontend is on a different domain (e.g., localhost during development or Vercel deployment)
  response.set('Access-Control-Allow-Origin', '*'); // Adjust for production

  if (request.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    response.set('Access-Control-Allow-Methods', 'GET, POST');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Max-Age', '3600');
    response.status(204).send('');
    return;
  }

  if (request.method !== 'POST') {
    return response.status(405).send('Method Not Allowed');
  }

  const { mediaId, altText, caption, userId, mediaUrl } = request.body; // Assuming data sent in JSON body

  // Basic validation (add more robust validation as needed)
  if (!mediaId || !userId || !mediaUrl) {
    return response.status(400).send('Missing required fields: mediaId, userId, mediaUrl');
  }

  try {
    const mediaRef = db.collection('media').doc(mediaId); // 'media' collection in Firestore

    await mediaRef.set({
      userId: userId,
      mediaUrl: mediaUrl,
      altText: altText || '', // Default to empty string if not provided
      caption: caption || '',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      // You can add more fields like transcriptionStatus, etc.
    });

    response.status(200).json({ message: 'Media metadata saved successfully!', mediaId: mediaId });

  } catch (error) {
    functions.logger.error("Error saving media metadata:", error);
    response.status(500).send("Internal Server Error: " + error.message);
  }
});

// functions/index.js (within the same file)

exports.processNewMediaUpload = functions.storage.object().onFinalize(async (object) => {
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name;    // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const userId = object.metadata && object.metadata.userId; // Assuming you set custom metadata during upload

  // Exit if this is not an image or if the user ID is missing
  if (!contentType.startsWith('image/') || !userId) {
    functions.logger.log('This is not an image or missing user ID metadata.');
    return null;
  }

  // Example: You could now call an external AI service to generate alt text
  // const generatedAltText = await callAIService(filePath);

  // Then save the reference and metadata to Firestore
  const mediaRef = db.collection('media').doc(); // Auto-generated ID for new document
  await mediaRef.set({
    userId: userId,
    storagePath: filePath,
    mediaUrl: `https://firebasestorage.googleapis.com/v0/b/${fileBucket}/o/${encodeURIComponent(filePath)}?alt=media`,
    // altText: generatedAltText, // If you processed it
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  functions.logger.log(`Processed new media upload: ${filePath} for user: ${userId}`);
  return null;
});