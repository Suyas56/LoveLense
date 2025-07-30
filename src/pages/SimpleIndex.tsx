import { motion } from 'framer-motion';
import { Heart, Sparkles, Gift, Music, Image, User } from 'lucide-react';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';

const SimpleIndex = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                className="bg-gradient-hero p-4 rounded-full"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <Heart className="w-12 h-12 text-white" />
              </motion.div>
            </div>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
              LoveLense
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Create magical, personalized gifts that speak from the heart. 
              Transform your love into beautiful digital experiences.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-2">Personal Photos</h3>
              <p className="text-muted-foreground">Upload your favorite memories and moments together</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-2">Romantic Music</h3>
              <p className="text-muted-foreground">Choose from our curated collection or upload your own</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-2">Beautiful Templates</h3>
              <p className="text-muted-foreground">Stunning designs for every special occasion</p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-4"
          >
            <Link to="/create">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="bg-gradient-hero hover:shadow-glow text-white px-8 py-4 text-lg font-medium relative overflow-hidden"
                  size="lg"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Creating Your Gift
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                </Button>
              </motion.div>
            </Link>
            
            <p className="text-sm text-muted-foreground">
              ✨ No credit card required • Free to use • Unlimited gifts
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Romantic Songs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Templates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">∞</div>
              <div className="text-sm text-muted-foreground">Love Stories</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SimpleIndex;
