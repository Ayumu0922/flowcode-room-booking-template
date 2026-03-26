import { motion } from 'framer-motion';

export default function SettingsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-white">設定</h1>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-semibold text-white">予約設定</h2>
        <div><label className="text-xs text-zinc-500 block mb-1">デフォルトの会議時間（分）</label>
          <input defaultValue="60" type="number" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white" /></div>
        <div><label className="text-xs text-zinc-500 block mb-1">リマインダー（分前）</label>
          <input defaultValue="10" type="number" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white" /></div>
      </div>
      <button className="bg-accent-600 hover:bg-accent-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">保存する</button>
    </motion.div>
  );
}
