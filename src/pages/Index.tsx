import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Gift, ArrowRight, Users, Share2 } from 'lucide-react';
import Button from '@/components/Button';
import FloatingHearts from '@/components/FloatingHearts';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Heart,
      title: 'Personal & Heartfelt',
      description: 'Create deeply personal gifts with photos, messages, and music'
    },
    {
      icon: Sparkles,
      title: 'Beautiful Animations',
      description: 'Romantic floating hearts and smooth transitions'
    },
    {
      icon: Share2,
      title: 'Easy Sharing',
      description: 'Share your love gift instantly with a simple link'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-block mb-6"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center shadow-glow mx-auto">
                  <Gift className="w-12 h-12 text-white" />
                </div>
              </motion.div>
              
              <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-gradient mb-6">
                Make Your Love
                <br />
                <span className="text-primary">Unforgettable</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Create heartwarming, shareable digital gifts with photos, personal messages, 
                and beautiful animations. Perfect for birthdays, anniversaries, or just because.
              </p>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    onClick={() => navigate('/create')}
                    className="text-lg px-12 py-6 shadow-glow relative overflow-hidden"
                  >
                    <Heart className="w-5 h-5" />
                    Create Love Gift
                    <ArrowRight className="w-5 h-5" />
                    
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                  </Button>
                </motion.div>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-lg px-8 py-6"
                >
                  <Sparkles className="w-5 h-5" />
                  Learn More
                </Button>
              </div>

              <motion.div
                className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Users className="w-4 h-4" />
                <span>Trusted by lovers worldwide</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-playfair text-3xl md:text-5xl font-bold text-gradient mb-6">
                Why Choose LoveLens?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to create the perfect digital love gift
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="card-romantic text-center group hover:shadow-glow transition-all duration-500"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <motion.div
                    className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-glow"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="font-playfair text-xl font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="card-gift">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gradient mb-6">
                Ready to Create Magic?
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start creating your personalized love gift today. It's free, beautiful, and guaranteed to make someone smile.
              </p>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="xl"
                  onClick={() => navigate('/create')}
                  className="text-xl px-16 py-8 shadow-glow relative overflow-hidden"
                >
                  <Heart className="w-6 h-6" />
                  Start Creating Now
                  <Sparkles className="w-6 h-6" />
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Index;
