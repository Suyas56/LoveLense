import { motion } from 'framer-motion';
import { useGiftStore } from '@/lib/store';

const occasions = [
  { id: 'birthday', label: 'Birthday', emoji: '🎂', description: 'Celebrate another year of love' },
  { id: 'anniversary', label: 'Anniversary', emoji: '💕', description: 'Marking special moments together' },
  { id: 'just-because', label: 'Just Because', emoji: '💖', description: 'No reason needed for love' },
  { id: 'valentine', label: "Valentine's Day", emoji: '💘', description: 'Express your deepest feelings' },
  { id: 'long-distance', label: 'Missing You', emoji: '🌙', description: 'Bridge the distance with love' },
  { id: 'apology', label: 'I\'m Sorry', emoji: '🌹', description: 'Healing hearts with sincere words' }
];

const OccasionSelector = () => {
  const { giftData, updateGiftData } = useGiftStore();

  return (
    <div className="space-y-4">
      <label className="block font-playfair text-lg font-medium text-foreground">
        Choose Occasion ✨
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {occasions.map((occasion, index) => (
          <motion.div
            key={occasion.id}
            className={`relative cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 ${
              giftData.occasion === occasion.id
                ? 'border-primary bg-gradient-warm shadow-romantic'
                : 'border-border hover:border-primary/50 bg-card'
            }`}
            onClick={() => updateGiftData({ occasion: occasion.id })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start space-x-4">
              <motion.div 
                className="text-3xl"
                animate={giftData.occasion === occasion.id ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                {occasion.emoji}
              </motion.div>
              
              <div className="flex-1">
                <h3 className="font-playfair font-semibold text-lg text-foreground">
                  {occasion.label}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {occasion.description}
                </p>
              </div>
              
              {giftData.occasion === occasion.id && (
                <motion.div
                  className="text-primary"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  ✓
                </motion.div>
              )}
            </div>
            
            {/* Radio input for accessibility */}
            <input
              type="radio"
              name="occasion"
              value={occasion.id}
              checked={giftData.occasion === occasion.id}
              onChange={() => updateGiftData({ occasion: occasion.id })}
              className="sr-only"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OccasionSelector;