import { doc, setDoc, getDoc, updateDoc, collection, addDoc, query, where, orderBy, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { User } from 'firebase/auth';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  lastLoginAt: Date;
  giftsCreated: number;
  favoriteMusic?: string[];
  preferences?: {
    theme?: 'light' | 'dark';
    defaultTemplate?: string;
    notifications?: boolean;
  };
}

export interface UserGift {
  id: string;
  recipientName: string;
  occasion: string;
  message: string;
  photoURL?: string;
  musicURL?: string;
  template: string;
  createdAt: Date;
  isShared: boolean;
  sharedCount: number;
}

export class UserDataService {
  // Create or update user profile
  static async createUserProfile(user: User): Promise<void> {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    const userData: Partial<UserProfile> = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      lastLoginAt: new Date(),
    };

    if (!userDoc.exists()) {
      // Create new user profile
      await setDoc(userRef, {
        ...userData,
        createdAt: new Date(),
        giftsCreated: 0,
        favoriteMusic: [],
        preferences: {
          theme: 'light',
          notifications: true,
        },
      });
    } else {
      // Update existing user's last login
      await updateDoc(userRef, {
        lastLoginAt: new Date(),
        displayName: user.displayName || userDoc.data().displayName,
        photoURL: user.photoURL || userDoc.data().photoURL,
      });
    }
  }

  // Get user profile
  static async getUserProfile(uid: string): Promise<UserProfile | null> {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        ...data,
        createdAt: data.createdAt.toDate(),
        lastLoginAt: data.lastLoginAt.toDate(),
      } as UserProfile;
    }
    
    return null;
  }

  // Update user preferences
  static async updateUserPreferences(uid: string, preferences: Partial<UserProfile['preferences']>): Promise<void> {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      preferences: preferences,
    });
  }

  // Add favorite music
  static async addFavoriteMusic(uid: string, musicUrl: string): Promise<void> {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const currentFavorites = userDoc.data().favoriteMusic || [];
      if (!currentFavorites.includes(musicUrl)) {
        await updateDoc(userRef, {
          favoriteMusic: [...currentFavorites, musicUrl],
        });
      }
    }
  }

  // Get user's gifts
  static async getUserGifts(uid: string): Promise<UserGift[]> {
    const giftsQuery = query(
      collection(db, 'gifts'),
      where('createdBy', '==', uid),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(giftsQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as UserGift[];
  }

  // Upload user file (image or music)
  static async uploadUserFile(
    uid: string,
    file: File,
    type: 'image' | 'music',
    giftId?: string
  ): Promise<string> {
    const timestamp = Date.now();
    const fileName = `${uid}/${type}s/${giftId || 'temp'}/${timestamp}_${file.name}`;
    const storageRef = ref(storage, fileName);
    
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }

  // Delete user file
  static async deleteUserFile(fileUrl: string): Promise<void> {
    try {
      const fileRef = ref(storage, fileUrl);
      await deleteObject(fileRef);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

  // Update gift count
  static async incrementGiftCount(uid: string): Promise<void> {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const currentCount = userDoc.data().giftsCreated || 0;
      await updateDoc(userRef, {
        giftsCreated: currentCount + 1,
      });
    }
  }
}
