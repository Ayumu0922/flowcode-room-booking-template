import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Room {
  id: string; name: string; floor: string; capacity: number; equipment: string[];
}

export interface Booking {
  id: string; roomId: string; title: string; date: string; startTime: string; endTime: string; organizer: string; attendees: number;
}

interface BookingState {
  rooms: Room[];
  bookings: Booking[];
  addBooking: (b: Omit<Booking, 'id'>) => void;
  deleteBooking: (id: string) => void;
  getBookingsForDate: (date: string) => Booking[];
  isRoomAvailable: (roomId: string, date: string, start: string, end: string) => boolean;
}

const defaultRooms: Room[] = [
  { id: '1', name: '会議室A（桜）', floor: '3F', capacity: 8, equipment: ['モニター', 'ホワイトボード', 'Web会議'] },
  { id: '2', name: '会議室B（富士）', floor: '3F', capacity: 12, equipment: ['プロジェクター', 'ホワイトボード', 'Web会議', 'スピーカー'] },
  { id: '3', name: '会議室C（竹）', floor: '4F', capacity: 4, equipment: ['モニター'] },
  { id: '4', name: '大会議室（空）', floor: '5F', capacity: 30, equipment: ['プロジェクター', 'マイク', 'スピーカー', 'Web会議', '録画設備'] },
  { id: '5', name: 'フォンブース1', floor: '3F', capacity: 1, equipment: ['モニター', 'Web会議'] },
  { id: '6', name: 'フォンブース2', floor: '4F', capacity: 1, equipment: ['モニター', 'Web会議'] },
];

const today = new Date().toISOString().split('T')[0];

const defaultBookings: Booking[] = [
  { id: '1', roomId: '1', title: 'スプリント計画', date: today, startTime: '10:00', endTime: '11:00', organizer: '田中', attendees: 6 },
  { id: '2', roomId: '2', title: 'クライアントMTG', date: today, startTime: '13:00', endTime: '14:30', organizer: '佐藤', attendees: 8 },
  { id: '3', roomId: '4', title: '全体朝会', date: today, startTime: '09:00', endTime: '09:30', organizer: 'マネージャー', attendees: 25 },
  { id: '4', roomId: '1', title: 'デザインレビュー', date: today, startTime: '15:00', endTime: '16:00', organizer: '鈴木', attendees: 4 },
];

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      rooms: defaultRooms,
      bookings: defaultBookings,
      addBooking: (b) => set((s) => ({ bookings: [...s.bookings, { ...b, id: crypto.randomUUID() }] })),
      deleteBooking: (id) => set((s) => ({ bookings: s.bookings.filter((b) => b.id !== id) })),
      getBookingsForDate: (date) => get().bookings.filter((b) => b.date === date),
      isRoomAvailable: (roomId, date, start, end) => {
        return !get().bookings.some((b) => b.roomId === roomId && b.date === date && b.startTime < end && b.endTime > start);
      },
    }),
    { name: 'booking-storage' }
  )
);
