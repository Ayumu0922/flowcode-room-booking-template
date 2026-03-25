import { NavLink } from 'react-router-dom';
import { CalendarPlus, CalendarCheck, DoorOpen, Settings } from 'lucide-react';

const links = [
  { to: '/', icon: CalendarPlus, label: '予約' },
  { to: '/my-bookings', icon: CalendarCheck, label: 'マイ予約' },
  { to: '/rooms', icon: DoorOpen, label: '会議室一覧' },
  { to: '/settings', icon: Settings, label: '設定' },
];

export default function Sidebar() {
  return (
    <aside className="w-60 border-r border-zinc-800 bg-zinc-900/50 p-4 flex flex-col">
      <div className="flex items-center gap-2 px-3 py-4 mb-4">
        <CalendarPlus className="w-6 h-6 text-purple-500" />
        <span className="text-base font-bold text-white">会議室予約</span>
      </div>
      <nav className="flex flex-col gap-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-purple-500/10 text-purple-400' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`
          }><Icon className="w-4 h-4" />{label}</NavLink>
        ))}
      </nav>
    </aside>
  );
}
