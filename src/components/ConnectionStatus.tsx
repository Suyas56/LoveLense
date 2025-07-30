import React, { useState, useEffect } from 'react';
import { enableNetwork, disableNetwork } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Wifi, WifiOff, AlertCircle } from 'lucide-react';

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [firestoreStatus, setFirestoreStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      checkFirestoreConnection();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setFirestoreStatus('disconnected');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    checkFirestoreConnection();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkFirestoreConnection = async () => {
    try {
      setFirestoreStatus('checking');
      await enableNetwork(db);
      setFirestoreStatus('connected');
    } catch (error) {
      console.error('Firestore connection failed:', error);
      setFirestoreStatus('disconnected');
    }
  };

  const retryConnection = async () => {
    await checkFirestoreConnection();
  };

  if (!isOnline || firestoreStatus === 'disconnected') {
    return (
      <div className="fixed top-4 right-4 z-50 bg-red-100 border border-red-300 rounded-lg p-3 shadow-lg">
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <AlertCircle className="w-5 h-5 text-red-600" />
          ) : (
            <WifiOff className="w-5 h-5 text-red-600" />
          )}
          <div className="text-sm">
            <div className="font-semibold text-red-800">
              {isOnline ? 'Database Connection Issue' : 'No Internet Connection'}
            </div>
            <div className="text-red-600">
              {isOnline ? 'Cannot save gifts right now' : 'Please check your internet'}
            </div>
          </div>
          {isOnline && (
            <button
              onClick={retryConnection}
              className="ml-2 px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
              disabled={firestoreStatus === 'checking'}
            >
              {firestoreStatus === 'checking' ? 'Checking...' : 'Retry'}
            </button>
          )}
        </div>
      </div>
    );
  }

  if (firestoreStatus === 'connected') {
    return (
      <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-300 rounded-lg p-2 shadow-lg">
        <div className="flex items-center space-x-2">
          <Wifi className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-800 font-medium">Connected</span>
        </div>
      </div>
    );
  }

  return null;
};

export default ConnectionStatus;
