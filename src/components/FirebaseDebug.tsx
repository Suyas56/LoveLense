import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FirebaseDebug = () => {
  const [config, setConfig] = useState<{
    apiKey?: string;
    authDomain?: string;
    projectId?: string;
    storageBucket?: string;
    messagingSenderId?: string;
    appId?: string;
    authConfigured?: boolean;
    authReady?: boolean;
  } | null>(null);

  useEffect(() => {
    setConfig({
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.substring(0, 10) + '...',
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID?.substring(0, 10) + '...',
      authConfigured: !!auth.app.options.apiKey,
      authReady: auth.currentUser !== undefined,
    });
  }, []);

  return (
    <Card className="fixed top-4 right-4 w-80 z-50 bg-yellow-50 border-yellow-200">
      <CardHeader>
        <CardTitle className="text-sm">Firebase Debug Info</CardTitle>
      </CardHeader>
      <CardContent className="text-xs space-y-1">
        <div>API Key: {config?.apiKey}</div>
        <div>Auth Domain: {config?.authDomain}</div>
        <div>Project ID: {config?.projectId}</div>
        <div>Storage Bucket: {config?.storageBucket}</div>
        <div>Messaging Sender ID: {config?.messagingSenderId}</div>
        <div>App ID: {config?.appId}</div>
        <div className="border-t pt-1 mt-2">
          <div>Auth Configured: {config?.authConfigured ? '✅' : '❌'}</div>
          <div>Auth Ready: {config?.authReady ? '✅' : '❌'}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FirebaseDebug;
