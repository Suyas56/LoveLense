import React, { createContext, useEffect, useState } from 'react';
import { User, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { UserDataService } from '@/lib/userDataService';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Debug Firebase configuration
    console.log('Firebase Config Check:', {
      apiKey: !!auth.app.options.apiKey,
      authDomain: !!auth.app.options.authDomain,
      projectId: auth.app.options.projectId,
    });

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', user ? 'User signed in' : 'User signed out');
      
      setUser(user);
      
      // Create or update user profile when user signs in (but don't block on it)
      if (user) {
        try {
          console.log('Creating/updating user profile...');
          // Don't await this - let it happen in background
          UserDataService.createUserProfile(user).catch(error => {
            console.warn('User profile creation failed (non-blocking):', error);
          });
        } catch (error) {
          console.warn('Error in user profile creation:', error);
        }
      }
      
      setLoading(false);
    }, (error) => {
      console.error('Auth state change error:', error);
      setLoading(false);
    });

    // Check for redirect result on page load
    getRedirectResult(auth)
      .then(async (result) => {
        if (result?.user) {
          console.log('Redirect result received:', result.user.displayName);
          toast.success(`Welcome, ${result.user.displayName}!`);
          // Create user profile for redirect result (non-blocking)
          UserDataService.createUserProfile(result.user).catch(error => {
            console.warn('User profile creation from redirect failed (non-blocking):', error);
          });
        }
      })
      .catch((error) => {
        console.error('Error getting redirect result:', error);
      });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      
      // Check if Firebase is properly configured
      if (!auth.app.options.apiKey || auth.app.options.apiKey === 'your-api-key-here') {
        toast.error('Firebase configuration is not set up. Please check your environment variables.');
        return;
      }
      
      // Try popup first, fallback to redirect if it fails
      try {
        const result = await signInWithPopup(auth, googleProvider);
        toast.success(`Welcome, ${result.user.displayName}!`);
        // Create user profile (non-blocking)
        UserDataService.createUserProfile(result.user).catch(error => {
          console.warn('User profile creation failed (non-blocking):', error);
        });
      } catch (popupError: unknown) {
        const error = popupError as { code?: string };
        if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
          // Fallback to redirect method
          await signInWithRedirect(auth, googleProvider);
          // The redirect result will be handled in useEffect
        } else {
          throw popupError;
        }
      }
    } catch (error: unknown) {
      console.error('Error signing in with Google:', error);
      
      // More specific error messages
      const firebaseError = error as { code?: string; message?: string };
      if (firebaseError.code === 'auth/popup-closed-by-user') {
        toast.error('Sign-in was cancelled. Please try again.');
      } else if (firebaseError.code === 'auth/popup-blocked') {
        toast.error('Popup was blocked. Redirecting to Google sign-in...');
        // Use redirect as fallback
        await signInWithRedirect(auth, googleProvider);
      } else if (firebaseError.code === 'auth/configuration-not-found') {
        toast.error('Google authentication is not properly configured.');
      } else {
        toast.error(`Failed to sign in: ${firebaseError.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out. Please try again.');
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
