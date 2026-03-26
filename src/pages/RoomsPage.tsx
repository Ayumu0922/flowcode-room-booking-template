import { motion } from 'framer-motion';
import { Users, Monitor } from 'lucide-react';
import { useBookingStore } from '../store/bookingStore';

export default function RoomsPage() {
  const { rooms } = useBookingStore();
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
      <h1 className="text-xl font-bold text-white mb-6">会議室一覧</h1>
      <div className="grid grid-cols-2 gap-4">
        {rooms.map((room) => (
          <div key={room.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-2">{room.name}</h3>
            <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
              <span>{room.floor}</span>
              <span className="flex items-center gap-1"><Users className="w-3 h-3" />{room.capacity}名</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {room.equipment.map((eq) => (
                <span key={eq} className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-accent-500/10 text-accent-400">
                  <Monitor className="w-2.5 h-2.5" />{eq}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
