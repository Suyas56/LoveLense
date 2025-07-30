import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Home, Gift } from "lucide-react";
import Button from "@/components/Button";
import FloatingHearts from "@/components/FloatingHearts";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingHearts />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-32 h-32 bg-gradient-romantic rounded-full flex items-center justify-center mx-auto mb-8 shadow-soft"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-16 h-16 text-primary" />
          </motion.div>
          
          <motion.h1
            className="font-playfair text-6xl font-bold text-gradient mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            404
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="font-playfair text-2xl font-semibold text-foreground mb-4">
              Love Got Lost
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              This page seems to have wandered off into the stars. 
              Let's get you back to spreading love and creating beautiful gifts.
            </p>
          </motion.div>

          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button 
              onClick={() => navigate('/')} 
              className="w-full"
              size="lg"
            >
              <Home className="w-5 h-5" />
              Return to Home
            </Button>
            
            <Button 
              variant="soft" 
              onClick={() => navigate('/create')} 
              className="w-full"
              size="lg"
            >
              <Gift className="w-5 h-5" />
              Create a Love Gift
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
