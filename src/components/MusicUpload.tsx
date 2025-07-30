import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, Upload, X, Play, Pause, Heart, Sparkles } from 'lucide-react';
import Button from './Button';
import { useGiftStore } from '@/lib/store';
import { useAuth } from '@/hooks/use-auth';
import { romanticSongs, getRecommendedSongs, RomanticSong } from '@/lib/romanticSongs';
import { toast } from 'sonner';

const MusicUpload = () => {
  const { giftData, updateGiftData } = useGiftStore();
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [playing, setPlaying] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'recommended' | 'browse' | 'upload'>('recommended');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get recommended songs based on occasion
  const recommendedSongs = getRecommendedSongs(giftData.occasion || 'love');

  const validateFile = (file: File): boolean => {
    if (!file.type.startsWith('audio/')) {
      toast.error('Please upload an audio file');
      return false;
    }

    if (file.size > 8 * 1024 * 1024) {
      toast.error('Audio file must be less than 8MB');
      return false;
    }

    return true;
  };

  const handleFileUpload = async (file: File) => {
    if (!validateFile(file)) return;

    setUploading(true);
    try {
      const audioURL = URL.createObjectURL(file);
      
      updateGiftData({
        musicFile: file,
        musicURL: audioURL
      });

      toast.success('Music uploaded successfully! 🎵');
    } catch (error) {
      toast.error('Failed to upload music');
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const selectPresetMusic = async (song: RomanticSong) => {
    updateGiftData({
      musicURL: song.url,
      musicFile: null
    });
    
    // Add to user's favorite music if logged in (non-blocking)
    if (user) {
      try {
        // For now, just log this - we'll implement favorites later
        console.log('User selected favorite song:', song.title);
      } catch (error) {
        console.error('Error adding to favorites:', error);
      }
    }
    
    toast.success(`Selected "${song.title}" by ${song.artist}`);
  };

  const removeMusic = () => {
    if (giftData.musicURL && giftData.musicFile) {
      URL.revokeObjectURL(giftData.musicURL);
    }
    updateGiftData({
      musicFile: null,
      musicURL: ''
    });
    setPlaying(null);
  };

  const togglePlay = (url: string) => {
    if (playing === url) {
      audioRef.current?.pause();
      setPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
        setPlaying(url);
      }
    }
  };

  const SongCard = ({ 
    song, 
    isSelected, 
    isPlaying, 
    onSelect, 
    onTogglePlay, 
    index 
  }: {
    song: RomanticSong;
    isSelected: boolean;
    isPlaying: boolean;
    onSelect: () => void;
    onTogglePlay: () => void;
    index: number;
  }) => (
    <motion.div
      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'border-primary bg-gradient-warm'
          : 'border-border hover:border-primary/50 bg-card'
      }`}
      onClick={onSelect}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isSelected ? 'bg-primary' : 'bg-muted'
          }`}>
            <Music className={`w-5 h-5 ${
              isSelected ? 'text-white' : 'text-muted-foreground'
            }`} />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">{song.title}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{song.artist}</span>
              <span>•</span>
              <span>{song.duration}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                song.mood === 'passionate' ? 'bg-red-100 text-red-700' :
                song.mood === 'sweet' ? 'bg-pink-100 text-pink-700' :
                song.mood === 'tender' ? 'bg-blue-100 text-blue-700' :
                song.mood === 'joyful' ? 'bg-yellow-100 text-yellow-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {song.mood}
              </span>
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onTogglePlay();
          }}
        >
          {isPlaying ? 
            <Pause className="w-4 h-4" /> : 
            <Play className="w-4 h-4" />
          }
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <label className="block font-playfair text-lg font-medium text-foreground">
        Background Music 🎵
      </label>

      {/* Current Selection */}
      {giftData.musicURL && (
        <motion.div
          className="card-romantic flex items-center justify-between"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-medium text-foreground">
                {giftData.musicFile ? giftData.musicFile.name : 'Selected Music'}
              </p>
              <p className="text-sm text-muted-foreground">Ready to play</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => togglePlay(giftData.musicURL)}
            >
              {playing === giftData.musicURL ? 
                <Pause className="w-4 h-4" /> : 
                <Play className="w-4 h-4" />
              }
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeMusic}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Upload Section */}
      <div className="space-y-4">
        <h3 className="font-playfair font-medium text-foreground">Upload Your Music</h3>
        
        <motion.div
          className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-all duration-300"
          whileHover={{ scale: 1.01 }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="space-y-4">
            <motion.div
              className="mx-auto w-16 h-16 bg-gradient-romantic rounded-full flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Upload className="w-8 h-8 text-primary" />
            </motion.div>
            
            <div>
              <Button
                variant="soft"
                onClick={() => fileInputRef.current?.click()}
                isLoading={uploading}
              >
                <Music className="w-4 h-4" />
                Upload Music
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                MP3, WAV up to 8MB
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Music Selection Tabs */}
      <div className="space-y-4">
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('recommended')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'recommended'
                ? 'bg-white text-primary shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Heart className="w-4 h-4 inline mr-1" />
            Recommended
          </button>
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'browse'
                ? 'bg-white text-primary shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Music className="w-4 h-4 inline mr-1" />
            Browse All
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'upload'
                ? 'bg-white text-primary shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Upload className="w-4 h-4 inline mr-1" />
            Upload
          </button>
        </div>

        {/* Recommended Songs */}
        {activeTab === 'recommended' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <h3 className="font-playfair font-medium text-foreground">
                Perfect for {giftData.occasion || 'your special moment'}
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {recommendedSongs.map((song, index) => (
                <SongCard
                  key={song.id}
                  song={song}
                  isSelected={giftData.musicURL === song.url}
                  isPlaying={playing === song.url}
                  onSelect={() => selectPresetMusic(song)}
                  onTogglePlay={() => togglePlay(song.url)}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* Browse All Songs */}
        {activeTab === 'browse' && (
          <div className="space-y-3">
            <h3 className="font-playfair font-medium text-foreground">Romantic Collection</h3>
            <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto">
              {romanticSongs.map((song, index) => (
                <SongCard
                  key={song.id}
                  song={song}
                  isSelected={giftData.musicURL === song.url}
                  isPlaying={playing === song.url}
                  onSelect={() => selectPresetMusic(song)}
                  onTogglePlay={() => togglePlay(song.url)}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="space-y-4">
            <h3 className="font-playfair font-medium text-foreground">Upload Your Own Music</h3>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-2xl p-8 hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <Button
                variant="soft"
                onClick={() => fileInputRef.current?.click()}
                isLoading={uploading}
              >
                <Music className="w-4 h-4" />
                Upload Music
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                MP3, WAV up to 8MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Hidden Audio Player */}
      <audio
        ref={audioRef}
        onEnded={() => setPlaying(null)}
        onError={() => {
          setPlaying(null);
          toast.error('Error playing audio');
        }}
      />
    </div>
  );
};

export default MusicUpload;