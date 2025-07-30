import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Gift, Calendar, Heart, Music, Image } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { UserDataService, UserProfile, UserGift } from '@/lib/userDataService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const UserDashboard = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userGifts, setUserGifts] = useState<UserGift[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;

      try {
        const [profile, gifts] = await Promise.all([
          UserDataService.getUserProfile(user.uid),
          UserDataService.getUserGifts(user.uid)
        ]);

        setUserProfile(profile);
        setUserGifts(gifts);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="container mx-auto p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto p-6 space-y-8">
        
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border"
        >
          <Avatar className="w-20 h-20">
            <AvatarImage src={user?.photoURL || ''} alt={user?.displayName || ''} />
            <AvatarFallback className="text-2xl">
              <User className="w-8 h-8" />
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h1 className="font-playfair text-3xl font-bold text-foreground mb-2">
              {user?.displayName || 'Love Creator'}
            </h1>
            <p className="text-muted-foreground mb-4">{user?.email}</p>
            
            {userProfile && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Member since {format(userProfile.createdAt, 'MMMM yyyy')}</span>
                <span>•</span>
                <span>{userProfile.giftsCreated} gifts created</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                    <Gift className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{userProfile?.giftsCreated || 0}</p>
                    <p className="text-sm text-muted-foreground">Gifts Created</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{userGifts.reduce((sum, gift) => sum + gift.sharedCount, 0)}</p>
                    <p className="text-sm text-muted-foreground">Times Shared</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Music className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{userProfile?.favoriteMusic?.length || 0}</p>
                    <p className="text-sm text-muted-foreground">Favorite Songs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {userProfile ? Math.floor((Date.now() - userProfile.createdAt.getTime()) / (1000 * 60 * 60 * 24)) : 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Days Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Gifts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair">Your Love Gifts</CardTitle>
            </CardHeader>
            <CardContent>
              {userGifts.length === 0 ? (
                <div className="text-center py-12">
                  <Gift className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">You haven't created any gifts yet.</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Start creating beautiful gifts for your loved ones!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userGifts.map((gift, index) => (
                    <motion.div
                      key={gift.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 border border-border hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => window.open(`/gift/${gift.id}`, '_blank')}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium truncate">For {gift.recipientName}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {gift.occasion}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {gift.message}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          {gift.photoURL && <Image className="w-3 h-3" />}
                          {gift.musicURL && <Music className="w-3 h-3" />}
                        </div>
                        <span>{format(gift.createdAt, 'MMM d, yyyy')}</span>
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Shared {gift.sharedCount} times
                        </span>
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3 text-red-500" />
                          <span className="text-xs font-medium">{gift.template}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
