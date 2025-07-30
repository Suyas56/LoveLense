import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image } from 'lucide-react';
import Button from './Button';
import { useGiftStore } from '@/lib/store';
import { toast } from 'sonner';

const ImageUpload = () => {
  const { giftData, updateGiftData } = useGiftStore();
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return false;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return false;
    }

    return true;
  };

  const handleFile = async (file: File) => {
    if (!validateFile(file)) return;

    setUploading(true);
    try {
      // Create preview URL
      const previewURL = URL.createObjectURL(file);
      
      updateGiftData({
        photoFile: file,
        photoURL: previewURL
      });

      toast.success('Image uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const removeImage = () => {
    if (giftData.photoURL) {
      URL.revokeObjectURL(giftData.photoURL);
    }
    updateGiftData({
      photoFile: null,
      photoURL: ''
    });
  };

  return (
    <div className="space-y-4">
      <label className="block font-playfair text-lg font-medium text-foreground">
        Upload Photo 📸
      </label>
      
      {giftData.photoURL ? (
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative group">
            <img
              src={giftData.photoURL}
              alt="Preview"
              className="w-full h-64 object-cover rounded-3xl shadow-romantic"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl flex items-center justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={removeImage}
                className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              >
                <X className="w-4 h-4" />
                Remove
              </Button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50'
          }`}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="space-y-4">
            <motion.div
              className="mx-auto w-16 h-16 bg-gradient-romantic rounded-full flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Image className="w-8 h-8 text-primary" />
            </motion.div>
            
            <div>
              <p className="text-lg font-medium text-foreground mb-2">
                Drop your image here, or{' '}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-primary hover:text-primary-glow underline"
                >
                  browse
                </button>
              </p>
              <p className="text-sm text-muted-foreground">
                JPG, PNG up to 5MB
              </p>
            </div>
          </div>
          
          {uploading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-3xl flex items-center justify-center">
              <motion.div
                className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ImageUpload;