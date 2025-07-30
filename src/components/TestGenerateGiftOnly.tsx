import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { createGiftWithRetry, generateShareableLink, type GiftData } from '@/lib/giftService';
import { getOfflineGift } from '@/lib/offlineService';
import { toast } from 'sonner';

interface TestResult {
  giftId?: string;
  shareableLink?: string;
  isOffline?: boolean;
  success: boolean;
  error?: string;
}

const TestGenerateGiftOnly = () => {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);

  const testGenerateGift = async () => {
    if (!user) {
      toast.error('Please login first');
      return;
    }

    setIsGenerating(true);
    setResult(null);

    try {
      console.log('🚀 Testing gift generation...');
      
      const testGiftData: GiftData = {
        occasion: 'birthday',
        recipientName: 'Test Person',
        message: 'This is a test gift message to verify the generation functionality works perfectly.',
        template: 'romantic-hearts',
        createdBy: user.uid,
        userEmail: user.email || 'test@example.com',
        isPublic: true,
        imageUrl: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Test',
        musicUrl: undefined
      };

      console.log('Gift data:', testGiftData);
      
      // Test the gift creation service
      const giftId = await createGiftWithRetry(testGiftData);
      console.log('Generated gift ID:', giftId);
      
      // Check if offline
      const isOffline = giftId.startsWith('offline_');
      
      // Generate shareable link
      const shareableLink = generateShareableLink(giftId);
      console.log('Shareable link:', shareableLink);
      
      // If offline, verify storage
      if (isOffline) {
        const storedGift = getOfflineGift(giftId);
        console.log('Offline gift verification:', storedGift);
      }
      
      setResult({
        giftId,
        shareableLink,
        isOffline,
        success: true
      });
      
      toast.success(isOffline ? '📱 Gift created offline!' : '✅ Gift created online!');
      
    } catch (error) {
      console.error('❌ Gift generation failed:', error);
      setResult({
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false
      });
      toast.error('Failed to generate gift');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">🎯 Test Generate Gift Only</h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded">
          <h3 className="font-semibold">Status:</h3>
          <p>User: {user ? '✅ Logged in' : '❌ Not logged in'}</p>
          <p>Email: {user?.email || 'None'}</p>
          <p>State: {isGenerating ? '🔄 Generating...' : '⏱️ Ready'}</p>
        </div>
        
        <button 
          onClick={testGenerateGift} 
          disabled={isGenerating || !user}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isGenerating ? '🔄 Generating...' : '🎯 Test Generate Gift'}
        </button>

        {result && (
          <div className={`p-4 border rounded ${
            result.success 
              ? (result.isOffline ? 'bg-amber-50 border-amber-300' : 'bg-green-50 border-green-300')
              : 'bg-red-50 border-red-300'
          }`}>
            <h3 className="font-semibold mb-2">
              {result.success 
                ? (result.isOffline ? '📱 Offline Result' : '✅ Online Result')
                : '❌ Error'
              }
            </h3>
            
            {result.success ? (
              <div className="space-y-2 text-sm">
                <p><strong>Gift ID:</strong> <code className="bg-gray-200 px-1 rounded">{result.giftId}</code></p>
                <p><strong>Link:</strong> <code className="bg-gray-200 px-1 rounded text-xs break-all">{result.shareableLink}</code></p>
                <p><strong>Mode:</strong> {result.isOffline ? '📱 Offline' : '🌐 Online'}</p>
                
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => navigator.clipboard.writeText(result.shareableLink)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                  >
                    📋 Copy Link
                  </button>
                  <button
                    onClick={() => window.open(result.shareableLink, '_blank')}
                    className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                    disabled={result.isOffline}
                  >
                    🔗 Open Link
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-red-700 text-sm">{result.error}</p>
            )}
          </div>
        )}
        
        <p className="text-sm text-gray-600">
          This test isolates the gift generation logic to verify it works correctly.
        </p>
      </div>
    </div>
  );
};

export default TestGenerateGiftOnly;
