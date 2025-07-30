import { enableIndexedDbPersistence, connectFirestoreEmulator } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { GiftData } from '@/lib/giftService';

let persistenceEnabled = false;
const isEmulatorMode = false;

export const initializeFirestore = async () => {
  // Check if we're in development mode
  const isDev = import.meta.env.DEV;
  
  console.log('Initializing Firestore...', { isDev });

  // Try to enable offline persistence first
  if (!persistenceEnabled) {
    try {
      await enableIndexedDbPersistence(db);
      persistenceEnabled = true;
      console.log('✅ Firestore offline persistence enabled');
    } catch (err: unknown) {
      const error = err as { code?: string };
      if (error.code === 'failed-precondition') {
        console.warn('❌ Multiple tabs open, persistence not enabled');
      } else if (error.code === 'unimplemented') {
        console.warn('❌ Browser does not support persistence');
      } else {
        console.warn('❌ Persistence failed:', err);
      }
    }
  }

  // If in development and having connection issues, suggest emulator
  if (isDev && !isEmulatorMode) {
    console.log('💡 If having connection issues, consider using Firestore emulator:');
    console.log('   npm install -g firebase-tools');
    console.log('   firebase emulators:start --only firestore');
    
    // Uncomment the next 3 lines to use emulator mode automatically in dev
    // connectFirestoreEmulator(db, 'localhost', 8080);
    // isEmulatorMode = true;
    // console.log('🔧 Connected to Firestore emulator');
  }

  return { persistenceEnabled, isEmulatorMode };
};

export const createOfflineGift = (giftData: GiftData): string => {
  // Generate a unique ID for offline use
  const giftId = 'offline_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  
  // Store in localStorage as backup
  const offlineGift = {
    id: giftId,
    ...giftData,
    createdAt: new Date().toISOString(),
    offline: true
  };
  
  try {
    localStorage.setItem(`gift_${giftId}`, JSON.stringify(offlineGift));
    console.log('✅ Gift stored offline with ID:', giftId);
  } catch (error) {
    console.warn('❌ Could not store gift offline:', error);
  }
  
  return giftId;
};

export const getOfflineGift = (giftId: string) => {
  try {
    const stored = localStorage.getItem(`gift_${giftId}`);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('❌ Could not retrieve offline gift:', error);
  }
  return null;
};
