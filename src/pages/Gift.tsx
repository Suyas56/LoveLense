import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { Share2, Heart, ArrowLeft, Download } from 'lucide-react';
import TemplateRenderer from '@/components/TemplateRenderer';
import Button from '@/components/Button';
import GiftBoxUnlock from '@/components/GiftBoxUnlock';
import FloatingHearts from '@/components/FloatingHearts';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';

interface GiftData {
  recipientName: string;
  occasion: string;
  message: string;
  photoURL: string;
  musicURL: string;
  template: string;
  createdAt: any;
}

const Gift = () => {
  const { giftId } = useParams<{ giftId: string }>();
  const navigate = useNavigate();
  const [giftData, setGiftData] = useState<GiftData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const fetchGift = async () => {
      if (!giftId) {
        setError('Invalid gift ID');
        setLoading(false);
        return;
      }

      try {
        const giftDoc = await getDoc(doc(db, 'gifts', giftId));
        
        if (giftDoc.exists()) {
          setGiftData(giftDoc.data() as GiftData);
        } else {
          setError('Gift not found');
        }
      } catch (err) {
        console.error('Error fetching gift:', err);
        setError('Failed to load gift');
      } finally {
        setLoading(false);
      }
    };

    fetchGift();
  }, [giftId]);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const shareGift = async () => {
    const url = window.location.href;
    const title = `A special gift from someone who loves you ❤️`;
    const text = `${giftData?.recipientName}, someone created a beautiful love gift just for you!`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success('Gift link copied to clipboard! 💕');
      } catch (err) {
        toast.error('Failed to copy link');
      }
    }
  };

  const downloadImage = async () => {
    if (!giftData?.photoURL) return;
    
    try {
      const response = await fetch(giftData.photoURL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `love-gift-${giftData.recipientName}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
      toast.success('Photo downloaded! 📸');
    } catch (err) {
      toast.error('Failed to download photo');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <div>
            <h2 className="font-playfair text-2xl font-bold text-gradient mb-2">
              Loading your gift...
            </h2>
            <p className="text-muted-foreground">
              Preparing something beautiful ✨
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error || !giftData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center space-y-6 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 bg-gradient-romantic rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-12 h-12 text-primary" />
          </div>
          
          <div>
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-4">
              Oops! Gift Not Found
            </h2>
            <p className="text-muted-foreground mb-6">
              This love gift might have been moved or doesn't exist anymore.
            </p>
          </div>

          <div className="space-y-3">
            <Button onClick={() => navigate('/')} className="w-full">
              <ArrowLeft className="w-4 h-4" />
              Go Home
            </Button>
            <Button variant="soft" onClick={() => navigate('/create')} className="w-full">
              Create Your Own Gift
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <FloatingHearts />
      
      {!isUnlocked ? (
        <GiftBoxUnlock 
          recipientName={giftData.recipientName} 
          onUnlock={handleUnlock} 
        />
      ) : (
        <>
          <TemplateRenderer
            recipientName={giftData.recipientName}
            occasion={giftData.occasion}
            message={giftData.message}
            photoURL={giftData.photoURL}
            musicURL={giftData.musicURL}
            template={giftData.template}
            isPreview={false}
          />

          {/* Floating Action Buttons */}
          <motion.div
            className="fixed bottom-6 right-6 flex flex-col gap-3 z-20"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <Button
              onClick={shareGift}
              variant="romantic"
              size="sm"
              className="shadow-lg"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            
            {giftData.photoURL && (
              <Button
                onClick={downloadImage}
                variant="soft"
                size="sm"
                className="shadow-lg"
              >
                <Download className="w-4 h-4" />
              </Button>
            )}
          </motion.div>

          {/* Create Your Own Gift CTA */}
          <motion.div
            className="fixed bottom-6 left-6 z-20"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
          >
            <Button
              onClick={() => navigate('/create')}
              variant="outline"
              size="sm"
              className="shadow-lg backdrop-blur-sm"
            >
              <Heart className="w-4 h-4" />
              Create Your Own
            </Button>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Gift;