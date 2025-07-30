import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Send, Sparkles, Copy, ExternalLink, Wifi, WifiOff } from 'lucide-react';
import Button from '@/components/Button';
import { useGiftStore } from '@/lib/store';
import { useAuth } from '@/hooks/use-auth';
import { createGiftWithRetry, generateShareableLink, type GiftData } from '@/lib/giftService';
import { getOfflineGift } from '@/lib/offlineService';
import { toast } from 'sonner';

const TestPreviewSimple = () => {
  const navigate = useNavigate();
  const { giftData, resetGiftData } = useGiftStore();
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  // Redirect if no data
  useEffect(() => {
    if (!giftData.recipientName || !giftData.photoURL || !giftData.occasion || !giftData.message) {
      console.log('Missing gift data, redirecting to create:', giftData);
      navigate('/create');
    }
  }, [giftData, navigate]);

  const generateGift = async () => {
    if (!user) {
      toast.error('You must be logged in to create a gift');
      return;
    }

    setIsGenerating(true);
    setGeneratedLink(null);
    setIsOfflineMode(false);
    
    try {
      // Prepare gift data
      const giftData_: GiftData = {
        occasion: giftData.occasion,
        recipientName: giftData.recipientName,
        message: giftData.message,
        template: giftData.template || 'romantic-hearts',
        createdBy: user.uid,
        userEmail: user.email || 'unknown@example.com',
        isPublic: true,
        imageUrl: giftData.photoURL,
        musicUrl: giftData.musicURL
      };

      console.log('Creating gift with robust service...', giftData_);

      // Use the robust gift creation service with retry logic
      const giftId = await createGiftWithRetry(giftData_);
      
      // Check if this is an offline gift
      const isOffline = giftId.startsWith('offline_');
      setIsOfflineMode(isOffline);
      
      const shareableLink = generateShareableLink(giftId);
      
      if (isOffline) {
        // Verify offline storage
        const storedGift = getOfflineGift(giftId);
        console.log('📱 Offline gift verified:', storedGift);
        
        toast.success('📱 Your love gift has been saved offline!', { duration: 5000 });
        toast.info('🔄 Will sync when connection is restored', { duration: 5000 });
      } else {
        toast.success('🎉 Your love gift has been created!', { duration: 5000 });
      }
      
      // Copy link to clipboard automatically
      try {
        await navigator.clipboard.writeText(shareableLink);
        toast.success('📋 Shareable link copied to clipboard!', { duration: 5000 });
      } catch (err) {
        console.log('Clipboard API not available');
      }
      
      // Store the link for display
      setGeneratedLink(shareableLink);
      
      // Navigate to the gift page after a short delay (only for online gifts)
      if (!isOffline) {
        setTimeout(() => {
          navigate(`/gift/${giftId}`);
        }, 2000);
      } else {
        // For offline gifts, show a message about the link not working yet
        toast.info('ℹ️ Link will work once the gift syncs online', { duration: 6000 });
      }
      
      // Reset store after navigation
      setTimeout(() => {
        resetGiftData();
      }, 3000);
      
    } catch (error) {
      console.error('Error creating gift:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Failed to create gift: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Simple Preview Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Gift Preview</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">For:</h3>
              <p>{giftData.recipientName}</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Occasion:</h3>
              <p>{giftData.occasion}</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Message:</h3>
              <p className="text-sm">{giftData.message}</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Photo:</h3>
              {giftData.photoURL && (
                <img 
                  src={giftData.photoURL} 
                  alt="Gift photo" 
                  className="w-full h-32 object-cover rounded"
                />
              )}
            </div>
            
            <div>
              <h3 className="font-semibold">Template:</h3>
              <p>{giftData.template || 'romantic-hearts'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-6"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/create')}
              >
                <ArrowLeft className="w-4 h-4" />
                Edit Gift
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={generateGift}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                >
                  {isGenerating ? (
                    'Creating Magic...'
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Gift
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Offline Mode Indicator */}
          {isOfflineMode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2"
            >
              <WifiOff className="h-4 w-4 text-amber-600" />
              <span className="text-sm text-amber-700">
                Gift saved offline - will sync when connection is restored
              </span>
            </motion.div>
          )}

          {/* Generated Link Display */}
          {generatedLink && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 border rounded-lg ${
                isOfflineMode 
                  ? 'bg-amber-50 border-amber-200' 
                  : 'bg-green-50 border-green-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {isOfflineMode ? (
                  <WifiOff className="h-4 w-4 text-amber-600" />
                ) : (
                  <Wifi className="h-4 w-4 text-green-600" />
                )}
                <span className={`text-sm font-medium ${
                  isOfflineMode ? 'text-amber-800' : 'text-green-800'
                }`}>
                  {isOfflineMode ? 'Gift Saved Offline' : 'Gift Created Successfully!'}
                </span>
              </div>
              
              <div className="flex gap-2">
                <input
                  value={generatedLink}
                  readOnly
                  className="flex-1 px-3 py-2 text-xs border rounded bg-white font-mono"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(generatedLink)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(generatedLink, '_blank')}
                  disabled={isOfflineMode}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
              
              {isOfflineMode && (
                <p className="text-xs text-amber-600 mt-2">
                  This link will work once the gift syncs to the cloud
                </p>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TestPreviewSimple;
