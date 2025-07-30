import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Eye } from 'lucide-react';
import Button from '@/components/Button';
import ImageUpload from '@/components/ImageUpload';
import OccasionSelector from '@/components/OccasionSelector';
import MessageGenerator from '@/components/MessageGenerator';
import MusicUpload from '@/components/MusicUpload';
import TemplateSelector from '@/components/TemplateSelector';
import FloatingHearts from '@/components/FloatingHearts';
import { useGiftStore } from '@/lib/store';
import { toast } from 'sonner';

const Create = () => {
  const navigate = useNavigate();
  const { giftData, updateGiftData } = useGiftStore();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: 'Recipient Info', description: 'Who is this gift for?' },
    { id: 2, title: 'Upload Photo', description: 'Add a beautiful photo' },
    { id: 3, title: 'Choose Occasion', description: 'What are we celebrating?' },
    { id: 4, title: 'Write Message', description: 'Share your feelings' },
    { id: 5, title: 'Choose Template', description: 'Pick a beautiful design' },
    { id: 6, title: 'Add Music', description: 'Set the mood' }
  ];

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!giftData.recipientName.trim()) {
          toast.error('Please enter recipient name');
          return false;
        }
        return true;
      case 2:
        if (!giftData.photoURL) {
          toast.error('Please upload a photo');
          return false;
        }
        return true;
      case 3:
        if (!giftData.occasion) {
          toast.error('Please select an occasion');
          return false;
        }
        return true;
      case 4:
        if (!giftData.message.trim()) {
          toast.error('Please add a message');
          return false;
        }
        return true;
      case 5:
        if (!giftData.template) {
          toast.error('Please select a template');
          return false;
        }
        return true;
      case 6:
        return true; // Music is optional
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToPreview = () => {
    if (validateStep(currentStep)) {
      navigate('/preview');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <motion.h2
                className="font-playfair text-3xl font-bold text-gradient mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Who is this gift for? 💝
              </motion.h2>
              <p className="text-muted-foreground">Let's make this personal</p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label className="block font-playfair text-lg font-medium text-foreground mb-3">
                Recipient's Name
              </label>
              <input
                type="text"
                value={giftData.recipientName}
                onChange={(e) => updateGiftData({ recipientName: e.target.value })}
                placeholder="Enter their beautiful name..."
                className="input-romantic text-center text-xl font-playfair"
                maxLength={50}
              />
            </motion.div>
          </div>
        );
      
      case 2:
        return <ImageUpload />;
      
      case 3:
        return <OccasionSelector />;
      
      case 4:
        return <MessageGenerator />;
      
      case 5:
        return (
          <TemplateSelector
            selectedTemplate={giftData.template}
            onTemplateSelect={(template) => updateGiftData({ template })}
          />
        );
      
      case 6:
        return <MusicUpload />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          
          <motion.h1
            className="font-playfair text-2xl md:text-3xl font-bold text-gradient"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Create Your Love Gift
          </motion.h1>
          
          <div className="w-20"></div> {/* Spacer */}
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      currentStep === step.id
                        ? 'bg-primary text-primary-foreground shadow-glow'
                        : currentStep > step.id
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                    animate={currentStep === step.id ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {step.id}
                  </motion.div>
                  
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 transition-all duration-300 ${
                      currentStep > step.id ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="font-playfair text-xl font-semibold text-foreground">
              {steps[currentStep - 1].title}
            </h3>
            <p className="text-muted-foreground">
              {steps[currentStep - 1].description}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          className="max-w-2xl mx-auto"
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="card-romantic">
            {renderStepContent()}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center max-w-2xl mx-auto mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={currentStep === 1 ? 'opacity-50' : ''}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex gap-4">
            <Button
              variant="soft"
              onClick={goToPreview}
              disabled={!giftData.recipientName || !giftData.photoURL || !giftData.occasion || !giftData.message}
            >
              <Eye className="w-4 h-4" />
              Preview
            </Button>

            {currentStep < steps.length ? (
              <Button onClick={nextStep}>
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={goToPreview}>
                Preview Gift
                <Eye className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;