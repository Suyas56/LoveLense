import { useAuth } from '@/hooks/use-auth';
import { useGiftStore } from '@/lib/store';
import { toast } from 'sonner';

const DebugInfo = () => {
  const { user } = useAuth();
  const { giftData } = useGiftStore();

  const debugInfo = () => {
    console.log('=== DEBUG INFO ===');
    console.log('User:', user);
    console.log('Gift Data:', giftData);
    console.log('Required fields check:', {
      recipientName: !!giftData.recipientName,
      photoURL: !!giftData.photoURL,
      occasion: !!giftData.occasion,
      message: !!giftData.message,
      template: !!giftData.template
    });
    
    toast.info(`Debug: User=${!!user}, Data=${!!giftData.recipientName}`, { duration: 5000 });
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={debugInfo}
        className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
      >
        Debug Info
      </button>
    </div>
  );
};

export default DebugInfo;
