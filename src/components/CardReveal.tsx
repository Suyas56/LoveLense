import { motion } from 'framer-motion';
import Button from './Button';

interface CardRevealProps {
  recipientName: string;
  onOpen: () => void;
}

const CardReveal = ({ recipientName, onOpen }: CardRevealProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100 p-6">
      <motion.div
        className="text-center p-8 bg-white rounded-2xl shadow-lg cursor-pointer"
        initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        whileHover={{ scale: 1.05, boxShadow: '0px 20px 40px rgba(0,0,0,0.1)' }}
        onClick={onOpen}
      >
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          A special card for {recipientName}
        </h2>
        <p className="text-muted-foreground mb-8">
          Click to open the card and reveal your message.
        </p>
        <Button onClick={onOpen} variant="romantic" size="lg">
          Open Card
        </Button>
      </motion.div>
    </div>
  );
};

export default CardReveal;
