import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

export const createGift = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated.
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }

  const {
    occasion,
    recipientName,
    message,
    template,
    imageUrl,
    musicUrl,
  } = data;
  const { uid, token } = context.auth;
  const { email } = token;

  // Validate the data
  if (!occasion || !recipientName || !message || !template) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Missing required fields."
    );
  }

  try {
    const giftData = {
      occasion,
      recipientName,
      message,
      template,
      imageUrl: imageUrl || "",
      musicUrl: musicUrl || "",
      createdBy: uid,
      userEmail: email || "",
      isPublic: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const giftRef = await db.collection("gifts").add(giftData);

    return { giftId: giftRef.id };
  } catch (error) {
    console.error("Error creating gift:", error);
    throw new functions.https.HttpsError(
      "internal",
      "An error occurred while creating the gift."
    );
  }
});
