import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Heart } from 'lucide-react';
import Button from './Button';
import { useGiftStore } from '@/lib/store';
import { toast } from 'sonner';

const MessageGenerator = () => {
  const { giftData, updateGiftData } = useGiftStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const romanticMessages = {
    birthday: [
      "Another year of loving you, and my heart still skips a beat every time I see you. Happy Birthday, beautiful! 💕",
      "On your special day, I want you to know that you're not just getting older, you're getting more wonderful. Happy Birthday! 🎂",
      "Every day with you feels like a celebration, but today is extra special because it's YOUR day! Happy Birthday, my love! ✨"
    ],
    anniversary: [
      "From our first hello to this very moment, every second with you has been a treasure. Happy Anniversary, my heart! 💖",
      "Time may pass, but my love for you only grows stronger. Here's to many more beautiful years together! 💕",
      "In a world full of temporary things, you are my forever. Happy Anniversary, my darling! 🌹"
    ],
    'just-because': [
      "No special reason needed to tell you that you're the most amazing person in my world. I love you! 💝",
      "Just wanted to remind you that you're my sunshine on cloudy days and my peace in chaotic moments. 🌞",
      "Because loving you is the easiest and most natural thing I've ever done. You're incredible! ✨"
    ],
    valentine: [
      "You're not just my Valentine, you're my every day, my always, and my forever. I love you endlessly! 💘",
      "Roses are red, violets are blue, but nothing compares to my love for you! Happy Valentine's Day! 🌹",
      "In a world of billions, my heart chose you. Happy Valentine's Day, my one and only! 💖"
    ],
    'long-distance': [
      "Miles apart but close at heart. Distance means nothing when someone means everything. Missing you! 🌙",
      "Every night I look at the same stars you see, knowing we're under the same sky brings me comfort. I love you! ⭐",
      "No amount of distance can diminish the love I have for you. You're always in my thoughts and heart! 💕"
    ],
    apology: [
      "I'm sorry for the words left unsaid and the moments I let slip by. You mean everything to me. 🌹",
      "My heart aches knowing I've hurt you. Please let me make it right because losing you is not an option. 💔",
      "I promise to do better, love harder, and cherish every moment we have together. Forgive me? 🙏"
    ]
  };

  const generateMessage = async () => {
    if (!giftData.occasion) {
      toast.error('Please select an occasion first');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Simulate AI generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const messages = romanticMessages[giftData.occasion as keyof typeof romanticMessages] || romanticMessages['just-because'];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      
      updateGiftData({ message: randomMessage });
      toast.success('Beautiful message generated! ✨');
    } catch (error) {
      toast.error('Failed to generate message');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block font-playfair text-lg font-medium text-foreground">
          Your Message 💌
        </label>
        
        <Button
          variant="soft"
          size="sm"
          onClick={generateMessage}
          isLoading={isGenerating}
          className="text-sm"
        >
          <Wand2 className="w-4 h-4" />
          Generate Message
        </Button>
      </div>
      
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <textarea
          value={giftData.message}
          onChange={(e) => updateGiftData({ message: e.target.value })}
          placeholder="Write your heartfelt message here... or use the generate button for inspiration ✨"
          className="w-full h-32 px-4 py-3 bg-card border border-border rounded-2xl resize-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 font-inter"
          maxLength={500}
        />
        
        <div className="absolute bottom-3 right-3 flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">
            {giftData.message.length}/500
          </span>
          {giftData.message.length > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-primary"
            >
              <Heart className="w-4 h-4" />
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {isGenerating && (
        <motion.div
          className="flex items-center justify-center space-x-2 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <span>Crafting a beautiful message...</span>
        </motion.div>
      )}
    </div>
  );
};

export default MessageGenerator;