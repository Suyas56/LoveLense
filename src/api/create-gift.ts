import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface CreateGiftPayload {
  recipientName: string;
  occasion: string;
  message: string;
  photoURL: string;
  musicURL: string;
  template: string;
}

export const createGift = async (payload: CreateGiftPayload) => {
  try {
    // Validate required fields
    if (!payload.recipientName || !payload.occasion || !payload.message || !payload.photoURL) {
      throw new Error('Missing required fields');
    }

    // Create gift document in Firestore
    const giftDoc = await addDoc(collection(db, 'gifts'), {
      recipientName: payload.recipientName,
      occasion: payload.occasion,
      message: payload.message,
      photoURL: payload.photoURL,
      musicURL: payload.musicURL || '',
      template: payload.template || 'romantic-hearts',
      createdAt: serverTimestamp(),
    });

    return { giftId: giftDoc.id };
  } catch (error) {
    console.error('Error creating gift:', error);
    throw error;
  }
};