import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGiftStore } from '@/lib/store';
import { useAuth } from '@/hooks/use-auth';
import Button from '@/components/Button';

const TestPreviewDirect = () => {
  const navigate = useNavigate();
  const { updateGiftData } = useGiftStore();
  const { user } = useAuth();

  const setupTestData = () => {
    // Fill the store with test data
    updateGiftData({
      recipientName: 'Test Recipient',
      occasion: 'just-because',
      message: 'This is a test message for the preview page to check if the Generate Gift button works correctly with the main Preview page.',
      template: 'romantic-hearts',
      photoURL: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Test+Photo',
      musicURL: undefined,
      photoFile: null,
      musicFile: null
    });

    console.log('✅ Test data set in store');
    
    // Navigate to the main preview page (not the simple one)
    navigate('/preview');
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">🧪 Test Preview Page Direct</h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded">
          <h3 className="font-semibold">Debug Info:</h3>
          <p>User: {user ? '✅ Logged in' : '❌ Not logged in'}</p>
          <p>User ID: {user?.uid || 'None'}</p>
          <p>Email: {user?.email || 'None'}</p>
        </div>
        
        <Button 
          onClick={setupTestData} 
          className="w-full"
          disabled={!user}
        >
          🚀 Setup Test Data & Go to Preview
        </Button>
        
        <p className="text-sm text-gray-600">
          This will fill the gift store with test data and navigate directly to the preview page 
          where you can test the "Generate Gift" button.
        </p>
      </div>
    </div>
  );
};

export default TestPreviewDirect;
