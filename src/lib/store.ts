import { create } from 'zustand';

export interface GiftData {
  recipientName: string;
  occasion: string;
  message: string;
  photoURL: string;
  photoFile: File | null;
  musicURL: string;
  musicFile: File | null;
  template: string;
}

interface GiftStore {
  giftData: GiftData;
  updateGiftData: (data: Partial<GiftData>) => void;
  resetGiftData: () => void;
}

const initialData: GiftData = {
  recipientName: '',
  occasion: '',
  message: '',
  photoURL: '',
  photoFile: null,
  musicURL: '',
  musicFile: null,
  template: 'romantic-hearts'
};

export const useGiftStore = create<GiftStore>((set) => ({
  giftData: initialData,
  updateGiftData: (data) => 
    set((state) => ({ 
      giftData: { ...state.giftData, ...data } 
    })),
  resetGiftData: () => set({ giftData: initialData }),
}));