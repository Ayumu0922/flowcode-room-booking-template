import { useState } from 'react';
import { Clock, Users } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import { useBookingStore } from '../store/bookingStore';
import { useToast } from '../components/ui/Toast';

const HOURS = Array.from({ length: 20 }, (_, i) => `${String(Math.floor(i / 2) + 9).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`);

export default function BookingPage() {
  const { rooms, bookings, addBooking, isRoomAvailable } = useBookingStore();
  const { showToast } = useToast();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');
  const [attendees, setAttendees] = useState(2);

  const dayBookings = bookings.filter((b) => b.date === date);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom || !title) return;
    if (!isRoomAvailable(selectedRoom, date, startTime, endTime)) { alert('この時間帯は予約済みです'); return; }
    addBooking({ roomId: selectedRoom, title, date, startTime, endTime, organizer: '自分', attendees });
    showToast('予約を作成しました', 'success');
    setTitle(''); setSelectedRoom('');
  };

  return (
    <PageTransition className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">会議室予約</h1>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white" />
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[120px_1fr] divide-x divide-zinc-800">
          <div className="bg-zinc-900/80 p-3 text-xs text-zinc-500 font-medium">会議室</div>
          <div className="grid grid-cols-10 divide-x divide-zinc-800/30">
            {['9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'].map((h) => (
              <div key={h} className="p-2 text-[10px] text-zinc-500 text-center bg-zinc-900/80">{h}</div>
            ))}
          </div>
        </div>
        {rooms.map((room) => {
          const roomBookings = dayBookings.filter((b) => b.roomId === room.id);
          return (
            <div key={room.id} className="grid grid-cols-[120px_1fr] divide-x divide-zinc-800 border-t border-zinc-800/50">
              <div className="p-3">
                <p className="text-xs font-medium text-white">{room.name}</p>
                <p className="text-[10px] text-zinc-500 flex items-center gap-1"><Users className="w-2.5 h-2.5" />{room.capacity}名</p>
              </div>
              <div className="relative h-12">
                {roomBookings.map((b) => {
                  const startPct = ((parseInt(b.startTime.split(':')[0]) - 9) * 60 + parseInt(b.startTime.split(':')[1])) / 600 * 100;
                  const endPct = ((parseInt(b.endTime.split(':')[0]) - 9) * 60 + parseInt(b.endTime.split(':')[1])) / 600 * 100;
                  return (
                    <div key={b.id} className="absolute top-1 bottom-1 bg-accent-500/20 border border-accent-500/40 rounded text-[10px] text-accent-300 px-1.5 flex items-center overflow-hidden"
                      style={{ left: `${startPct}%`, width: `${endPct - startPct}%` }} title={`${b.title} (${b.startTime}-${b.endTime})`}>
                      {b.title}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-white">新規予約</h2>
        <div className="grid grid-cols-2 gap-4">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="会議名" required className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-accent-500/50" />
          <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} required className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white">
            <option value="">会議室を選択</option>
            {rooms.map((r) => <option key={r.id} value={r.id}>{r.name} ({r.capacity}名)</option>)}
          </select>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div><label className="text-xs text-zinc-500 block mb-1">開始</label>
            <select value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white">
              {HOURS.map((h) => <option key={h} value={h}>{h}</option>)}
            </select></div>
          <div><label className="text-xs text-zinc-500 block mb-1">終了</label>
            <select value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white">
              {HOURS.map((h) => <option key={h} value={h}>{h}</option>)}
            </select></div>
          <div><label className="text-xs text-zinc-500 block mb-1">参加人数</label>
            <input value={attendees} onChange={(e) => setAttendees(Number(e.target.value))} type="number" min="1" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white" /></div>
        </div>
        <button type="submit" className="bg-accent-600 hover:bg-accent-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">予約する</button>
      </form>
    </PageTransition>
  );
}
