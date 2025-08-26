import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Send, Sparkles, Copy, ExternalLink, Wifi, WifiOff } from 'lucide-react';
import Button from '@/components/Button';
// import TemplateRenderer from '@/components/TemplateRenderer';
import DebugInfo from '@/components/DebugInfo';
import { useGiftStore } from '@/lib/store';
import { useAuth } from '@/hooks/use-auth';
import { UserDataService } from '@/lib/userDataService';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, functions } from '@/lib/firebase';
import { httpsCallable } from 'firebase/functions';
import { generateShareableLink, type GiftData } from '@/lib/giftService';
import { getOfflineGift } from '@/lib/offlineService';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

const Preview = () => {
  const navigate = useNavigate();
  const { giftData, resetGiftData } = useGiftStore();
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  // Redirect if no data
  useEffect(() => {
    if (!giftData.recipientName || !giftData.photoURL || !giftData.occasion || !giftData.message) {
      navigate('/create');
    }
  }, [giftData, navigate]);

  const uploadFiles = async () => {
    let finalPhotoURL = giftData.photoURL;
    let finalMusicURL = giftData.musicURL;

    try {
      const giftId = uuidv4();
      // Upload photo if it's a file
      if (giftData.photoFile) {
        finalPhotoURL = await UserDataService.uploadUserFile(
          user!.uid,
          giftData.photoFile,
          'image',
          giftId
        );
      }

      // Upload music if it's a file
      if (giftData.musicFile) {
        finalMusicURL = await UserDataService.uploadUserFile(
          user!.uid,
          giftData.musicFile,
          'music',
          giftId
        );
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      // Continue with existing URLs if upload fails
      toast.error('File upload failed, using preview URLs');
    }

    return { finalPhotoURL, finalMusicURL };
  };

  const generateGift = async () => {
    if (!user) {
      toast.error('You must be logged in to create a gift');
      return;
    }

    setIsGenerating(true);
    setGeneratedLink(null);
    setIsOfflineMode(false);
    
    try {
      const { finalPhotoURL, finalMusicURL } = await uploadFiles();

      // Prepare gift data
      const giftData_: GiftData = {
        occasion: giftData.occasion,
        recipientName: giftData.recipientName,
        message: giftData.message,
        template: giftData.template || 'romantic-hearts',
        createdBy: user.uid,
        userEmail: user.email || 'unknown@example.com',
        isPublic: true,
        imageUrl: finalPhotoURL,
        musicUrl: finalMusicURL
      };

      console.log('Creating gift with cloud function...', giftData_);

      const createGiftFunction = httpsCallable(functions, 'createGift');
      const result = await createGiftFunction(giftData_);
      const giftId = (result.data as any).giftId;

      if (!giftId) {
        throw new Error("Cloud function did not return a giftId.");
      }
      
      const shareableLink = generateShareableLink(giftId);
      
      toast.success('🎉 Your love gift has been created!', { duration: 5000 });
      
      // Copy link to clipboard automatically
      try {
        await navigator.clipboard.writeText(shareableLink);
        toast.success('📋 Shareable link copied to clipboard!', { duration: 5000 });
      } catch (err) {
        console.log('Clipboard API not available');
      }
      
      // Store the link for display
      setGeneratedLink(shareableLink);
      
      // Navigate to the gift page after a short delay
      setTimeout(() => {
        navigate(`/gift/${giftId}`);
      }, 2000);

      // Update user's gift count (non-blocking)
      try {
        await UserDataService.incrementGiftCount(user.uid);
      } catch (err) {
        console.log('Could not update gift count:', err);
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
  };  const sharePreview = () => {
    if (navigator.share) {
      navigator.share({
        title: `A special gift for ${giftData.recipientName}`,
        text: 'Someone created a beautiful love gift for you!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen">
      <DebugInfo />
      
      {/* Simple Preview Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Gift Preview</h1>
            <p className="text-gray-600">Here's how your gift will look</p>
          </div>
          
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-pink-600 mb-2">
                For {giftData.recipientName} 💝
              </h2>
              <p className="text-lg text-gray-700 capitalize">
                {giftData.occasion.replace('-', ' ')}
              </p>
            </div>
            
            {giftData.photoURL && (
              <div className="flex justify-center">
                <img 
                  src={giftData.photoURL} 
                  alt="Gift photo" 
                  className="w-64 h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            )}
            
            <div className="bg-pink-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Your Message:</h3>
              <p className="text-gray-700 leading-relaxed italic">
                "{giftData.message}"
              </p>
            </div>
            
            <div className="text-center text-sm text-gray-500">
              <p>Template: <span className="font-medium">{giftData.template || 'romantic-hearts'}</span></p>
              {giftData.musicURL && <p>🎵 Music included</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border p-6 z-20"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto">
          {/* Generated Link Display */}
          {generatedLink && (
            <motion.div
              className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-green-800">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-semibold">Your Gift is Ready!</span>
                </div>
                <p className="text-sm text-green-700">
                  Share this link with anyone, anywhere in the world:
                </p>
                <div className="flex items-center gap-2 p-2 bg-white rounded border">
                  <code className="flex-1 text-sm font-mono text-gray-800 break-all">
                    {generatedLink}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedLink);
                      toast.success('Link copied! 💕');
                    }}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => window.open(generatedLink, '_blank')}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/create')}
                className="text-muted-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                Edit Gift
              </Button>
              
              <div className="text-center md:text-left">
                <h3 className="font-playfair font-semibold text-foreground">
                  Preview Mode
                </h3>
                <p className="text-sm text-muted-foreground">
                  How your gift will look
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={sharePreview}
                size="sm"
              >
                <Share2 className="w-4 h-4" />
                Share Preview
              </Button>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={generateGift}
                  isLoading={isGenerating}
                  className="bg-gradient-hero hover:shadow-glow relative overflow-hidden"
                  disabled={isGenerating}
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
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                </Button>
              </motion.div>
            </div>

            {/* Offline Mode Indicator */}
            {isOfflineMode && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2"
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
                className={`mt-4 p-4 border rounded-lg ${
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
        </div>
      </motion.div>
    </div>
  );
};

export default Preview;