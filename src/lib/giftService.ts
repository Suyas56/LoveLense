import { collection, addDoc, serverTimestamp, enableNetwork } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { createOfflineGift } from '@/lib/offlineService';

export interface GiftData {
  occasion: string;
  recipientName: string;
  message: string;
  template: string;
  createdBy: string;
  userEmail: string;
  isPublic: boolean;
  imageUrl?: string;
  musicUrl?: string;
}

export const createGiftWithRetry = async (giftData: GiftData, maxRetries = 2): Promise<string> => {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt} to create gift online...`);
      
      // Try to ensure network connection
      try {
        await enableNetwork(db);
        console.log('Network enabled for Firestore');
      } catch (networkError) {
        console.warn('Could not enable network, but proceeding...', networkError);
      }
      
      // Add document to Firestore with short timeout
      const docRef = await Promise.race([
        addDoc(collection(db, 'gifts'), {
          ...giftData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Firestore timeout')), 5000)
        )
      ]);
      
      console.log('✅ Gift created online with ID:', docRef.id);
      return docRef.id;
      
    } catch (error: unknown) {
      lastError = error as Error;
      console.error(`❌ Attempt ${attempt} failed:`, error);
      
      // If it's the last attempt, fall back to offline mode
      if (attempt === maxRetries) {
        console.log('🔄 All online attempts failed, creating offline gift...');
        const offlineId = createOfflineGift(giftData);
        console.log('✅ Gift created offline with ID:', offlineId);
        return offlineId;
      }
      
      // Wait before retrying (shorter delays for faster fallback)
      const delay = attempt * 1000; // 1s, 2s
      console.log(`⏳ Waiting ${delay}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // Fallback to offline if all retries failed
  console.log('🔄 Creating offline gift as final fallback...');
  const offlineId = createOfflineGift(giftData);
  return offlineId;
};

export const generateShareableLink = (giftId: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/gift/${giftId}`;
};
