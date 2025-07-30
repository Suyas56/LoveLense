import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Heart, Sparkles } from 'lucide-react';
import Button from './Button';
import { toast } from 'sonner';

interface GiftBoxUnlockProps {
  recipientName: string;
  onUnlock: () => void;
}

const GiftBoxUnlock = ({ recipientName, onUnlock }: GiftBoxUnlockProps) => {
  const [input, setInput] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);

  const unlockCodes = [
    'love',
    'open',
    'i love you',
    'love you',
    'open sesame',
    'surprise',
    'gift',
    'heart',
    'beautiful',
    'mine'
  ];

  const handleUnlock = async () => {
    const inputLower = input.toLowerCase().trim();
    
    if (unlockCodes.some(code => inputLower.includes(code))) {
      setIsUnlocking(true);
      toast.success('🎉 Magic words worked! Opening your gift...');
      
      // 5-second delay for suspense
      setTimeout(() => {
        onUnlock();
      }, 5000);
    } else {
      toast.error('Try something sweeter 💌 (Hint: a simple word of love)');
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isUnlocking) {
      handleUnlock();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-romantic p-6">
      <motion.div 
        className="text-center max-w-md mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Gift Box */}
        <motion.div
          className="relative mb-8"
          animate={isUnlocking ? { 
            scale: [1, 1.1, 1.2, 1.3], 
            rotateY: [0, 10, -10, 0] 
          } : { 
            y: [0, -10, 0] 
          }}
          transition={isUnlocking ? { 
            duration: 5, 
            ease: "easeInOut" 
          } : { 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <div className="relative">
            <Gift size={120} className="text-primary mx-auto drop-shadow-lg" />
            
            {/* Floating sparkles */}
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={24} className="text-accent" />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-2 -left-2"
              animate={{ rotate: -360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Heart size={20} className="text-secondary fill-current" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 
          className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          A Special Gift for {recipientName}! 🎁
        </motion.h1>

        {/* Instruction */}
        <motion.p 
          className="text-muted-foreground mb-6 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Type the magic word to unlock your surprise...
        </motion.p>

        {/* Input and Button */}
        {!isUnlocking ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Say something sweet..."
              className="w-full px-4 py-3 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-center text-lg"
              disabled={isUnlocking}
            />
            
            <Button
              onClick={handleUnlock}
              disabled={!input.trim() || isUnlocking}
              className="w-full"
              variant="romantic"
            >
              <Heart className="w-4 h-4" />
              Open My Gift
              <Sparkles className="w-4 h-4" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="animate-pulse">
              <Gift size={80} className="text-primary mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground">
                Opening your gift... ✨
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Get ready for something beautiful!
              </p>
            </div>
          </motion.div>
        )}

        {/* Hint */}
        {!isUnlocking && (
          <motion.p 
            className="text-xs text-muted-foreground mt-4 opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            💡 Hint: It's a simple word that means everything
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default GiftBoxUnlock;