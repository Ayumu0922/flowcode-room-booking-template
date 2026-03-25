import { motion } from 'framer-motion';
import { Clock, MapPin, Trash2 } from 'lucide-react';
import { useBookingStore } from '../store/bookingStore';

export default function MyBookingsPage() {
  const { bookings, rooms, deleteBooking } = useBookingStore();
  const myBookings = bookings.filter((b) => b.organizer === '自分').sort((a, b) => a.date.localeCompare(b.date));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
      <h1 className="text-xl font-bold text-white mb-6">マイ予約</h1>
      {myBookings.length === 0 ? <p className="text-zinc-500 text-center py-12">予約がありません</p> : (
        <div className="space-y-2">
          {myBookings.map((b) => {
            const room = rooms.find((r) => r.id === b.roomId);
            return (
              <div key={b.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-4 flex items-center gap-4 group hover:border-zinc-700">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{b.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
                    <span>{b.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{b.startTime}-{b.endTime}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{room?.name}</span>
                  </div>
                </div>
                <button onClick={() => deleteBooking(b.id)} className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
