import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';
import Button from '@/components/Button';
import { createGiftWithRetry, generateShareableLink, type GiftData } from '@/lib/giftService';
import { getOfflineGift } from '@/lib/offlineService';

const TestGiftGeneration = () => {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string>('');
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  const testGenerateGift = async () => {
    console.log('=== Testing Gift Generation ===');
    console.log('User:', user);
    
    if (!user) {
      toast.error('Please login first');
      return;
    }

    setIsGenerating(true);
    setGeneratedLink('');
    setIsOfflineMode(false);

    try {
      console.log('Creating test gift with robust service...');
      
      const testGiftData: GiftData = {
        occasion: 'just-because',
        recipientName: 'Test Recipient',
        message: 'This is a test gift message to verify the generation functionality works with the new robust service.',
        template: 'romantic-hearts',
        createdBy: user.uid,
        userEmail: user.email || 'unknown@example.com',
        isPublic: true,
        imageUrl: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Test+Photo'
      };

      console.log('Test gift data:', testGiftData);
      
      // Use the robust gift creation service with retry logic
      const giftId = await createGiftWithRetry(testGiftData);
      
      // Check if this is an offline gift
      const isOffline = giftId.startsWith('offline_');
      setIsOfflineMode(isOffline);
      
      const shareableLink = generateShareableLink(giftId);
      setGeneratedLink(shareableLink);
      
      console.log('Gift created successfully!');
      console.log('Gift ID:', giftId);
      console.log('Shareable link:', shareableLink);
      console.log('Mode:', isOffline ? 'Offline' : 'Online');
      
      if (isOffline) {
        // Verify offline storage
        const storedGift = getOfflineGift(giftId);
        console.log('📱 Offline gift verified:', storedGift);
      }
      
      // Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareableLink);
        toast.success(
          <div>
            <div>{isOffline ? '📱 Test gift created offline!' : '🎉 Test gift created online!'}</div>
            <div className="text-xs mt-1">ID: {giftId}</div>
            <div className="text-xs">Link copied to clipboard!</div>
            {isOffline && <div className="text-xs text-amber-600">Will sync when connection restored</div>}
          </div>,
          { duration: 8000 }
        );
      } catch (clipboardError) {
        console.warn('Could not copy to clipboard:', clipboardError);
        toast.success(isOffline ? '📱 Test gift created offline!' : '🎉 Test gift created online!');
      }
      
      // Show the link prominently
      const alertMessage = isOffline 
        ? `Gift created offline!\n\nShareable link:\n${shareableLink}\n\nThis will work once the gift syncs online.\nLink has been copied to clipboard.`
        : `Gift created successfully!\n\nShareable link:\n${shareableLink}\n\nLink has been copied to clipboard.`;
      
      alert(alertMessage);
      
    } catch (error) {
      console.error('Error creating test gift:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Failed to create gift: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        🧪 Test Gift Generation
        {isOfflineMode && <span className="text-amber-500">📱</span>}
      </h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded">
          <h3 className="font-semibold">Debug Info:</h3>
          <p>User: {user ? '✅ Logged in' : '❌ Not logged in'}</p>
          <p>User ID: {user?.uid || 'None'}</p>
          <p>Email: {user?.email || 'None'}</p>
          <p>Status: {isGenerating ? '🔄 Generating...' : '⏱️ Ready'}</p>
          {isOfflineMode && <p className="text-amber-600">Mode: 📱 Offline Mode</p>}
        </div>
        
        <Button 
          onClick={testGenerateGift} 
          className="w-full"
          disabled={isGenerating || !user}
        >
          {isGenerating ? '🔄 Creating Gift...' : '🚀 Test Generate Gift'}
        </Button>

        {generatedLink && (
          <div className={`p-4 border rounded ${
            isOfflineMode 
              ? 'bg-amber-100 border-amber-300' 
              : 'bg-green-100 border-green-300'
          }`}>
            <h3 className={`font-semibold mb-2 ${
              isOfflineMode ? 'text-amber-800' : 'text-green-800'
            }`}>
              {isOfflineMode ? '📱 Gift Created Offline!' : '✅ Gift Generated Online!'}
            </h3>
            <div className={`text-sm break-all ${
              isOfflineMode ? 'text-amber-700' : 'text-green-700'
            }`}>
              <strong>Link:</strong> {generatedLink}
            </div>
            {isOfflineMode && (
              <p className="text-xs text-amber-600 mt-1">
                This gift is saved locally and will sync when connection is restored.
              </p>
            )}
            <button
              onClick={() => navigator.clipboard.writeText(generatedLink)}
              className={`mt-2 px-3 py-1 text-white rounded text-xs hover:opacity-80 ${
                isOfflineMode ? 'bg-amber-600' : 'bg-green-600'
              }`}
            >
              📋 Copy Link
            </button>
          </div>
        )}
        
        <p className="text-sm text-gray-600">
          This will create a test gift with dummy data using the robust generation service with retry logic.
          {isOfflineMode && (
            <span className="block mt-1 text-amber-600">
              Currently in offline mode - gifts will be saved locally.
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default TestGiftGeneration;
