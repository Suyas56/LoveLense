import React, { createContext, useEffect, useState } from 'react';
import { User, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { toast } from 'sonner';

interface SimpleAuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

export const SimpleAuthContext = createContext<SimpleAuthContextType | undefined>(undefined);

interface SimpleAuthProviderProps {
  children: React.ReactNode;
}

export const SimpleAuthProvider: React.FC<SimpleAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Debug Firebase configuration
    console.log('Firebase Config Check:', {
      apiKey: !!auth.app.options.apiKey,
      authDomain: !!auth.app.options.authDomain,
      projectId: auth.app.options.projectId,
    });

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user ? `User: ${user.displayName}` : 'No user');
      setUser(user);
      setLoading(false);
    }, (error) => {
      console.error('Auth state change error:', error);
      setLoading(false);
    });

    // Check for redirect result on page load
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          console.log('Redirect result received:', result.user.displayName);
          toast.success(`Welcome, ${result.user.displayName}!`);
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
      
      console.log('Attempting Google sign-in...');
      
      // Try popup first, fallback to redirect if it fails
      try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log('Popup sign-in successful:', result.user.displayName);
        toast.success(`Welcome, ${result.user.displayName}!`);
      } catch (popupError: unknown) {
        const error = popupError as { code?: string; message?: string };
        console.log('Popup failed, trying redirect:', error.code);
        
        if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
          // Fallback to redirect method
          console.log('Using redirect method...');
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
        try {
          await signInWithRedirect(auth, googleProvider);
        } catch (redirectError) {
          console.error('Redirect also failed:', redirectError);
          toast.error('Authentication failed. Please try again.');
        }
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

  return <SimpleAuthContext.Provider value={value}>{children}</SimpleAuthContext.Provider>;
};
