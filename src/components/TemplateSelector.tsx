import { motion } from 'framer-motion';
import { Heart, Star, Crown, Flower, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (template: string) => void;
}

const templates = [
  {
    id: 'romantic-hearts',
    name: 'Romantic Hearts',
    description: 'Classic love theme with floating hearts',
    icon: Heart,
    gradient: 'from-pink-500 to-rose-500',
    preview: 'bg-gradient-to-br from-pink-100 to-rose-100'
  },
  {
    id: 'golden-elegance',
    name: 'Golden Elegance',
    description: 'Luxurious golden theme for special occasions',
    icon: Crown,
    gradient: 'from-yellow-500 to-amber-500',
    preview: 'bg-gradient-to-br from-yellow-100 to-amber-100'
  },
  {
    id: 'starry-night',
    name: 'Starry Night',
    description: 'Dreamy night sky with twinkling stars',
    icon: Star,
    gradient: 'from-indigo-500 to-purple-500',
    preview: 'bg-gradient-to-br from-indigo-900 to-purple-900'
  },
  {
    id: 'floral-romance',
    name: 'Floral Romance',
    description: 'Beautiful garden theme with flowers',
    icon: Flower,
    gradient: 'from-green-500 to-pink-500',
    preview: 'bg-gradient-to-br from-green-100 to-pink-100'
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean and contemporary design',
    icon: Square,
    gradient: 'from-gray-500 to-slate-500',
    preview: 'bg-gradient-to-br from-gray-100 to-slate-100'
  }
];

const TemplateSelector = ({ selectedTemplate, onTemplateSelect }: TemplateSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose a Template</h3>
        <p className="text-gray-600">Select a beautiful design for your gift</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            className={cn(
              "relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300",
              selectedTemplate === template.id
                ? "border-pink-500 shadow-xl scale-105"
                : "border-gray-200 hover:border-gray-300 hover:shadow-lg"
            )}
            onClick={() => onTemplateSelect(template.id)}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            layout
          >
            {/* Template Preview */}
            <div className={cn(
              "w-full h-32 rounded-xl mb-4 relative overflow-hidden",
              template.preview
            )}>
              {/* Template specific preview elements */}
              {template.id === 'romantic-hearts' && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-pink-400/50" />
                  </div>
                  <motion.div
                    className="absolute top-2 right-2"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💝
                  </motion.div>
                </>
              )}
              
              {template.id === 'golden-elegance' && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Crown className="w-8 h-8 text-yellow-600/50" />
                  </div>
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </>
              )}
              
              {template.id === 'starry-night' && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Star className="w-8 h-8 text-yellow-200/70" />
                  </div>
                  <motion.div
                    className="absolute top-3 left-3"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✨
                  </motion.div>
                </>
              )}
              
              {template.id === 'floral-romance' && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Flower className="w-8 h-8 text-pink-400/50" />
                  </div>
                  <motion.div
                    className="absolute top-2 right-2"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    🌸
                  </motion.div>
                </>
              )}
              
              {template.id === 'modern-minimal' && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Square className="w-8 h-8 text-gray-400/50" />
                  </div>
                  <motion.div
                    className="absolute top-4 right-4 w-4 h-4 border border-gray-400/30 rounded"
                    animate={{ rotate: [0, 90, 180, 270, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                </>
              )}
            </div>

            {/* Template Info */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <template.icon className={cn(
                  "w-5 h-5 mr-2",
                  selectedTemplate === template.id ? "text-pink-600" : "text-gray-500"
                )} />
                <h4 className={cn(
                  "font-semibold",
                  selectedTemplate === template.id ? "text-pink-900" : "text-gray-900"
                )}>
                  {template.name}
                </h4>
              </div>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>

            {/* Selection Indicator */}
            {selectedTemplate === template.id && (
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <Heart className="w-4 h-4 text-white fill-current" />
              </motion.div>
            )}

            {/* Gradient Border */}
            <motion.div
              className={cn(
                "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300",
                `bg-gradient-to-r ${template.gradient}`
              )}
              style={{
                mask: 'linear-gradient(white, white) content-box, linear-gradient(white, white)',
                maskComposite: 'exclude',
                WebkitMask: 'linear-gradient(white, white) content-box, linear-gradient(white, white)',
                WebkitMaskComposite: 'destination-out',
                padding: '2px'
              }}
              animate={{
                opacity: selectedTemplate === template.id ? 1 : 0
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Selected Template Info */}
      {selectedTemplate && (
        <motion.div
          className="bg-white border border-gray-200 rounded-xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center">
            <div className={cn(
              "w-3 h-3 rounded-full mr-3",
              `bg-gradient-to-r ${templates.find(t => t.id === selectedTemplate)?.gradient}`
            )} />
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Selected:</span>{' '}
              {templates.find(t => t.id === selectedTemplate)?.name}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TemplateSelector;
