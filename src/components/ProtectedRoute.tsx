import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import Login from '@/components/Login';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="bg-gradient-hero p-4 rounded-full mb-4 mx-auto w-fit"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <Heart className="w-8 h-8 text-white" />
      </motion.div>
      <h2 className="font-playfair text-xl font-semibold bg-gradient-hero bg-clip-text text-transparent">
        Loading LoveLense...
      </h2>
    </motion.div>
  </div>
);

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Login />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
