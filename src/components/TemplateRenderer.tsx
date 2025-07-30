import { motion } from 'framer-motion';
import { Heart, Music, Star, Sparkles, Flower, Crown } from 'lucide-react';
import { useEffect, useState } from 'react';
import FloatingHearts from './FloatingHearts';

interface TemplateRendererProps {
  recipientName: string;
  occasion: string;
  message: string;
  photoURL: string;
  musicURL?: string;
  template?: string;
  isPreview?: boolean;
}

const TemplateRenderer = ({
  recipientName,
  occasion,
  message,
  photoURL,
  musicURL,
  template = 'romantic-hearts',
  isPreview = false
}: TemplateRendererProps) => {
  const [musicPlaying, setMusicPlaying] = useState(false);

  const getOccasionText = (occasion: string) => {
    const occasionMap: Record<string, string> = {
      birthday: 'Happy Birthday',
      anniversary: 'Happy Anniversary',
      'just-because': 'Just Because You\'re Amazing',
      valentine: 'Happy Valentine\'s Day',
      'long-distance': 'Thinking of You',
      apology: 'From My Heart'
    };
    return occasionMap[occasion] || 'Something Special for You';
  };

  const getOccasionEmoji = (occasion: string) => {
    const emojiMap: Record<string, string> = {
      birthday: '🎂',
      anniversary: '💕',
      'just-because': '💖',
      valentine: '💘',
      'long-distance': '🌙',
      apology: '🌹'
    };
    return emojiMap[occasion] || '✨';
  };

  const renderTemplate = () => {
    switch (template) {
      case 'romantic-hearts':
        return <RomanticHeartsTemplate />;
      case 'golden-elegance':
        return <GoldenEleganceTemplate />;
      case 'starry-night':
        return <StarryNightTemplate />;
      case 'floral-romance':
        return <FloralRomanceTemplate />;
      case 'modern-minimal':
        return <ModernMinimalTemplate />;
      default:
        return <RomanticHeartsTemplate />;
    }
  };

  // Romantic Hearts Template
  const RomanticHeartsTemplate = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-red-100 relative overflow-hidden">
      <FloatingHearts />
      
      {/* Animated background hearts */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 30 + 20}px`
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        >
          💝
        </motion.div>
      ))}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-pink-600 via-red-500 to-rose-600 bg-clip-text text-transparent mb-4"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {getOccasionText(occasion)} {recipientName} {getOccasionEmoji(occasion)}
          </motion.h1>
        </motion.div>

        {photoURL && (
          <motion.div
            className="mb-12 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                <img src={photoURL} alt={recipientName} className="w-full h-full object-cover" />
              </div>
              
              {/* Heart frame */}
              <motion.div
                className="absolute -inset-6 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Heart className="w-96 h-96 text-pink-400/30" />
              </motion.div>
            </div>
          </motion.div>
        )}

        <motion.div
          className="max-w-2xl mx-auto text-center mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-pink-200">
            <p className="font-playfair text-xl md:text-2xl text-gray-700 leading-relaxed italic">
              "{message}"
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );

  // Golden Elegance Template
  const GoldenEleganceTemplate = () => (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-100 relative overflow-hidden">
      {/* Golden particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
        />
      ))}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div className="mb-6">
            <Crown className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
          </motion.div>
          <motion.h1
            className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent mb-4"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {getOccasionText(occasion)} {recipientName} {getOccasionEmoji(occasion)}
          </motion.h1>
        </motion.div>

        {photoURL && (
          <motion.div
            className="mb-12 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-8 border-gradient-to-r from-yellow-400 to-orange-400">
                <img src={photoURL} alt={recipientName} className="w-full h-full object-cover" />
              </div>
              
              {/* Golden frame */}
              <motion.div
                className="absolute -inset-8 border-4 border-yellow-400/50 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-12 border-2 border-amber-300/30 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}

        <motion.div
          className="max-w-2xl mx-auto text-center mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-yellow-200">
            <p className="font-playfair text-xl md:text-2xl text-amber-800 leading-relaxed italic">
              "{message}"
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );

  // Starry Night Template
  const StarryNightTemplate = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        >
          <Star className="w-4 h-4 text-yellow-200" />
        </motion.div>
      ))}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {getOccasionText(occasion)} {recipientName} {getOccasionEmoji(occasion)}
          </motion.h1>
        </motion.div>

        {photoURL && (
          <motion.div
            className="mb-12 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-purple-300">
                <img src={photoURL} alt={recipientName} className="w-full h-full object-cover" />
              </div>
              
              {/* Starry frame */}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '200px 0px'
                  }}
                  animate={{
                    rotate: [i * 30, i * 30 + 360]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.2
                  }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-200" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          className="max-w-2xl mx-auto text-center mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-purple-300/30">
            <p className="font-playfair text-xl md:text-2xl text-white leading-relaxed italic">
              "{message}"
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );

  // Floral Romance Template
  const FloralRomanceTemplate = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-pink-50 to-rose-100 relative overflow-hidden">
      {/* Floating flowers */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 40 + 30}px`
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
        >
          🌸
        </motion.div>
      ))}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div className="mb-6">
            <Flower className="w-16 h-16 text-pink-600 mx-auto mb-4" />
          </motion.div>
          <motion.h1
            className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-green-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-4"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {getOccasionText(occasion)} {recipientName} {getOccasionEmoji(occasion)}
          </motion.h1>
        </motion.div>

        {photoURL && (
          <motion.div
            className="mb-12 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-pink-300">
                <img src={photoURL} alt={recipientName} className="w-full h-full object-cover" />
              </div>
              
              {/* Floral frame */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '160px 0px'
                  }}
                  animate={{
                    rotate: [i * 45, i * 45 + 360]
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.3
                  }}
                >
                  🌹
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          className="max-w-2xl mx-auto text-center mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-pink-200">
            <p className="font-playfair text-xl md:text-2xl text-green-800 leading-relaxed italic">
              "{message}"
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );

  // Modern Minimal Template
  const ModernMinimalTemplate = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-100 relative overflow-hidden">
      {/* Geometric shapes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 border border-gray-300/30 rounded-lg"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-800 via-slate-700 to-gray-900 bg-clip-text text-transparent mb-4"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {getOccasionText(occasion)} {recipientName} {getOccasionEmoji(occasion)}
          </motion.h1>
        </motion.div>

        {photoURL && (
          <motion.div
            className="mb-12 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img src={photoURL} alt={recipientName} className="w-full h-full object-cover" />
              </div>
              
              {/* Minimal geometric frame */}
              <motion.div
                className="absolute -inset-8 border-2 border-gray-300/50 rounded-2xl"
                animate={{ rotate: [0, 1, 0, -1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}

        <motion.div
          className="max-w-2xl mx-auto text-center mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200">
            <p className="font-sans text-xl md:text-2xl text-gray-700 leading-relaxed">
              "{message}"
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );

  useEffect(() => {
    if (musicURL && !isPreview) {
      const audio = new Audio(musicURL);
      audio.loop = true;
      audio.volume = 0.3;
      
      const playMusic = async () => {
        try {
          await audio.play();
          setMusicPlaying(true);
        } catch (error) {
          console.log('Music autoplay blocked');
        }
      };
      
      playMusic();
      
      return () => {
        audio.pause();
        setMusicPlaying(false);
      };
    }
  }, [musicURL, isPreview]);

  return (
    <div className="relative">
      {renderTemplate()}
      
      {/* Music Indicator */}
      {musicURL && (
        <motion.div
          className="fixed bottom-8 right-8 z-20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <div className="bg-white/20 backdrop-blur-md rounded-full p-4 shadow-soft">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={musicPlaying ? { rotate: 360 } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Music className="w-6 h-6 text-primary" />
              </motion.div>
              {musicPlaying && (
                <div className="flex space-x-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-4 bg-primary rounded-full"
                      animate={{ scaleY: [1, 2, 1] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Preview Badge */}
      {isPreview && (
        <motion.div
          className="fixed top-8 left-8 z-20"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
            Preview Mode
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TemplateRenderer;
